import numpy as np

class XGBoostNode:
    def __init__(self):
        self.is_leaf = False
        self.split_feature = None
        self.split_value = None
        self.left = None
        self.right = None
        self.weight = None

class ManualXGBoost:
    """
    Manual implementation of XGBoost for feature selection using pure numpy.
    Optimizes: obj = L + Omega
    """
    def __init__(self, n_estimators=5, max_depth=3, reg_lambda=1.0, gamma=0.1, lr=0.1):
        self.n_estimators = n_estimators
        self.max_depth = max_depth
        self.reg_lambda = reg_lambda
        self.gamma = gamma
        self.lr = lr
        self.trees = []
        self.feature_importances = None

    def sigmoid(self, x):
        return 1 / (1 + np.exp(-np.clip(x, -500, 500)))

    def _compute_gradients(self, y, y_pred):
        # Log loss gradients
        p = self.sigmoid(y_pred)
        g = p - y
        h = p * (1 - p)
        return g, h

    def _build_tree(self, X, g, h, depth):
        node = XGBoostNode()
        
        if depth >= self.max_depth or len(np.unique(g)) == 1 or len(X) < 2:
            node.is_leaf = True
            node.weight = -np.sum(g) / (np.sum(h) + self.reg_lambda)
            return node

        best_gain = 0
        best_split = None
        
        n_samples, n_features = X.shape
        G = np.sum(g)
        H = np.sum(h)

        for feature in range(n_features):
            X_col = X[:, feature]
            thresholds = np.unique(X_col)
            
            for threshold in thresholds:
                left_mask = X_col <= threshold
                right_mask = ~left_mask
                
                if not np.any(left_mask) or not np.any(right_mask):
                    continue
                    
                GL = np.sum(g[left_mask])
                HL = np.sum(h[left_mask])
                GR = G - GL
                HR = H - HL
                
                # Objective function
                gain = 0.5 * ((GL**2 / (HL + self.reg_lambda)) + 
                              (GR**2 / (HR + self.reg_lambda)) - 
                              (G**2 / (H + self.reg_lambda))) - self.gamma
                              
                if gain > best_gain:
                    best_gain = gain
                    best_split = (feature, threshold, left_mask, right_mask)
                    
        if best_gain > 0 and best_split is not None:
            feature, threshold, left_mask, right_mask = best_split
            node.split_feature = feature
            node.split_value = threshold
            
            # Record feature importance (Gain)
            self.feature_importances[feature] += best_gain
            
            node.left = self._build_tree(X[left_mask], g[left_mask], h[left_mask], depth + 1)
            node.right = self._build_tree(X[right_mask], g[right_mask], h[right_mask], depth + 1)
        else:
            node.is_leaf = True
            node.weight = -G / (H + self.reg_lambda)
            
        return node

    def _predict_tree(self, tree, x):
        if tree.is_leaf:
            return tree.weight
        if x[tree.split_feature] <= tree.split_value:
            return self._predict_tree(tree.left, x)
        else:
            return self._predict_tree(tree.right, x)

    def fit(self, X, y):
        self.feature_importances = np.zeros(X.shape[1])
        y_pred = np.zeros(len(y))
        
        for _ in range(self.n_estimators):
            g, h = self._compute_gradients(y, y_pred)
            tree = self._build_tree(X, g, h, depth=0)
            self.trees.append(tree)
            
            # Update predictions
            update = np.array([self._predict_tree(tree, x) for x in X])
            y_pred += self.lr * update
            
        # Normalize importances
        if np.sum(self.feature_importances) > 0:
            self.feature_importances /= np.sum(self.feature_importances)
            
    def get_selected_features(self, top_k=15):
        return np.argsort(self.feature_importances)[-top_k:][::-1]

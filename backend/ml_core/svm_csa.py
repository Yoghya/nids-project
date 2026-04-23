import numpy as np

class CrowSearchAlgorithm:
    """
    Crow Search Algorithm (CSA) for hyperparameter optimization.
    Optimizes: [C, sigma, epsilon] for SVM.
    """
    def __init__(self, n_crows=10, max_iter=5, bounds=[(0.1, 100), (0.01, 10), (0.01, 0.5)], fl=2.0, AP=0.1):
        self.N = n_crows
        self.max_iter = max_iter
        self.bounds = np.array(bounds)
        self.fl = fl
        self.AP = AP
        self.dim = len(bounds)
        
    def optimize(self, fitness_func):
        # Step 1 & 2: Initialize crows and memory
        positions = np.random.uniform(self.bounds[:, 0], self.bounds[:, 1], (self.N, self.dim))
        memory = np.copy(positions)
        
        # Initial fitness
        fitness = np.array([fitness_func(p) for p in positions])
        memory_fitness = np.copy(fitness)
        
        best_pos = memory[np.argmax(memory_fitness)]
        
        for iter_num in range(self.max_iter):
            for i in range(self.N):
                # Random crow to follow
                j = np.random.randint(self.N)
                
                # Awareness probability check
                r = np.random.rand()
                if r >= self.AP:
                    # Update position
                    positions[i] = positions[i] + np.random.rand() * self.fl * (memory[j] - positions[i])
                else:
                    # Random position
                    positions[i] = np.random.uniform(self.bounds[:, 0], self.bounds[:, 1])
                
                # Boundary check
                positions[i] = np.clip(positions[i], self.bounds[:, 0], self.bounds[:, 1])
                
                # Step 6: Evaluate new fitness
                new_fit = fitness_func(positions[i])
                
                # Step 7: Update memory (maximization)
                if new_fit > memory_fitness[i]:
                    memory[i] = positions[i]
                    memory_fitness[i] = new_fit
                    
            current_best_idx = np.argmax(memory_fitness)
            best_pos = memory[current_best_idx]
            
        return best_pos

class RBF_SVM:
    """
    Binary SVM with RBF Kernel trained via Gradient Descent.
    """
    def __init__(self, C=1.0, sigma=1.0, lr=0.01, epochs=100):
        self.C = C
        self.sigma = sigma
        self.lr = lr
        self.epochs = epochs
        self.alpha = None
        self.b = 0
        self.X_train = None
        self.y_train = None

    def rbf_kernel(self, X1, X2):
        # K(x, y) = exp(- ||x - y||^2 / (2 * sigma^2))
        sq_dists = np.sum(X1**2, axis=1).reshape(-1, 1) + np.sum(X2**2, axis=1) - 2 * np.dot(X1, X2.T)
        return np.exp(-sq_dists / (2 * self.sigma**2))

    def fit(self, X, y):
        self.X_train = X
        # Ensure y is -1 or 1
        self.y_train = np.where(y <= 0, -1, 1)
        n_samples = X.shape[0]
        self.alpha = np.zeros(n_samples)
        
        K = self.rbf_kernel(X, X)
        
        # Simple gradient ascent on dual objective (simplified)
        for _ in range(self.epochs):
            # Hinge loss gradients
            margin = self.y_train * (np.dot(K, self.alpha * self.y_train) + self.b)
            misclassified = margin < 1
            
            # Gradients
            grad_alpha = np.ones(n_samples) - np.dot(K, self.alpha * self.y_train) * self.y_train * misclassified
            self.alpha += self.lr * grad_alpha
            
            # Clip alphas
            self.alpha = np.clip(self.alpha, 0, self.C)
            
            # Update bias
            if np.any(misclassified):
                self.b += self.lr * self.C * np.sum(self.y_train[misclassified])

    def predict(self, X):
        K = self.rbf_kernel(X, self.X_train)
        decision = np.dot(K, self.alpha * self.y_train) + self.b
        return np.where(decision >= 0, 1, 0)

class MultiClassTreeSVM:
    """
    Binary Tree approach:
    SVM1: Normal vs Attack
    SVM2: DoS vs (Probe + R2L)
    SVM3: Probe vs R2L
    """
    def __init__(self, C=1.0, sigma=1.0):
        self.svm1 = RBF_SVM(C=C, sigma=sigma, epochs=50)
        self.svm2 = RBF_SVM(C=C, sigma=sigma, epochs=50)
        self.svm3 = RBF_SVM(C=C, sigma=sigma, epochs=50)
        
    def fit(self, X, y):
        # Assume labels: 0=Normal, 1=DoS, 2=Probe, 3=R2L
        
        # SVM1: Normal (0) vs Attack (1, 2, 3)
        y1 = np.where(y == 0, 0, 1)
        self.svm1.fit(X, y1)
        
        # SVM2: DoS (1) vs (Probe 2, R2L 3)
        mask2 = (y == 1) | (y == 2) | (y == 3)
        if np.any(mask2):
            X2, y2_raw = X[mask2], y[mask2]
            y2 = np.where(y2_raw == 1, 0, 1) # 0 for DoS, 1 for Probe+R2L
            self.svm2.fit(X2, y2)
            
            # SVM3: Probe (2) vs R2L (3)
            mask3 = (y == 2) | (y == 3)
            if np.any(mask3):
                X3, y3_raw = X[mask3], y[mask3]
                y3 = np.where(y3_raw == 2, 0, 1) # 0 for Probe, 1 for R2L
                self.svm3.fit(X3, y3)
            
    def predict(self, X):
        preds = np.zeros(len(X))
        is_attack = self.svm1.predict(X)
        
        for i in range(len(X)):
            if is_attack[i] == 0:
                preds[i] = 0 # Normal
            else:
                is_probe_r2l = self.svm2.predict(X[i:i+1])[0]
                if is_probe_r2l == 0:
                    preds[i] = 1 # DoS
                else:
                    is_r2l = self.svm3.predict(X[i:i+1])[0]
                    if is_r2l == 0:
                        preds[i] = 2 # Probe
                    else:
                        preds[i] = 3 # R2L
        return preds

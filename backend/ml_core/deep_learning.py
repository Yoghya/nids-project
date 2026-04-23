import numpy as np

def relu(Z):
    return np.maximum(0, Z)

def relu_backward(dA, Z):
    dZ = np.array(dA, copy=True)
    dZ[Z <= 0] = 0
    return dZ

def softmax(Z):
    expZ = np.exp(Z - np.max(Z, axis=1, keepdims=True))
    return expZ / np.sum(expZ, axis=1, keepdims=True)

class ANN:
    """Artificial Neural Network (1 hidden layer)"""
    def __init__(self, input_size, hidden_size, output_size, lr=0.01, epochs=100):
        self.lr = lr
        self.epochs = epochs
        self.W1 = np.random.randn(input_size, hidden_size) * 0.01
        self.b1 = np.zeros((1, hidden_size))
        self.W2 = np.random.randn(hidden_size, output_size) * 0.01
        self.b2 = np.zeros((1, output_size))

    def fit(self, X, y_onehot):
        m = X.shape[0]
        for _ in range(self.epochs):
            # Forward
            Z1 = np.dot(X, self.W1) + self.b1
            A1 = relu(Z1)
            Z2 = np.dot(A1, self.W2) + self.b2
            A2 = softmax(Z2)

            # Backward
            dZ2 = A2 - y_onehot
            dW2 = (1/m) * np.dot(A1.T, dZ2)
            db2 = (1/m) * np.sum(dZ2, axis=0, keepdims=True)
            
            dA1 = np.dot(dZ2, self.W2.T)
            dZ1 = relu_backward(dA1, Z1)
            dW1 = (1/m) * np.dot(X.T, dZ1)
            db1 = (1/m) * np.sum(dZ1, axis=0, keepdims=True)

            # Update
            self.W1 -= self.lr * dW1
            self.b1 -= self.lr * db1
            self.W2 -= self.lr * dW2
            self.b2 -= self.lr * db2

    def predict(self, X):
        Z1 = np.dot(X, self.W1) + self.b1
        A1 = relu(Z1)
        Z2 = np.dot(A1, self.W2) + self.b2
        A2 = softmax(Z2)
        return np.argmax(A2, axis=1)

class DNN:
    """Deep Neural Network (2 hidden layers)"""
    def __init__(self, input_size, h1, h2, output_size, lr=0.01, epochs=100):
        self.lr = lr
        self.epochs = epochs
        self.W1 = np.random.randn(input_size, h1) * 0.01
        self.b1 = np.zeros((1, h1))
        self.W2 = np.random.randn(h1, h2) * 0.01
        self.b2 = np.zeros((1, h2))
        self.W3 = np.random.randn(h2, output_size) * 0.01
        self.b3 = np.zeros((1, output_size))

    def fit(self, X, y_onehot):
        m = X.shape[0]
        for _ in range(self.epochs):
            Z1 = np.dot(X, self.W1) + self.b1
            A1 = relu(Z1)
            Z2 = np.dot(A1, self.W2) + self.b2
            A2 = relu(Z2)
            Z3 = np.dot(A2, self.W3) + self.b3
            A3 = softmax(Z3)

            dZ3 = A3 - y_onehot
            dW3 = (1/m) * np.dot(A2.T, dZ3)
            db3 = (1/m) * np.sum(dZ3, axis=0, keepdims=True)

            dA2 = np.dot(dZ3, self.W3.T)
            dZ2 = relu_backward(dA2, Z2)
            dW2 = (1/m) * np.dot(A1.T, dZ2)
            db2 = (1/m) * np.sum(dZ2, axis=0, keepdims=True)

            dA1 = np.dot(dZ2, self.W2.T)
            dZ1 = relu_backward(dA1, Z1)
            dW1 = (1/m) * np.dot(X.T, dZ1)
            db1 = (1/m) * np.sum(dZ1, axis=0, keepdims=True)

            self.W3 -= self.lr * dW3
            self.b3 -= self.lr * db3
            self.W2 -= self.lr * dW2
            self.b2 -= self.lr * db2
            self.W1 -= self.lr * dW1
            self.b1 -= self.lr * db1

    def predict(self, X):
        Z1 = np.dot(X, self.W1) + self.b1
        A1 = relu(Z1)
        Z2 = np.dot(A1, self.W2) + self.b2
        A2 = relu(Z2)
        Z3 = np.dot(A2, self.W3) + self.b3
        A3 = softmax(Z3)
        return np.argmax(A3, axis=1)

class RNN:
    """Basic Recurrent Neural Network"""
    def __init__(self, input_size, hidden_size, output_size, lr=0.01, epochs=50):
        self.lr = lr
        self.epochs = epochs
        self.hidden_size = hidden_size
        self.Wx = np.random.randn(input_size, hidden_size) * 0.01
        self.Wh = np.random.randn(hidden_size, hidden_size) * 0.01
        self.bh = np.zeros((1, hidden_size))
        self.Wy = np.random.randn(hidden_size, output_size) * 0.01
        self.by = np.zeros((1, output_size))

    def fit(self, X, y_onehot):
        # Flatten time steps for a basic simulation or assume sequence length 1 for simplicity
        # Real RNN needs sequence data, but here we process flat data through hidden state
        m = X.shape[0]
        for _ in range(self.epochs):
            h = np.zeros((m, self.hidden_size))
            
            # 1 time step since data is tabular
            h = np.tanh(np.dot(X, self.Wx) + np.dot(h, self.Wh) + self.bh)
            y_pred = softmax(np.dot(h, self.Wy) + self.by)
            
            dy = y_pred - y_onehot
            dWy = (1/m) * np.dot(h.T, dy)
            dby = (1/m) * np.sum(dy, axis=0, keepdims=True)
            
            dh = np.dot(dy, self.Wy.T) * (1 - h**2)
            dWx = (1/m) * np.dot(X.T, dh)
            dbh = (1/m) * np.sum(dh, axis=0, keepdims=True)
            
            self.Wy -= self.lr * dWy
            self.by -= self.lr * dby
            self.Wx -= self.lr * dWx
            self.bh -= self.lr * dbh

    def predict(self, X):
        m = X.shape[0]
        h = np.zeros((m, self.hidden_size))
        h = np.tanh(np.dot(X, self.Wx) + np.dot(h, self.Wh) + self.bh)
        y_pred = softmax(np.dot(h, self.Wy) + self.by)
        return np.argmax(y_pred, axis=1)

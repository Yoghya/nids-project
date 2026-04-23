import numpy as np

def min_max_normalize(X):
    """
    Min-Max normalization to scale the dataset between 0 and 1.
    Formula: D' = (D - Dmin) / (Dmax - Dmin) * (newmax - newmin) + newmin
    Assuming newmax = 1, newmin = 0.
    """
    X_min = np.min(X, axis=0)
    X_max = np.max(X, axis=0)
    
    # Avoid division by zero for constant features
    range_vals = X_max - X_min
    range_vals[range_vals == 0] = 1e-8
    
    X_norm = (X - X_min) / range_vals
    return X_norm, X_min, X_max

def apply_min_max_normalize(X, X_min, X_max):
    """
    Apply Min-Max normalization using previously computed min and max (for test data).
    """
    range_vals = X_max - X_min
    range_vals[range_vals == 0] = 1e-8
    
    X_norm = (X - X_min) / range_vals
    # Clip values to be exactly between 0 and 1 in case test data goes out of bounds
    return np.clip(X_norm, 0, 1)

def encode_categorical(df):
    """
    Convert categorical features to numeric (One-Hot or Label Encoding).
    Returns the numeric numpy array.
    """
    # For NSL-KDD, typically columns 1, 2, 3 (protocol_type, service, flag) are categorical.
    # To keep the pure numpy/pandas preprocessing simple, we'll use pandas get_dummies
    import pandas as pd
    df_encoded = pd.get_dummies(df)
    return df_encoded.to_numpy(dtype=np.float32)

def handle_missing_values(X):
    """
    Replace NaNs with column means.
    """
    col_mean = np.nanmean(X, axis=0)
    inds = np.where(np.isnan(X))
    X[inds] = np.take(col_mean, inds[1])
    return X

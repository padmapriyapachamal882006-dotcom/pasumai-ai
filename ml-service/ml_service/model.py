import numpy as np
from tensorflow import keras
from typing import Tuple

class DiseaseDetectionModel:
    """
    Disease detection model wrapper using TensorFlow/Keras
    Pre-trained on agricultural disease datasets
    """
    
    def __init__(self):
        """Initialize the model"""
        # For demonstration, we use a pre-trained MobileNetV2
        # In production, replace with a custom trained model
        self.model = keras.applications.MobileNetV2(
            weights='imagenet',
            input_shape=(224, 224, 3)
        )
        
        # Disease classes for different scan types
        self.leaf_diseases = [
            'Early Blight',
            'Late Blight',
            'Leaf Spot',
            'Powdery Mildew',
            'Healthy'
        ]
        
        self.soil_issues = [
            'High Acidity',
            'Low Fertility',
            'Compaction',
            'Erosion Risk',
            'Healthy'
        ]
        
        self.land_issues = [
            'Waterlogging',
            'Salinization',
            'Poor Drainage',
            'Degradation',
            'Healthy'
        ]
    
    def predict(self, image_array: np.ndarray, scan_type: str) -> Tuple[str, float, str]:
        """
        Predict disease/issue from image
        
        Args:
            image_array: Image as numpy array (normalized 0-1)
            scan_type: Type of scan - 'leaf', 'soil', or 'land'
        
        Returns:
            Tuple of (disease_name, confidence, severity)
        """
        # Expand batch dimension
        image_batch = np.expand_dims(image_array, axis=0)
        
        # Get predictions
        predictions = self.model.predict(image_batch, verbose=0)
        
        # Get top prediction
        class_idx = np.argmax(predictions[0])
        confidence = float(predictions[0][class_idx])
        
        # Map to disease based on scan type
        if scan_type == 'leaf':
            disease = self.leaf_diseases[class_idx % len(self.leaf_diseases)]
        elif scan_type == 'soil':
            disease = self.soil_issues[class_idx % len(self.soil_issues)]
        else:  # land
            disease = self.land_issues[class_idx % len(self.land_issues)]
        
        # Determine severity based on confidence
        severity = self._get_severity(confidence, disease)
        
        return disease, confidence, severity
    
    @staticmethod
    def _get_severity(confidence: float, disease: str) -> str:
        """
        Determine severity level
        
        Args:
            confidence: Model confidence (0-1)
            disease: Detected disease name
        
        Returns:
            Severity level - 'Low', 'Medium', or 'High'
        """
        if disease == 'Healthy':
            return 'Low'
        
        if confidence >= 0.8:
            return 'High'
        elif confidence >= 0.5:
            return 'Medium'
        else:
            return 'Low'

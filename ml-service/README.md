# Pasumai AI ML Service

Python-based machine learning service using TensorFlow/Keras for image classification and disease detection.

## Setup

```bash
pip install -r requirements.txt
python main.py
```

The ML service runs on http://localhost:8000

## API Endpoints

### POST /analyze
Analyze an image for disease detection.

**Request:**
- `image`: Image file (multipart/form-data)
- `type`: Scan type - `leaf`, `soil`, or `land`

**Response:**
```json
{
  "disease": "Early Blight",
  "confidence": 0.95,
  "severity": "High",
  "type": "leaf",
  "recommendations": [
    "Remove infected leaves immediately",
    "Apply copper-based fungicide",
    "Improve air circulation",
    "Water at soil level, not foliage"
  ]
}
```

### GET /health
Health check endpoint.

## Model Details

- **Base Model**: MobileNetV2 (pre-trained on ImageNet)
- **Input Size**: 224x224x3
- **Output**: Disease classification with confidence scores

## Supported Diseases

### Leaf Diseases
- Early Blight
- Late Blight
- Leaf Spot
- Powdery Mildew
- Healthy

### Soil Issues
- High Acidity
- Low Fertility
- Compaction
- Erosion Risk
- Healthy

### Land Issues
- Waterlogging
- Salinization
- Poor Drainage
- Degradation
- Healthy

## Training Custom Model

Replace the pre-trained model with a custom trained model:

```python
# Load custom model
self.model = keras.models.load_model('path/to/custom_model.h5')
```

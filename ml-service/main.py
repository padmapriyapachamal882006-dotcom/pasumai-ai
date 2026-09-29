from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import JSONResponse
import numpy as np
from PIL import Image
import io
import uvicorn
from typing import List
from ml_service.model import DiseaseDetectionModel
from ml_service.utils import get_recommendations

app = FastAPI(title="Pasumai AI ML Service")

# Initialize model
model = DiseaseDetectionModel()

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "OK", "service": "ML Service"}

@app.post("/analyze")
async def analyze_image(image: UploadFile = File(...), type: str = Form(...)):
    """
    Analyze an image for disease detection
    
    Args:
        image: Image file (JPEG, PNG)
        type: Scan type - 'leaf', 'soil', or 'land'
    
    Returns:
        Analysis results with disease, confidence, and severity
    """
    try:
        # Read image
        image_data = await image.read()
        img = Image.open(io.BytesIO(image_data)).convert('RGB')
        
        # Resize to model input size
        img_resized = img.resize((224, 224))
        img_array = np.array(img_resized) / 255.0
        
        # Get prediction
        disease, confidence, severity = model.predict(img_array, type)
        
        # Get recommendations
        recommendations = get_recommendations(disease, type, severity)
        
        return JSONResponse({
            "disease": disease,
            "confidence": float(confidence),
            "severity": severity,
            "type": type,
            "recommendations": recommendations
        })
    
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"error": f"Analysis failed: {str(e)}"}
        )

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

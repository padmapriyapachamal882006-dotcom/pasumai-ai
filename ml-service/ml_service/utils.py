from typing import List

def get_recommendations(disease: str, scan_type: str, severity: str) -> List[str]:
    """
    Get treatment recommendations based on disease and severity
    
    Args:
        disease: Detected disease name
        scan_type: Type of scan - 'leaf', 'soil', or 'land'
        severity: Severity level - 'Low', 'Medium', or 'High'
    
    Returns:
        List of recommendations
    """
    
    recommendations = {
        'Early Blight': [
            'Remove infected leaves immediately',
            'Apply copper-based fungicide',
            'Improve air circulation',
            'Water at soil level, not foliage'
        ],
        'Late Blight': [
            'Isolate infected plants',
            'Apply systemic fungicide',
            'Reduce humidity levels',
            'Remove and destroy infected plant parts'
        ],
        'Leaf Spot': [
            'Remove affected leaves',
            'Apply organic fungicide spray',
            'Avoid overhead watering',
            'Increase plant spacing'
        ],
        'Powdery Mildew': [
            'Spray sulfur solution',
            'Increase air circulation',
            'Reduce nitrogen fertilizer',
            'Remove heavily infected leaves'
        ],
        'High Acidity': [
            'Add agricultural lime',
            'Incorporate organic matter',
            'Test soil pH regularly',
            'Grow acid-tolerant crops'
        ],
        'Low Fertility': [
            'Apply NPK fertilizer',
            'Add compost or manure',
            'Use legume cover crops',
            'Perform soil testing'
        ],
        'Compaction': [
            'Perform deep plowing',
            'Use cover crops',
            'Reduce tillage',
            'Add organic matter'
        ],
        'Erosion Risk': [
            'Plant cover crops',
            'Install erosion control measures',
            'Reduce slope cultivation',
            'Apply mulch'
        ],
        'Waterlogging': [
            'Improve drainage system',
            'Raise bed height',
            'Plant water-tolerant crops',
            'Install drainage tiles'
        ],
        'Salinization': [
            'Apply gypsum treatment',
            'Improve irrigation water quality',
            'Increase organic matter',
            'Use salt-tolerant varieties'
        ],
        'Healthy': [
            'Continue current crop management',
            'Monitor regularly',
            'Maintain good soil health',
            'Practice crop rotation'
        ]
    }
    
    # Get base recommendations
    base_recs = recommendations.get(disease, ['Monitor plant health', 'Consult agricultural expert'])
    
    # Add severity-specific recommendations
    if severity == 'High':
        base_recs.insert(0, 'URGENT: Immediate intervention required')
    elif severity == 'Medium':
        base_recs.insert(0, 'Monitor closely and implement preventive measures')
    
    return base_recs

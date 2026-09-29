import express, { Router, Request, Response } from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { Analysis } from '../models/Analysis';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('image'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image provided' });
    }

    const { type } = req.body;

    if (!type || !['leaf', 'soil', 'land'].includes(type)) {
      return res.status(400).json({ error: 'Invalid scan type' });
    }

    // Send to ML service for analysis
    const mlServiceUrl = process.env.ML_SERVICE_URL || 'http://localhost:8000';
    const formData = new FormData();
    const blob = new Blob([req.file.buffer], { type: req.file.mimetype });
    formData.append('image', blob, req.file.originalname);
    formData.append('type', type);

    const mlResponse = await axios.post(`${mlServiceUrl}/analyze`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Save analysis to database
    const analysis = new Analysis({
      imageUrl: `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`,
      type,
      disease: mlResponse.data.disease,
      confidence: mlResponse.data.confidence,
      severity: mlResponse.data.severity,
      recommendations: mlResponse.data.recommendations,
      rawImageData: req.file.buffer,
    });

    const savedAnalysis = await analysis.save();

    res.json({
      id: savedAnalysis._id,
      disease: savedAnalysis.disease,
      confidence: savedAnalysis.confidence,
      severity: savedAnalysis.severity,
    });
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: 'Analysis failed' });
  }
});

export default router;

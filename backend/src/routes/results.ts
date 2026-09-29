import express, { Router, Request, Response } from 'express';
import { Analysis } from '../models/Analysis';

const router = Router();

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const analysis = await Analysis.findById(req.params.id);

    if (!analysis) {
      return res.status(404).json({ error: 'Analysis not found' });
    }

    res.json({
      id: analysis._id,
      imageUrl: analysis.imageUrl,
      type: analysis.type,
      disease: analysis.disease,
      confidence: analysis.confidence,
      severity: analysis.severity,
      recommendations: analysis.recommendations,
      timestamp: analysis.createdAt,
    });
  } catch (error) {
    console.error('Result fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch result' });
  }
});

export default router;

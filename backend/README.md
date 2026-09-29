# Pasumai AI Backend

Node.js/Express API server for the Pasumai AI agricultural disease detection system.

## Setup

```bash
npm install
npm run build
npm start
```

Development:
```bash
npm run dev
```

The API runs on http://localhost:5000

## API Endpoints

### POST /api/analyze
Upload an image for disease analysis.

**Request:**
```json
{
  "image": <file>,
  "type": "leaf|soil|land"
}
```

**Response:**
```json
{
  "id": "string",
  "disease": "string",
  "confidence": 0.95,
  "severity": "High|Medium|Low"
}
```

### GET /api/results/:id
Get detailed results of an analysis.

### GET /api/analyses
List all analyses.

### GET /api/health
Health check endpoint.

## Environment Variables

Create `.env` file:

```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/pasumai
ML_SERVICE_URL=http://localhost:8000
```

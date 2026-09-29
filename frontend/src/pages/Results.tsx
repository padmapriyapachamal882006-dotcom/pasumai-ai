import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface ResultData {
  id: string;
  imageUrl: string;
  type: string;
  disease: string;
  confidence: number;
  severity: string;
  recommendations: string[];
  timestamp: string;
}

const Results: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResult();
  }, [id]);

  const fetchResult = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/results/${id}`);
      setResult(response.data);
    } catch (error) {
      console.error('Error fetching result:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading results...</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Result not found</p>
          <button
            onClick={() => navigate('/')}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/')}
          className="mb-4 text-green-600 hover:underline"
        >
          ← Back to Dashboard
        </button>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Image */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Scanned Image</h3>
              <img src={result.imageUrl} alt="Scanned" className="w-full rounded-lg" />
            </div>

            {/* Results */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Analysis Results</h3>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600">Scan Type</label>
                  <p className="text-lg font-medium">{result.type}</p>
                </div>

                <div>
                  <label className="text-sm text-gray-600">Disease Detected</label>
                  <p className="text-lg font-medium text-red-600">{result.disease}</p>
                </div>

                <div>
                  <label className="text-sm text-gray-600">Confidence Level</label>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${result.confidence * 100}%` }}
                      ></div>
                    </div>
                    <span className="font-medium">{(result.confidence * 100).toFixed(2)}%</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-600">Severity</label>
                  <p className={`text-lg font-medium ${
                    result.severity === 'High'
                      ? 'text-red-600'
                      : result.severity === 'Medium'
                      ? 'text-yellow-600'
                      : 'text-green-600'
                  }`}>
                    {result.severity}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="border-t p-8">
            <h3 className="text-lg font-semibold mb-4">Recommendations</h3>
            <ul className="space-y-2">
              {result.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Timestamp */}
          <div className="border-t p-8 text-sm text-gray-600">
            Analysis performed: {new Date(result.timestamp).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;

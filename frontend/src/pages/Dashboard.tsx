import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Analysis {
  id: string;
  disease: string;
  confidence: number;
  date: string;
  type: string;
}

const Dashboard: React.FC = () => {
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalyses();
  }, []);

  const fetchAnalyses = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/analyses`);
      setAnalyses(response.data);
    } catch (error) {
      console.error('Error fetching analyses:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Dashboard</h2>
          <Link
            to="/scanner"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg"
          >
            + New Scan
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600 text-sm font-medium">Total Scans</h3>
            <p className="text-3xl font-bold text-green-600">{analyses.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600 text-sm font-medium">Issues Detected</h3>
            <p className="text-3xl font-bold text-red-600">5</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600 text-sm font-medium">Healthy</h3>
            <p className="text-3xl font-bold text-green-600">{Math.max(0, analyses.length - 5)}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h3 className="text-xl font-bold">Recent Analyses</h3>
          </div>
          {loading ? (
            <p className="p-6 text-center text-gray-500">Loading...</p>
          ) : analyses.length === 0 ? (
            <p className="p-6 text-center text-gray-500">No analyses yet. Start scanning!</p>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Type</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Disease</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Confidence</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {analyses.map((analysis) => (
                  <tr key={analysis.id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm">{analysis.type}</td>
                    <td className="px-6 py-4 text-sm">{analysis.disease}</td>
                    <td className="px-6 py-4 text-sm">{(analysis.confidence * 100).toFixed(2)}%</td>
                    <td className="px-6 py-4 text-sm">{new Date(analysis.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-sm">
                      <Link to={`/results/${analysis.id}`} className="text-green-600 hover:underline">
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

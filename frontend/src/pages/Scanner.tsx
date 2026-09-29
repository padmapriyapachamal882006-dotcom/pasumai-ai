import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Scanner: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [scanType, setScanType] = useState<'leaf' | 'soil' | 'land'>('leaf');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleScan = async () => {
    if (!image) {
      alert('Please select an image first');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('image', image);
    formData.append('type', scanType);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/analyze`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      navigate(`/results/${response.data.id}`);
    } catch (error) {
      console.error('Error during scan:', error);
      alert('Error performing scan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8">Image Scanner</h2>

        <div className="bg-white rounded-lg shadow p-8">
          {/* Scan Type Selection */}
          <div className="mb-8">
            <label className="block text-lg font-semibold mb-4">Select Scan Type:</label>
            <div className="grid grid-cols-3 gap-4">
              {(['leaf', 'soil', 'land'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setScanType(type)}
                  className={`py-3 px-4 rounded-lg font-medium transition ${
                    scanType === type
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Image Upload */}
          <div className="mb-8">
            <label className="block text-lg font-semibold mb-4">Upload Image:</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-green-500 transition">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              {preview ? (
                <div>
                  <img src={preview} alt="Preview" className="max-h-96 mx-auto mb-4" />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="text-blue-600 hover:underline"
                  >
                    Change Image
                  </button>
                </div>
              ) : (
                <div onClick={() => fileInputRef.current?.click()}>
                  <p className="text-gray-600 mb-2">📷 Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              )}
            </div>
          </div>

          {/* Scan Button */}
          <button
            onClick={handleScan}
            disabled={!image || loading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition"
          >
            {loading ? 'Scanning...' : 'Start Scan'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Scanner;

import React, { useState, useEffect, useRef } from 'react';
import { Camera, Zap, Award, Leaf, CheckCircle, AlertCircle } from 'lucide-react';
import * as mobilenet from '@tensorflow-models/mobilenet';
import './DetectionPage.css';
import { API_BASE_URL } from '../utils/config';

const DetectionPage = () => {
  const [step, setStep] = useState('input'); // input, detecting, result
  const [image, setImage] = useState(null);
  const [weight, setWeight] = useState('');
  const [dimensions, setDimensions] = useState({ width: '', height: '', depth: '' });
  const [detectionResult, setDetectionResult] = useState(null);
  const [selectedBin, setSelectedBin] = useState(null);
  const [model, setModel] = useState(null);
  const [isModelLoading, setIsModelLoading] = useState(true);
  const imageRef = useRef(null);

  useEffect(() => {
    loadModel();
  }, []);

  const loadModel = async () => {
    try {
      console.log('Loading MobileNet model...');
      const loadedModel = await mobilenet.load();
      setModel(loadedModel);
      setIsModelLoading(false);
      console.log('Model loaded successfully');
    } catch (error) {
      console.error('Failed to load model:', error);
      setIsModelLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDetect = async () => {
    if (!image) {
      alert('Please upload an image first');
      return;
    }
    if (!weight || !dimensions.width || !dimensions.height || !dimensions.depth) {
      alert('Please fill in all measurements');
      return;
    }

    setStep('detecting');

    try {
      // 1. AI Detection using TensorFlow.js
      let aiDetectedType = null;
      let aiConfidence = 0;
      let aiExplanation = '';

      if (model && imageRef.current) {
        const predictions = await model.classify(imageRef.current);
        console.log('Predictions:', predictions);

        if (predictions && predictions.length > 0) {
          const topPrediction = predictions[0];

          // Map MobileNet classes to our waste types
          const className = topPrediction.className.toLowerCase();
          aiExplanation = `AI identified: ${topPrediction.className}`;
          aiConfidence = topPrediction.probability;

          if (className.includes('phone') || className.includes('cellular')) aiDetectedType = 'phone';
          else if (className.includes('laptop') || className.includes('notebook') || className.includes('computer')) aiDetectedType = 'laptop';
          else if (className.includes('tablet') || className.includes('ipad')) aiDetectedType = 'tablet';
          else if (className.includes('battery') || className.includes('cell')) aiDetectedType = 'battery';
          else if (className.includes('plug') || className.includes('adapter') || className.includes('charger')) aiDetectedType = 'charger';
          else if (className.includes('cable') || className.includes('wire')) aiDetectedType = 'cable';
          else if (className.includes('headphone') || className.includes('earphone') || className.includes('headset')) aiDetectedType = 'earphones';
          else if (className.includes('printer')) aiDetectedType = 'printer';
          else if (className.includes('monitor') || className.includes('screen') || className.includes('display') || className.includes('television')) aiDetectedType = 'monitor';
          else aiDetectedType = 'unknown'; // Fallback for other items
        }
      }

      // 2. Send data to backend
      const formData = new FormData();
      formData.append('weight', weight);
      formData.append('width', dimensions.width);
      formData.append('height', dimensions.height);
      formData.append('depth', dimensions.depth);
      if (aiDetectedType) {
        formData.append('aiDetectedType', aiDetectedType);
        formData.append('aiConfidence', aiConfidence);
        formData.append('aiExplanation', aiExplanation);
      }

      // We need to send the image file itself if we want backend to save it, 
      // but strictly for detection we are doing it client side now. 
      // However the backend endpoint expects 'image' file in upload.single('image').
      // So we need to convert base64 image back to blob/file or just send updated params.
      // For simplicity, let's fetch the blob from the image src.
      const imageResponse = await fetch(image);
      const imageBlob = await imageResponse.blob();
      formData.append('image', imageBlob, 'upload.jpg');



      // ... (in handleDetect)

      const response = await fetch(`${API_BASE_URL}/api/detect`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      setDetectionResult(data);
      setStep('result');
    } catch (error) {
      console.error('Detection error:', error);
      alert('Error during detection. Please try again.');
      setStep('input');
    }
  };

  const handleSubmitRecycling = async () => {
    if (!selectedBin) {
      alert('Please select a bin first');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/transactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: '1', // Demo user
          binId: selectedBin,
          detectedItem: detectionResult,
          value: detectionResult.value,
          co2Saved: detectionResult.co2Impact
        })
      });

      if (response.ok) {
        alert('Recycling recorded successfully! Points added to your account.');
        resetForm();
      }
    } catch (error) {
      console.error('Error submitting:', error);
    }
  };

  const resetForm = () => {
    setStep('input');
    setImage(null);
    setWeight('');
    setDimensions({ width: '', height: '', depth: '' });
    setDetectionResult(null);
    setSelectedBin(null);
  };

  return (
    <div className="detection-page">
      <div className="container">
        <div className="page-header animate-fade-in">
          <h1>AI Waste Detection</h1>
          <p>Let our smart system identify your e-waste and calculate its value</p>
          {isModelLoading && <p className="loading-text"><small>Initializing AI Model...</small></p>}
        </div>

        {step === 'input' && (
          <div className="detection-input animate-scale-in">
            <div className="input-section card">
              <h3>Upload Item Image</h3>
              <div className="image-upload">
                {image ? (
                  <div className="image-preview">
                    <img src={image} alt="Uploaded item" ref={imageRef} crossOrigin="anonymous" />
                    <button
                      className="change-image"
                      onClick={() => setImage(null)}
                    >
                      Change Image
                    </button>
                  </div>
                ) : (
                  <label className="upload-area">
                    <Camera size={48} />
                    <span>Click to upload or take a photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={handleImageUpload}
                      hidden
                    />
                  </label>
                )}
              </div>
            </div>

            <div className="measurements-section card">
              <h3>Item Measurements</h3>
              <p className="section-help">These help us accurately identify your item</p>

              <div className="input-group">
                <label>Weight (grams)</label>
                <input
                  type="number"
                  placeholder="e.g., 250"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="input-field"
                />
              </div>

              <div className="dimensions-grid">
                <div className="input-group">
                  <label>Width (cm)</label>
                  <input
                    type="number"
                    placeholder="e.g., 15"
                    value={dimensions.width}
                    onChange={(e) => setDimensions({ ...dimensions, width: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div className="input-group">
                  <label>Height (cm)</label>
                  <input
                    type="number"
                    placeholder="e.g., 8"
                    value={dimensions.height}
                    onChange={(e) => setDimensions({ ...dimensions, height: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div className="input-group">
                  <label>Depth (cm)</label>
                  <input
                    type="number"
                    placeholder="e.g., 1"
                    value={dimensions.depth}
                    onChange={(e) => setDimensions({ ...dimensions, depth: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>

              <button
                className="btn btn-primary btn-large"
                onClick={handleDetect}
                disabled={isModelLoading}
              >
                <Zap size={20} />
                {isModelLoading ? 'Loading AI...' : 'Detect Item'}
              </button>
            </div>
          </div>
        )}

        {step === 'detecting' && (
          <div className="detecting-animation animate-scale-in">
            <div className="card detection-card">
              <div className="scanner">
                <div className="scan-line"></div>
                <Zap size={64} className="scan-icon" />
              </div>
              <h2>Analyzing Your Item...</h2>
              <p>Our AI is processing the image and measurements</p>
              <div className="progress-steps">
                <div className="step active">
                  <CheckCircle size={20} />
                  <span>Image Processed</span>
                </div>
                <div className="step active">
                  <CheckCircle size={20} />
                  <span>AI Classification</span>
                </div>
                <div className="step active">
                  <CheckCircle size={20} />
                  <span>Value Estimation</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 'result' && detectionResult && (
          <div className="detection-result animate-scale-in">
            <div className="result-card card">
              <div className="result-header">
                {detectionResult.confidence >= 0.6 ? (
                  <CheckCircle size={48} className="success-icon" />
                ) : (
                  <AlertCircle size={48} className="warning-icon" />
                )}
                <h2>Detection Complete!</h2>
              </div>

              <div className="detected-item">
                <div className="item-icon">{detectionResult.icon}</div>
                <div className="item-details">
                  <h3>{detectionResult.name}</h3>
                  <div className="confidence-bar">
                    <div className="confidence-label">
                      Confidence: {Math.round(detectionResult.confidence * 100)}%
                    </div>
                    <div className="bar">
                      <div
                        className="fill"
                        style={{
                          width: `${detectionResult.confidence * 100}%`,
                          background: detectionResult.confidence >= 0.7
                            ? 'var(--success)'
                            : 'var(--warning)'
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="detection-explanation">
                <p>{detectionResult.explanation}</p>
              </div>

              <div className="value-section">
                <div className="value-card">
                  <Award size={32} />
                  <div className="value-info">
                    <span className="value-label">Estimated Value</span>
                    <span className="value-amount">{detectionResult.value} Points</span>
                  </div>
                </div>
                <div className="impact-card">
                  <Leaf size={32} />
                  <div className="impact-info">
                    <span className="impact-label">CO₂ Impact</span>
                    <span className="impact-amount">{detectionResult.co2Impact} kg saved</span>
                  </div>
                </div>
              </div>

              <div className="condition-badge">
                Condition: <strong>{detectionResult.condition}</strong>
              </div>

              {detectionResult.confidence < 0.6 && (
                <div className="low-confidence-notice">
                  <AlertCircle size={20} />
                  <div>
                    <strong>Low Confidence Detection</strong>
                    <p>The item will be manually verified at the bin for accuracy</p>
                  </div>
                </div>
              )}

              <div className="result-actions">
                <button
                  className="btn btn-primary btn-large"
                  onClick={handleSubmitRecycling}
                >
                  Confirm & Find Bin
                </button>
                <button
                  className="btn btn-outline"
                  onClick={resetForm}
                >
                  Detect Another Item
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetectionPage;

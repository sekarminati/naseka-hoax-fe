import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (inputText.trim()) {
      setIsSubmitted(true);
      setLoading(true);

      const apiResponse = await checkHoax(inputText);

      setResult(apiResponse);
      setLoading(false);
    }
  };

  const checkHoax = async (prompt) => {
    try {
      const response = await axios.post(
        'https://rkxawkbkmtyhgf4fmzsrmtx54u0jcosy.lambda-url.ap-southeast-1.on.aws/text',
        { prompt }
      );
      return response.data.result;
    } catch (error) {
      return 'Error checking the text. Please try again.';
    }
  };

  const handleReset = () => {
    setInputText('');
    setResult(null);
    setIsSubmitted(false);
    setLoading(false);
  };

  return (
    <div className="app-container">
      <section className="content">
        <h1 className="title">Hoax Checker</h1>

        {!isSubmitted && (
          <div className="input-section">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter your question or text to verify..."
              className="input-field"
            ></textarea>
            <button onClick={handleSubmit} className="submit-button">
              Submit
            </button>
          </div>
        )}

        {isSubmitted && loading && (
          <div className="loading-section">
            <div className="spinner"></div>
            <p>Checking...</p>
          </div>
        )}

        {isSubmitted && result && (
          <div className="result-section">
            <h2>Result:</h2> <p dangerouslySetInnerHTML={{ __html: result }} />
            <button onClick={handleReset} className="reset-button">
              Check Another
            </button>
          </div>
        )}
      </section>

      <footer className="footer">
        <p>© 2024 NASEKA. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;

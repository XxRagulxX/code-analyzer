import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:5000/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(response.data.result);
    } catch (err) {
      setResult("Error analyzing code.");
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h1 className="glitch" data-text="CODE VULNERABILITY ANALYZER">
        CODE VULNERABILITY ANALYZER
      </h1>

      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="file-upload" className="custom-file-upload">
          Choose code file
        </label>
        <input
          id="file-upload"
          type="file"
          accept=".py,.js,.java,.cpp,.c"
          onChange={handleFileChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </form>

      {result && (
        <div className="result">
          <h2>Analysis Result</h2>
          <pre>{result}</pre>
        </div>
      )}

      {/* Matrix style background */}
      <div className="matrix-bg"></div>
    </div>
  );
}

export default App;
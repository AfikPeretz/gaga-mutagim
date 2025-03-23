import React, { useState } from 'react';
import api from '../api';
import '../pages-css/AdminBulkUpload.css';

export default function AdminBulkUpload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert('Please select a file.');

    try {
      const text = await file.text();
      const products = JSON.parse(text);

      const res = await api.post('/products/bulk', { products });
      alert(`Successfully uploaded ${res.data.created} products.`);
      setFile(null);
      document.querySelector('input[type="file"]').value = '';
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || 'Upload failed');
    }
  };

  return (
    <div className="admin-bulk-container">
      <h2 className="admin-bulk-title">Bulk Product Upload (JSON)</h2>
      <input type="file" accept="application/json" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

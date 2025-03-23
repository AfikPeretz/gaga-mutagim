// File: frontend/src/pages/AdminCreateProduct.jsx

import React, { useState } from 'react';
import api from '../api';
import '../pages-css/AdminCreateProduct.css';

export default function AdminCreateProduct() {
  const [form, setForm] = useState({
    name: '',
    price: '',
    description: '',
    image_url: '',
    category: '',
    subcategory: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/products', form);
      alert('Product created!');
      setForm({ name: '', price: '', description: '', image_url: '', category: '', subcategory: '' });
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to create product');
    }
  };

  return (
    <div className="admin-create-container">
      <h2 className="admin-create-title">Create New Product</h2>
      <form className="admin-create-form" onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Product Name" required />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Price" required type="number" />
        <input name="description" value={form.description} onChange={handleChange} placeholder="Description" />
        <input name="image_url" value={form.image_url} onChange={handleChange} placeholder="Image URL" />
        <input name="category" value={form.category} onChange={handleChange} placeholder="Category" />
        <input name="subcategory" value={form.subcategory} onChange={handleChange} placeholder="Subcategory" />
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
}

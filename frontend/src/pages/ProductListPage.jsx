// File: frontend/src/pages/ProductListPage.jsx

import React, { useEffect, useState } from 'react';
import api from '../api';
import '../pages-css/ProductListPage.css';

export default function ProductListPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products');
        setProducts(res.data);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="product-list-container">
      <h2 className="product-list-title">All Products</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image_url} alt={product.name} className="product-image" />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">{product.price} ₪</p>
            <p className="product-category">{product.category} / {product.subcategory}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

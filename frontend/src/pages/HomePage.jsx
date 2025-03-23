// File: frontend/src/pages/HomePage.jsx

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api';
import '../pages-css/HomePage.css';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [index, setIndex] = useState(0);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % products.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [products]);

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % products.length);
  };

  const currentProduct = products[index];

  return (
    <div className="homepage-container">
      <h1 className="homepage-title">Gaga Mutagim</h1>
      {products.length > 0 && (
        <div className="carousel-container">
          <button className="carousel-button" onClick={handlePrev}>&lt;</button>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentProduct.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.4 }}
              className="product-card"
            >
              <img
                src={currentProduct.image_url}
                alt={currentProduct.name}
                className="product-image"
              />
              <h2 className="product-name">{currentProduct.name}</h2>
              <p className="product-price">{currentProduct.price} ₪</p>
              <button className="shop-now-button">Shop Now</button>
            </motion.div>
          </AnimatePresence>

          <button className="carousel-button" onClick={handleNext}>&gt;</button>
        </div>
      )}
    </div>
  );
}

// File: frontend/src/components/Layout.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './Layout.css';

export default function Layout({ children }) {
  return (
    <div className="site-wrapper">
      <header className="site-header">
        <nav className="navbar">
          <Link to="/" className="logo">Gaga Mutagim</Link>
          <div className="nav-links">
            <Link to="/products">Products</Link>
            <Link to="/admin/create">Add Product</Link>
            <Link to="/admin/bulk-upload">Bulk Upload</Link>
          </div>
        </nav>
      </header>

      <main className="main-content">{children}</main>

      <footer className="site-footer">
        <p>© {new Date().getFullYear()} Gaga Mutagim. All rights reserved.</p>
        <p>Contact us: support@gagamutagim.com | Instagram: @gagamutagim</p>
      </footer>
    </div>
  );
}

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import AdminCreateProduct from './pages/AdminCreateProduct';
import AdminBulkUpload from './pages/AdminBulkUpload';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/admin/create" element={<AdminCreateProduct />} />
          <Route path="/admin/bulk-upload" element={<AdminBulkUpload />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

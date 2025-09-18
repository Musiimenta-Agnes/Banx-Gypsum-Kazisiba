// src/pages/ProductPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminAddProduct from '../dashboard/pages/AddProduct';
import Products from './SampleProducts';

const API_URL = process.env.REACT_APP_API_URL;

function ProductPage() {
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    axios
      .get(`${API_URL}/api/products/get_all_products`)
      .then((res) => setProducts(res.data.products || []))
      .catch((err) => console.error('❌ Failed to fetch products:', err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <AdminAddProduct onProductAdded={fetchProducts} />

      <hr />

      <div className="container" style={{ fontSize:'0.9rem' }}>

        <div className="row mt-4">
          {products.length > 0 ? (
            products.map((p) => (
              <div className="col-md-3 mb-4" key={p.id}>
                <Products
                  image={`${API_URL}${p.image_url}`}
                  name={p.name}
                  productId={p.id}
                  cart="Add to Cart"
                />
              </div>
            ))
          ) : (
            <p className="text-center mt-3 text-muted">No products available yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductPage;


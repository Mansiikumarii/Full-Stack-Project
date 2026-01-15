import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('published');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [imageIndices, setImageIndices] = useState({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/products', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setProducts(response.data.products || []);
      setError('');
    } catch (err) {
      console.error('Error fetching products:', err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const publishedProducts = products.filter(p => p.published !== false);
  const unpublishedProducts = products.filter(p => p.published === false);
  const currentProducts = activeTab === 'published' ? publishedProducts : unpublishedProducts;

  const handleAddProduct = () => {
    navigate('/create-product');
  };

  const handlePublishToggle = async (product) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/products/${product._id}`,
        { published: !product.published },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      
      if (response.data.success) {
        setSuccess(`Product ${!product.published ? 'published' : 'unpublished'} successfully`);
        fetchProducts();
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      setError('Failed to update product status');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct({ ...product });
  };

  const handleSaveEdit = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/products/${editingProduct._id}`,
        editingProduct,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      
      if (response.data.success) {
        setSuccess('Product updated successfully');
        setEditingProduct(null);
        fetchProducts();
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      setError('Failed to update product');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleDeleteProduct = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/products/${deletingProduct._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      
      if (response.data.success) {
        setSuccess('Product deleted successfully');
        setDeletingProduct(null);
        fetchProducts();
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      setError('Failed to delete product');
      setTimeout(() => setError(''), 3000);
    }
  };

  const getProductImage = (product) => {
    if (!product.images || product.images.length === 0) {
      return 'https://via.placeholder.com/300x300?text=No+Image';
    }
    const index = imageIndices[product._id] || 0;
    return product.images[index];
  };

  if (loading) {
    return <div className="dashboard-loading">Loading...</div>;
  }

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">Productr 🛍️</div>
        <div className="sidebar-menu">
          <div className="menu-item active">
            <span>🏠</span> Home
          </div>
          <div className="menu-item" onClick={() => navigate('/products')}>
            <span>📦</span> Products
          </div>
        </div>
        <div className="sidebar-search">
          <input type="text" placeholder="Search" />
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Top Bar */}
        <div className="top-bar">
          <div className="search-bar">
            <input type="text" placeholder="Search Services, Products" />
          </div>
          <div className="top-actions">
            <button onClick={handleAddProduct} className="add-products-btn">
              + Add Products
            </button>
            <div className="user-profile">
              <span>{user?.firstName || 'User'}</span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="content-area">
          <h2>Products</h2>

          {error && (
            <div className="alert alert-error">
              <span>{error}</span>
              <button onClick={() => setError('')}>×</button>
            </div>
          )}

          {success && (
            <div className="alert alert-success">
              <span>✓ {success}</span>
              <button onClick={() => setSuccess('')}>×</button>
            </div>
          )}

          {/* Tabs */}
          <div className="tabs">
            <button
              className={`tab ${activeTab === 'published' ? 'active' : ''}`}
              onClick={() => setActiveTab('published')}
            >
              Published
            </button>
            <button
              className={`tab ${activeTab === 'unpublished' ? 'active' : ''}`}
              onClick={() => setActiveTab('unpublished')}
            >
              Unpublished
            </button>
          </div>

          {/* Products Grid */}
          {currentProducts.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📦</div>
              <h3>No {activeTab === 'published' ? 'Published' : 'Unpublished'} Products</h3>
              <p>Create your first product to {activeTab}</p>
              <button onClick={handleAddProduct} className="create-btn">
                Create Product
              </button>
            </div>
          ) : (
            <div className="products-grid">
              {currentProducts.map((product) => (
                <div key={product._id} className="product-card">
                  {/* Image Container */}
                  <div className="product-image">
                    <img src={getProductImage(product)} alt={product.title} />
                    {product.images && product.images.length > 1 && (
                      <div className="image-dots">
                        {product.images.map((_, idx) => (
                          <dot
                            key={idx}
                            className={`dot ${idx === (imageIndices[product._id] || 0) ? 'active' : ''}`}
                            onClick={() => setImageIndices({ ...imageIndices, [product._id]: idx })}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="product-details">
                    <h3>{product.title}</h3>
                    
                    <div className="detail-row">
                      <span className="label">Product type</span>
                      <span className="value">{product.category}</span>
                    </div>

                    <div className="detail-row">
                      <span className="label">Quantity Stock</span>
                      <span className="value">{product.stock}</span>
                    </div>

                    <div className="detail-row">
                      <span className="label">MRP</span>
                      <span className="value">₹ {product.mrp || product.price}</span>
                    </div>

                    <div className="detail-row">
                      <span className="label">Selling Price</span>
                      <span className="value">₹ {product.price}</span>
                    </div>

                    <div className="detail-row">
                      <span className="label">Brand Name</span>
                      <span className="value">{product.brand || 'Not specified'}</span>
                    </div>

                    <div className="detail-row">
                      <span className="label">Total Number of images</span>
                      <span className="value">{product.images?.length || 0}</span>
                    </div>

                    <div className="detail-row">
                      <span className="label">Exchange Eligibility</span>
                      <span className="value">{product.exchangeOrReturnEligibility ? 'YES' : 'NO'}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="actions">
                      <button
                        className={`btn ${product.published ? 'btn-unpublish' : 'btn-publish'}`}
                        onClick={() => handlePublishToggle(product)}
                      >
                        {product.published ? 'Unpublish' : 'Publish'}
                      </button>
                      <button
                        className="btn btn-edit"
                        onClick={() => handleEditProduct(product)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-delete"
                        onClick={() => setDeletingProduct(product)}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {editingProduct && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Edit Product</h2>
              <button className="close-btn" onClick={() => setEditingProduct(null)}>×</button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Product Name</label>
                <input
                  type="text"
                  value={editingProduct.title}
                  onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Product Type</label>
                <select
                  value={editingProduct.category}
                  onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                >
                  <option>Foods</option>
                  <option>Electronics</option>
                  <option>Clothes</option>
                  <option>Beauty Products</option>
                  <option>Others</option>
                </select>
              </div>

              <div className="form-group">
                <label>Quantity Stock</label>
                <input
                  type="number"
                  value={editingProduct.stock}
                  onChange={(e) => setEditingProduct({ ...editingProduct, stock: parseInt(e.target.value) })}
                />
              </div>

              <div className="form-group">
                <label>MRP</label>
                <input
                  type="number"
                  value={editingProduct.mrp}
                  onChange={(e) => setEditingProduct({ ...editingProduct, mrp: parseFloat(e.target.value) })}
                />
              </div>

              <div className="form-group">
                <label>Selling Price</label>
                <input
                  type="number"
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
                />
              </div>

              <div className="form-group">
                <label>Brand Name</label>
                <input
                  type="text"
                  value={editingProduct.brand}
                  onChange={(e) => setEditingProduct({ ...editingProduct, brand: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Upload Product Images</label>
                <div className="image-preview-grid">
                  {editingProduct.images?.map((img, idx) => (
                    <div key={idx} className="image-preview">
                      <img src={img} alt={`Image ${idx}`} />
                      <button
                        className="remove-btn"
                        onClick={() => {
                          const newImages = editingProduct.images.filter((_, i) => i !== idx);
                          setEditingProduct({ ...editingProduct, images: newImages });
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <a href="#add-photos" className="add-more">Add More Photos</a>
              </div>

              <div className="form-group">
                <label>Exchange or return eligibility</label>
                <select
                  value={editingProduct.exchangeOrReturnEligibility ? 'Yes' : 'No'}
                  onChange={(e) => setEditingProduct({ ...editingProduct, exchangeOrReturnEligibility: e.target.value === 'Yes' })}
                >
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-update" onClick={handleSaveEdit}>Update</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingProduct && (
        <div className="modal-overlay">
          <div className="modal delete-modal">
            <h2>Delete Product</h2>
            <p>Are you sure you really want to delete this Product "<strong>{deletingProduct.title}</strong>"?</p>
            <div className="modal-actions">
              <button className="btn btn-cancel" onClick={() => setDeletingProduct(null)}>Cancel</button>
              <button className="btn btn-delete-confirm" onClick={handleDeleteProduct}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

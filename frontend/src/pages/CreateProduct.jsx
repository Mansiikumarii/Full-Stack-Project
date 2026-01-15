import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/CreateProduct.css';

const CreateProduct = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    productName: '',
    productType: '',
    quantityStock: '',
    mrp: '',
    sellingPrice: '',
    brandName: '',
    exchangeOrReturnEligibility: 'Yes',
    images: [],
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const productTypes = ['Foods', 'Electronics', 'Clothes', 'Beauty Products', 'Others'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, reader.result]);
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, reader.result],
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!formData.productName.trim()) {
      setError('Product Name is required');
      return;
    }
    if (!formData.productType) {
      setError('Product Type is required');
      return;
    }
    if (!formData.quantityStock || isNaN(formData.quantityStock)) {
      setError('Valid Quantity Stock is required');
      return;
    }
    if (!formData.mrp || isNaN(formData.mrp)) {
      setError('Valid MRP is required');
      return;
    }
    if (!formData.sellingPrice || isNaN(formData.sellingPrice)) {
      setError('Valid Selling Price is required');
      return;
    }
    if (!formData.brandName.trim()) {
      setError('Brand Name is required');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/products', 
        {
          title: formData.productName,
          description: formData.productName,
          category: formData.productType,
          stock: parseInt(formData.quantityStock),
          mrp: parseFloat(formData.mrp),
          price: parseFloat(formData.sellingPrice),
          brand: formData.brandName,
          images: formData.images,
          exchangeOrReturnEligibility: formData.exchangeOrReturnEligibility === 'Yes',
          published: true,
        },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.data.success) {
        setSuccess('Product created successfully!');
        // Reset form
        setFormData({
          productName: '',
          productType: '',
          quantityStock: '',
          mrp: '',
          sellingPrice: '',
          brandName: '',
          exchangeOrReturnEligibility: 'Yes',
          images: [],
        });
        setImagePreviews([]);
        
        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-product-overlay">
      <div className="create-product-modal">
        <div className="modal-header">
          <h2>Add Product</h2>
          <button 
            className="close-btn" 
            onClick={() => navigate('/dashboard')}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="product-form">
          {error && (
            <div className="error-message">
              <p>{error}</p>
              <button type="button" onClick={() => setError('')}>×</button>
            </div>
          )}

          {success && (
            <div className="success-message">
              <p>{success}</p>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="productName">Product Name <span className="required">*</span></label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={formData.productName}
              onChange={handleInputChange}
              placeholder="CakeZone Walnut Brownie"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="productType">Product Type <span className="required">*</span></label>
            <select
              id="productType"
              name="productType"
              value={formData.productType}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="">Select product type</option>
              {productTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="quantityStock">Quantity Stock <span className="required">*</span></label>
            <input
              type="number"
              id="quantityStock"
              name="quantityStock"
              value={formData.quantityStock}
              onChange={handleInputChange}
              placeholder="Total numbers of Stock available"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="mrp">MRP <span className="required">*</span></label>
            <input
              type="number"
              id="mrp"
              name="mrp"
              value={formData.mrp}
              onChange={handleInputChange}
              placeholder="Total numbers of Stock available"
              step="0.01"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="sellingPrice">Selling Price <span className="required">*</span></label>
            <input
              type="number"
              id="sellingPrice"
              name="sellingPrice"
              value={formData.sellingPrice}
              onChange={handleInputChange}
              placeholder="Total numbers of Stock available"
              step="0.01"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="brandName">Brand Name <span className="required">*</span></label>
            <input
              type="text"
              id="brandName"
              name="brandName"
              value={formData.brandName}
              onChange={handleInputChange}
              placeholder="Total numbers of Stock available"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Upload Product Images</label>
            <div className="image-upload-section">
              <div className="image-preview-container">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="image-preview">
                    <img src={preview} alt={`Preview ${index}`} />
                    <button
                      type="button"
                      className="remove-image-btn"
                      onClick={() => removeImage(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="browse-btn"
                onClick={() => fileInputRef.current.click()}
              >
                Browse
              </button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
            </div>
            {imagePreviews.length > 0 && (
              <button
                type="button"
                className="add-more-photos-btn"
                onClick={() => fileInputRef.current.click()}
              >
                Add More Photos
              </button>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="exchangeOrReturnEligibility">Exchange or return eligibility</label>
            <select
              id="exchangeOrReturnEligibility"
              name="exchangeOrReturnEligibility"
              value={formData.exchangeOrReturnEligibility}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <button
            type="submit"
            className="create-btn"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;

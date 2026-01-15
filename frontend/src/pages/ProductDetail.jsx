import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productService } from '../services/api';
import { Loading, ErrorMessage, Button } from '../components/UI';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await productService.getProductById(id);
      setProduct(response.data.product);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  if (error) return <ErrorMessage message={error} onClose={() => navigate('/dashboard')} />;

  if (!product) return <div>Product not found</div>;

  const currentImage = product.images && product.images.length > 0
    ? product.images[currentImageIndex]
    : 'https://via.placeholder.com/500x500?text=No+Image';

  return (
    <div className="product-detail-container">
      <div className="detail-wrapper">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>
          ← Back to Products
        </button>

        <div className="product-detail-content">
          <div className="product-gallery">
            <div className="main-image">
              <img src={currentImage} alt={product.title} />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="thumbnail-images">
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className={currentImageIndex === index ? 'active' : ''}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="product-details">
            <div className="product-header">
              <h1>{product.title}</h1>
              <span className="category-badge">{product.category}</span>
            </div>

            <div className="product-price-section">
              <div className="price">${product.price}</div>
              <div className="stock-info">
                {product.stock > 0 ? (
                  <span className="in-stock">In Stock ({product.stock} available)</span>
                ) : (
                  <span className="out-of-stock">Out of Stock</span>
                )}
              </div>
            </div>

            <div className="seller-info">
              <h3>Seller Information</h3>
              <p className="seller-name">
                {product.seller?.firstName} {product.seller?.lastName}
              </p>
              <p className="seller-email">{product.seller?.email}</p>
            </div>

            <div className="product-description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

            <div className="product-rating">
              <h3>Rating</h3>
              <div className="stars">
                {Array(5).fill(0).map((_, i) => (
                  <span key={i} className={i < Math.round(product.rating) ? 'filled' : ''}>
                    ★
                  </span>
                ))}
              </div>
              <span className="rating-value">{product.rating} / 5</span>
            </div>

            <div className="product-actions">
              <Button variant="primary" disabled={product.stock === 0}>
                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </Button>
              <Button variant="secondary">Contact Seller</Button>
            </div>
          </div>
        </div>

        {product.reviews && product.reviews.length > 0 && (
          <div className="reviews-section">
            <h2>Customer Reviews</h2>
            <div className="reviews-list">
              {product.reviews.map((review, index) => (
                <div key={index} className="review-item">
                  <div className="review-header">
                    <div className="review-rating">
                      {Array(5).fill(0).map((_, i) => (
                        <span key={i} className={i < review.rating ? 'filled' : ''}>
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="review-date">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="review-comment">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;

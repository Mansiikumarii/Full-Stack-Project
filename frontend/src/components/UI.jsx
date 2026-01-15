import React from 'react';
import '../styles/components.css';

export const Button = ({ children, type = 'button', onClick, disabled = false, className = '', variant = 'primary' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant} ${className}`}
    >
      {children}
    </button>
  );
};

export const Input = ({ label, type = 'text', name, value, onChange, placeholder = '', error = '', required = false }) => {
  return (
    <div className="form-group">
      {label && <label>{label} {required && <span className="required">*</span>}</label>}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={error ? 'form-control error' : 'form-control'}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export const Card = ({ children, className = '' }) => {
  return (
    <div className={`card ${className}`}>
      {children}
    </div>
  );
};

export const Loading = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
};

export const ErrorMessage = ({ message, onClose }) => {
  return (
    <div className="error-banner">
      <span>{message}</span>
      {onClose && <button onClick={onClose} className="close-btn">&times;</button>}
    </div>
  );
};

export const SuccessMessage = ({ message, onClose }) => {
  return (
    <div className="success-banner">
      <span>{message}</span>
      {onClose && <button onClick={onClose} className="close-btn">&times;</button>}
    </div>
  );
};

import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    dob: ''
  });
  const [errors, setErrors] = useState({});

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = (event) => {
    if (event.target.className === 'backdrop') {
      setIsOpen(false);
      setErrors({});
      setFormData({
        username: '',
        email: '',
        phone: '',
        dob: ''
      });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = validateForm(formData);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      alert("Form submitted successfully!");
      handleCloseModal({target: {className: 'backdrop'}});
    }
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.username) {
      errors.username = "Please fill out this field.";
    }
    
    else if (!data.email.includes('@')) {
      errors.email = "Please include an '@' in the email address.";
    }
    if (!data.email) {
      errors.email = "Please fill out this field.";
    } else if (!data.email.includes('@')) {
      errors.email = "Please include an '@' in the email address.";
    }
    if (!data.phone) {
      errors.phone = "Please fill out this field.";
    } else if (data.phone.length !== 10) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
    }
    if (!data.dob) {
      errors.dob = "Please fill out this field.";
    } else if (new Date(data.dob) > new Date()) {
      alert("Invalid date of birth. Date of birth cannot be in the future.");
    }
    return errors;
  };

  const handleModalClick = (event) => {
    event.stopPropagation(); // This stops the click from reaching the backdrop
  };
  
  return (
    <div className="app">
      <div className="header">
        <h1>User Details Modal</h1>
        <button onClick={handleOpenModal} style={{ backgroundColor: 'blue', color: 'white' }}>Open Form</button>
      </div>
      {isOpen && (
        <div className="modal" onClick={handleCloseModal}>
          <div className="modal-content" onClick={handleModalClick}>
            <form onSubmit={handleSubmit}>
              <label>Username:</label>
              <input type="text" name="username" value={formData.username} onChange={handleChange} />
              {errors.username && <div className="error">{errors.username}</div>}
  
              <label>Email Address:</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
              {errors.email && <div className="error">{errors.email}</div>}
  
              <label>Phone Number:</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
  
              <label>Date of Birth:</label>
              <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
  
              <button type="submit" className="submit-button">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
      }  
export default App;

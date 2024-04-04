import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './App.css'; // Your custom CSS file

const TextAreaWithButton = () => {
  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="form-group">
            <textarea className="form-control" rows="5"></textarea>
            <button className="btn btn-primary mt-2">Button Inside TextArea</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextAreaWithButton;


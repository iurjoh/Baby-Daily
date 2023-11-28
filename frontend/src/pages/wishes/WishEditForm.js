import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { axiosRes } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom";

function WishEditForm({ wish, onEditFormClose, onUpdateWish }) {
  const [editedWish, setEditedWish] = useState(wish);
  const [validationErrors, setValidationErrors] = useState({});
  const history = useHistory();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setEditedWish((prevWish) => ({
      ...prevWish,
      [name]: newValue,
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!editedWish.title.trim()) {
      errors.title = "Title cannot be empty";
    }
    if (!editedWish.description.trim()) {
      errors.description = "Description cannot be empty";
    }
    if (isNaN(editedWish.price) || editedWish.price <= 0) {
      errors.price = "Price must be a positive number";
    } else if (!/^\d+(\.\d{1,2})?$/.test(editedWish.price.toString())) {
      errors.price = "Price can have up to 2 decimal places";
    }
    if (!editedWish.purchase_link.trim()) {
      errors.purchase_link = "Purchase Link cannot be empty";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const updatedWish = await axiosRes.put(`/wishes/${editedWish.id}/`, editedWish);
      onUpdateWish(updatedWish);
      onEditFormClose();
      history.push('/wishes/');
    } catch (err) {
      console.log("Error updating wish:", err);
      console.log(err.response);
    }
  };

  return (
    <Form onSubmit={handleSubmit} encType="multipart/form-data">
      {Object.keys(validationErrors).length > 0 && (
        <Alert variant="danger">
          Please fill in all required fields before submitting the form.
        </Alert>
      )}
      <Form.Group controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={editedWish.title}
          onChange={handleChange}
          isInvalid={!!validationErrors.title}
        />
        <Form.Control.Feedback type="invalid">
          {validationErrors.title}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          name="description"
          value={editedWish.description}
          onChange={handleChange}
          isInvalid={!!validationErrors.description}
        />
        <Form.Control.Feedback type="invalid">
          {validationErrors.description}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="price">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          name="price"
          value={editedWish.price}
          onChange={handleChange}
          isInvalid={!!validationErrors.price}
        />
        <Form.Control.Feedback type="invalid">
          {validationErrors.price}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="purchase_link">
        <Form.Label>Purchase Link</Form.Label>
        <Form.Control
          type="url"
          name="purchase_link"
          value={editedWish.purchase_link}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="is_fulfilled">
        <Form.Check
          type="checkbox"
          name="is_fulfilled"
          checked={editedWish.is_fulfilled}
          onChange={handleChange}
          label="Fulfilled"
        />
      </Form.Group>
      <div className="text-center" style={{ marginBottom: '20px' }}>
        <Button
          variant="secondary"
          onClick={onEditFormClose}
          style={{ marginRight: "10px" }}
        >
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          Save
        </Button>
      </div>
    </Form>
  );
}

export default WishEditForm;

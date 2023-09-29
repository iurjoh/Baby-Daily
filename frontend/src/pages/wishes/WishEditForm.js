import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { axiosRes } from "../../api/axiosDefaults"; // Update the import
import { useHistory } from "react-router-dom";

function WishEditForm({ wish, onEditFormClose, onUpdateWish }) { // Update the component name and prop names
  const [editedWish, setEditedWish] = useState(wish);
  const history = useHistory();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setEditedWish((prevWish) => ({
      ...prevWish,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const updatedWish = await axiosRes.put(`/wishes/${editedWish.id}/`, editedWish); // Update the API endpoint

      // Update the wish in the parent component
      onUpdateWish(updatedWish);

      // Close the form
      onEditFormClose();

      // Redirect to the wish page
      history.push('/wishes/');
    } catch (err) {
      console.log("Error updating wish:", err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={editedWish.title}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          name="description"
          value={editedWish.description}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="price">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          name="price"
          value={editedWish.price}
          onChange={handleChange}
        />
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
      <Form.Group controlId="image">
        <Form.Label>Image</Form.Label>
        {typeof editedWish.image === "string" ? (
            <img src={editedWish.image} alt="Wish" />
        ) : (
        <Form.Control
            type="file"
            name="image"
            onChange={handleChange}
        />
  )}
</Form.Group>

      <Form.Group controlId="image">
        <Form.Label>Image</Form.Label>
        <Form.Control
          type="text"
          name="image"
          value={editedWish.image}
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
      <div className="text-center">
        <Button variant="secondary" onClick={onEditFormClose}>
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

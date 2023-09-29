import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { axiosRes } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom";

function WishEditForm({ wish, onEditFormClose, onUpdateWish }) {
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
    console.log(Form.value)

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

import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";

const Wish = ({ wish }) => {
  const history = useHistory();
  const [isEditing, setIsEditing] = useState(false);
  const [editedWish, setEditedWish] = useState({ ...wish });

  const handleGoBack = () => {
    history.goBack();
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedWish({
      ...editedWish,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      await axiosRes.put(`/wishes/${wish.id}/`, editedWish);
      history.push('/wishes/');

      setIsEditing(false);
    } catch (error) {
      console.error("Error updating wish:", error);
    }
  };

  return (
    <div>
      <Card className="mb-4">
        <Card.Body>
          {isEditing ? (
            <>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={editedWish.title}
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
              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={editedWish.description}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="purchase_link">
                <Form.Label>Purchase Link</Form.Label>
                <Form.Control
                  type="text"
                  name="purchase_link"
                  value={editedWish.purchase_link}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button onClick={handleSave}>Save</Button>
            </>
          ) : (
            <>
              <Card.Title>{wish.title}</Card.Title>
              <Card.Text>{wish.price}</Card.Text>
              <Card.Text>{wish.description}</Card.Text>
              <Card.Text>
                <a href={wish.purchase_link} target="_blank" rel="noopener noreferrer">
                  Buy Now!
                </a>
              </Card.Text>
              {typeof wish.image === "string" && (
                <Card.Img src={wish.image} alt="Wish" />
              )}
              {typeof wish.image !== "string" && (
                <Card.Text>Upload product image here</Card.Text>
              )}
              <Button onClick={handleEdit}>Edit</Button>
            </>
          )}
        </Card.Body>
      </Card>
      <Button onClick={handleGoBack}>Back</Button>
    </div>
  );
};

export default Wish;

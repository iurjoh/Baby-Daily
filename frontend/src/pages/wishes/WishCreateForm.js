import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import btnStyles from "../../styles/Button.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom";
import wishStyles from "../../styles/WishPage.module.css";


function WishCreateForm({ onWishCreated }) {
  const [wishData, setWishData] = useState({
    title: "",
    price: 0,
    description: "",
    purchaseLink: "",
    isFulfilled: false,
  });

  const [validationErrors, setValidationErrors] = useState({});
  const { title, price, description, purchaseLink, isFulfilled } = wishData;
  const history = useHistory();

  const handleChange = (event) => {
    setWishData({
      ...wishData,
      [event.target.name]: event.target.value,
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!title.trim()) {
      errors.title = "Title cannot be empty";
    }
    if (!description.trim()) {
      errors.description = "Description cannot be empty";
    }
    if (isNaN(price) || price <= 0) {
      errors.price = "Price must be a positive number";
    } else if (!/^\d+(\.\d{1,2})?$/.test(price.toString())) {
      errors.price = "Price can have up to 2 decimal places";
    }
    if (!purchaseLink.trim()) {
      errors.purchaseLink = "Purchase Link cannot be empty";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("purchase_link", purchaseLink);
    formData.append("is_fulfilled", isFulfilled);

    try {
      await axiosReq.post("/wishes/", formData);
      history.push("/wishes/");
    } catch (err) {
      console.log(err);
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
          value={title}
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
          as="textarea"
          rows={3}
          name="description"
          value={description}
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
          type="text"
          name="price"
          value={price}
          onChange={handleChange}
          isInvalid={!!validationErrors.price}
        />
        <Form.Control.Feedback type="invalid">
          {validationErrors.price}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="purchaseLink">
        <Form.Label>Purchase Link</Form.Label>
        <Form.Control
          type="text"
          name="purchaseLink"
          value={purchaseLink}
          onChange={handleChange}
          isInvalid={!!validationErrors.purchaseLink}
        />
        <Form.Control.Feedback type="invalid">
          {validationErrors.purchaseLink}
        </Form.Control.Feedback>
      </Form.Group>
      <div className={`${wishStyles.Header} text-center mt-5`} style={{ marginBottom: '20px' }}>
        <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        variant="primary"
        size="lg"
        style={{ marginRight: "10px" }}
        onClick={() => history.goBack()}
      >
        Cancel
      </Button>
      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        variant="primary"
        size="lg"
        type="submit"
      >
        Create
      </Button>
      </div>
    </Form>
  );
}

export default WishCreateForm;

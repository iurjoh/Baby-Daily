import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import btnStyles from "../../styles/Button.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom";


function WishCreateForm({ onWishCreated }) {
  const [wishData, setWishData] = useState({
    title: "",
    price: 0,
    description: "",
    purchaseLink: "",
    isFulfilled: false,
  });

  const { title, price, description, purchaseLink, isFulfilled } = wishData;
  const history = useHistory();

  const handleChange = (event) => {
    setWishData({
      ...wishData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("purchase_link", purchaseLink);
    formData.append("is_fulfilled", isFulfilled);

    try {
      const { data } = await axiosReq.post("/wishes/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      history.push(`/wishes/${data.id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit} encType="multipart/form-data">
      <Form.Group controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="description"
          value={description}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="price">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="text"
          name="price"
          value={price}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="purchaseLink">
        <Form.Label>Purchase Link</Form.Label>
        <Form.Control
          type="text"
          name="purchaseLink"
          value={purchaseLink}
          onChange={handleChange}
        />
      </Form.Group>

      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => history.goBack()}
      >
        Cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        Create
      </Button>
    </Form>
  );
}

export default WishCreateForm;

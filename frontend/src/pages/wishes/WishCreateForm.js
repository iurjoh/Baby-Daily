import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import btnStyles from "../../styles/Button.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom";
import defaultImage from "../../assets/product.png"; // Import the default image

function WishCreateForm({ onWishCreated }) {
  const [wishData, setWishData] = useState({
    title: "",
    price: 0,
    description: "",
    purchaseLink: "",
    image: null,
    isFulfilled: false,
  });

  const { title, price, description, purchaseLink, image, isFulfilled } = wishData;
  const history = useHistory();

  const handleChange = (event) => {
    setWishData({
      ...wishData,
      [event.target.name]: event.target.value,
    });
  };

  const handleImageChange = (event) => {
    setWishData({
      ...wishData,
      image: event.target.files[0],
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("purchase_link", purchaseLink);
    formData.append("image", image);
    formData.append("is_fulfilled", isFulfilled);

    try {
      const { data } = await axiosReq.post("/wishes/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      history.push("/wishes");
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

      <Form.Group controlId="image">
        <label htmlFor="image" className="custom-file-upload">
          Upload product image here
        </label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
        <img
          src={image ? URL.createObjectURL(image) : defaultImage}
          alt="Default"
          width={100}
          height={100}
          style={{ width: "100px", height: "100px" }}
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

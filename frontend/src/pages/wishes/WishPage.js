import React, { useEffect, useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom";

import WishItem from "./WishItem";
import wishStyles from "../../styles/WishPage.module.css";

function WishPage() {
  const [wishes, setWishes] = useState([]);
  const [showFulfilledWishes, setShowFulfilledWishes] = useState(false);
  const [editingWish, setEditingWish] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchWishes = async () => {
      try {
        const response = await axiosReq.get(`/wishes/?search=${searchQuery}`);
        const wishesData = response.data.results;
        setWishes(wishesData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchWishes();
  }, [searchQuery]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFulfillWish = async (wishId) => {
    try {
      await axiosReq.put(`/wishes/${wishId}/`, { is_fulfilled: true });
      setWishes((prevWishes) =>
        prevWishes.map((wish) =>
          wish.id === wishId ? { ...wish, is_fulfilled: true } : wish
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnfulfillWish = async (wishId) => {
    try {
      await axiosReq.put(`/wishes/${wishId}/`, { is_fulfilled: false });
      setWishes((prevWishes) =>
        prevWishes.map((wish) =>
          wish.id === wishId ? { ...wish, is_fulfilled: false } : wish
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteWish = async (wishId) => {
    try {
      await axiosReq.delete(`/wishes/${wishId}/`);
      setWishes((prevWishes) =>
        prevWishes.filter((wish) => wish.id !== wishId)
      );
    } catch (err) {
      console.error("Error deleting wish:", err);
    }
  };

  const handleEditWish = (wish) => {
    setEditingWish(wish);
  };

  const history = useHistory();

  const handleCreateWish = () => {
    history.push("/wishes/create");
  };

  return (
    <Container>
      <div className={`${wishStyles.Header} text-center mt-5`}>
        <Button
          className="mb-3"
          onClick={handleCreateWish}
          variant="primary"
          size="lg"
        >
          Create Wish
        </Button>
        <Form>
          <Form.Group controlId="searchQuery">
            <Form.Control
              type="text"
              placeholder="Search wishes..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </Form.Group>
        </Form>
      </div>
      <div className={`${wishStyles.WishListContainer}`}>
        {wishes.length === 0 ? (
          <p>No wishes at the moment</p>
        ) : (
        wishes
          .filter(
            (wish) =>
              !showFulfilledWishes || (wish.is_fulfilled && showFulfilledWishes)
          )
          .sort((a, b) => {
            const dateA = new Date(b.last_modified || b.created_at);
            const dateB = new Date(a.last_modified || a.created_at);
            return dateA - dateB;
          })
          .map((wish) => (
            <WishItem
              key={wish.id}
              wish={wish}
              onFulfillWish={handleFulfillWish}
              onUnfulfillWish={handleUnfulfillWish}
              onDeleteWish={handleDeleteWish}
              onEditWish={handleEditWish}
            />
          ))        
        )}
      </div>
    </Container>
  );
}

export default WishPage;

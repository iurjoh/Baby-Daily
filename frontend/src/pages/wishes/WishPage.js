import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom";

import WishItem from "./WishItem";
import wishStyles from "../../styles/WishPage.module.css";
import btnStyles from "../../styles/Button.module.css";

const WishPage = () => {
  const [wishes, setWishes] = useState([]);
  const [showFulfilledWishes, setShowFulfilledWishes] = useState(false);
  const [editingWish, setEditingWish] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const fetchWishes = async () => {
      try {
        const response = await axiosReq.get("/wishes/");
        const wishesData = response.data.results;
        setWishes(wishesData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchWishes();
  }, []);

  const handleFulfillWish = async (wishId) => {
    try {
      await axiosReq.put(`/wishes/${wishId}/`, { is_fulfilled: true });
      updateWishStatus(wishId, true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnfulfillWish = async (wishId) => {
    try {
      await axiosReq.put(`/wishes/${wishId}/`, { is_fulfilled: false });
      updateWishStatus(wishId, false);
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

  const handleCreateWish = () => {
    history.push("/wishes/create");
  };

  const updateWishStatus = (wishId, isFulfilled) => {
    setWishes((prevWishes) =>
      prevWishes.map((wish) =>
        wish.id === wishId ? { ...wish, is_fulfilled: isFulfilled } : wish
      )
    );
  };

  return (
    <Container>
      <div className={`${wishStyles.Header} text-center mt-5`}>
        <Button
          className={`${btnStyles.Button} ${btnStyles.Blue}`}
          onClick={handleCreateWish}
          variant="primary"
          size="lg"
          style={{ marginBottom: '20px' }}
        >
          Create Wish
        </Button>
      </div>
      <div className={`${wishStyles.WishListContainer}`}>
        {wishes.length === 0 ? (
          <p>No wishes at the moment</p>
        ) : (
          wishes
            .filter(
              (wish) =>
                !showFulfilledWishes ||
                (wish.is_fulfilled && showFulfilledWishes)
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
                onUpdateWishStatus={updateWishStatus}
              />
            ))
        )}
      </div>
    </Container>
  );
};

export default WishPage;

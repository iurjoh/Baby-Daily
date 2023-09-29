import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { MoreDropdown } from "../../components/MoreDropdown";
import WishEditForm from "./WishEditForm";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

const WishItem = ({
  wish,
  onFulfillWish,
  onUnfulfillWish,
  onDeleteWish,
  onEditWish,
}) => {
  const [showFullWish, setShowFullWish] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editedWish, setEditedWish] = useState({ ...wish });
  const [isFulfilled, setIsFulfilled] = useState(wish.is_fulfilled);

  const handleTitleClick = () => {
    setShowFullWish(!showFullWish);
  };

  const handleEdit = () => {
    setShowEditForm(true);
    onEditWish(wish);
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    onDeleteWish(wish.id);
    setShowDeleteModal(false);
  };

  const handleUpdateWish = (updatedWish) => {
    setEditedWish(updatedWish.data);
    setShowEditForm(false);
  };

  const handleToggleFulfill = () => {
    if (isFulfilled) {
      onUnfulfillWish(wish.id);
    } else {
      onFulfillWish(wish.id);
    }
    setIsFulfilled(!isFulfilled);
  };

  return (
    <div>
      <Card className="mb-4" style={{ height: "auto" }}>
        <Card.Body onClick={handleTitleClick}>
          <Card.Title>{editedWish.title}</Card.Title>
          {!showFullWish ? null : (
            <Card.Body onClick={handleTitleClick}>
              <Card.Title>{editedWish.title}</Card.Title>
              {!showFullWish ? null : (
                <>
                  <Card.Text>Title: {editedWish.title}</Card.Text>
                  <Card.Text>Price: {editedWish.price}</Card.Text>
                  <Card.Text>Description: {editedWish.description}</Card.Text>
                  <Card.Text>
                    <a
                      href={editedWish.purchase_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Buy Here
                    </a>
                  </Card.Text>
                  <Card.Text>
                    <img
                      src={editedWish.image}
                      alt={editedWish.title}
                      style={{ maxWidth: "100%" }}
                    />
                  </Card.Text>
                  <Card.Text>
                    <Button
                      variant={isFulfilled ? "success" : "primary"}
                      onClick={handleToggleFulfill}
                    >
                      {isFulfilled ? "Wish Granted" : "Grant this Wish!"}
                    </Button>
                  </Card.Text>
                </>
              )}
            </Card.Body>
          )}
        </Card.Body>
        <MoreDropdown
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          showEdit={!showEditForm && showFullWish}
          showDelete={!showEditForm && showFullWish}
        />
      </Card>
      {showEditForm && (
        <WishEditForm
          wish={editedWish}
          onEditFormClose={() => setShowEditForm(false)}
          onUpdateWish={handleUpdateWish}
        />
      )}
      <DeleteConfirmationModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={confirmDelete}
      />
    </div>
  );
};

export default WishItem;

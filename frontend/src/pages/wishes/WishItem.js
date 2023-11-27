import React, { useState } from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { MoreDropdown } from "../../components/MoreDropdown";
import WishEditForm from "./WishEditForm";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

const WishItem = ({
  wish,
  onFulfillWish,
  onUnfulfillWish,
  onDeleteWish,
  onEditWish,
  onUpdateWishStatus, // New prop to update wish status
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
    setIsFulfilled(updatedWish.data.is_fulfilled); // Update isFulfilled state
    setShowEditForm(false);
    onUpdateWishStatus(updatedWish.data.id, updatedWish.data.is_fulfilled); // Notify parent component
  };

  const handleToggleFulfill = () => {
    if (isFulfilled) {
      onUnfulfillWish(wish.id);
    } else {
      onFulfillWish(wish.id);
    }
    setIsFulfilled(!isFulfilled);
    updateBadge(!isFulfilled);
  };

  const updateBadge = (isFulfilled) => {
    // Update the badge variant
    const newBadgeVariant = isFulfilled ? "success" : "primary";
    onUpdateWishStatus(wish.id, isFulfilled); // Notify parent component
  };

  return (
    <div>
      <Card className="mb-4" style={{ height: "auto" }}>
        <Card.Body onClick={handleTitleClick}>
          <Card.Title>
            {editedWish.title}
            <Badge
              variant={isFulfilled ? "success" : "primary"}
              className="ml-2"
            >
              {isFulfilled ? "Fulfilled" : "Not Fulfilled"}
            </Badge>
          </Card.Title>
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

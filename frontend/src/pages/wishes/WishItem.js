import React, { useState } from "react";
import { Card, Button, Badge, Alert } from "react-bootstrap";
import { MoreDropdown } from "../../components/MoreDropdown";
import WishEditForm from "./WishEditForm";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const WishItem = ({
  wish,
  onFulfillWish,
  onUnfulfillWish,
  onDeleteWish,
  onEditWish,
  onUpdateWishStatus,
}) => {
  const [showFullWish, setShowFullWish] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editedWish, setEditedWish] = useState({ ...wish });
  const [isFulfilled, setIsFulfilled] = useState(wish.is_fulfilled);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const currentUser = useCurrentUser();
  const isOwner = currentUser?.username === editedWish.owner;

  const handleTitleClick = () => {
    setShowFullWish(!showFullWish);
  };

  const handleEdit = () => {
    setShowEditForm(true);
    onEditWish(wish);
  };

  const handleDelete = () => {
    if (isOwner) {
      setShowDeleteModal(true);
    } else {
      setShowDeleteAlert(true);
    }
  };

  const confirmDelete = () => {
    onDeleteWish(wish.id);
    setShowDeleteModal(false);
  };

  const handleUpdateWish = (updatedWish) => {
    setEditedWish(updatedWish.data);
    setIsFulfilled(updatedWish.data.is_fulfilled);
    setShowEditForm(false);
    onUpdateWishStatus(updatedWish.data.id, updatedWish.data.is_fulfilled);
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
    onUpdateWishStatus(wish.id, isFulfilled);
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
        {isOwner ? (
          <MoreDropdown
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            showEdit={!showEditForm && showFullWish}
            showDelete={!showEditForm && showFullWish}
          />
        ) : null}
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
      {showDeleteAlert && (
        <Alert variant="danger" onClose={() => setShowDeleteAlert(false)} dismissible>
          You do not have permission to delete this wish.
        </Alert>
      )}
    </div>
  );
};

export default WishItem;

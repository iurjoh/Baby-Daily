import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { MoreDropdown } from "../../components/MoreDropdown";
import WishEditForm from "./WishEditForm"; // Import the wish edit form component
import DeleteConfirmationModal from "./DeleteConfirmationModal"; // Import the delete confirmation modal

const WishItem = ({ wish, onFulfillWish, onUnfulfillWish, onDeleteWish, onEditWish }) => {
  const [showFullWish, setShowFullWish] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editedWish, setEditedWish] = useState({ ...wish });

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
    setEditedWish(updatedWish);
    setShowEditForm(false);
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
                  <Card.Text>Purchase Link: {editedWish.purchase_link}</Card.Text>
                  {/* Add more wish details here */}
                  <Card.Text>
                    Fulfilled: {editedWish.is_fulfilled ? "Yes" : "No"}
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

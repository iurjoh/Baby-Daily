import React, { useState } from "react";
import { Card, Alert } from "react-bootstrap";
import { MoreDropdown } from "../../components/MoreDropdown";
import TaskEditForm from "./TaskEditForm";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const TaskItem = ({ task, onMarkAsDone, onMarkAsNotDone, onDeleteTask, onEditTask }) => {
  const [showFullTask, setShowFullTask] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const currentUser = useCurrentUser();
  const isOwner = currentUser?.username === editedTask.owner;
  const isAdmin = currentUser?.isAdmin;

  const handleTitleClick = () => {
    setShowFullTask(!showFullTask);
  };

  const handleEdit = () => {
    setShowEditForm(true);
    onEditTask(task);
  };

  const handleDelete = () => {
    if (isOwner || isAdmin) {
      setShowDeleteModal(true);
    } else {
      setShowDeleteAlert(true);
    }
  };

  const confirmDelete = () => {
    onDeleteTask(task.id);
    setShowDeleteModal(false);
  };

  const handleUpdateTask = (updatedTask) => {
    setEditedTask(updatedTask.data);
    setShowEditForm(false);
  };

  return (
    <div>
      <Card className="mb-4" style={{ height: "auto" }}>
        <Card.Body onClick={handleTitleClick}>
          {!showFullTask ? (
            <Card.Title>{editedTask.title}</Card.Title>
          ) : (
            <>
              <Card.Title>{editedTask.title}</Card.Title>
              <Card.Text>Title: {editedTask.title}</Card.Text>
              <Card.Text>Description: {editedTask.description}</Card.Text>
              <Card.Text>Date: {editedTask.date}</Card.Text>
              <Card.Text>Priority: {editedTask.priority}</Card.Text>
              <Card.Text>Is Done: {editedTask.is_done ? "Yes" : "No"}</Card.Text>
            </>
          )}
        </Card.Body>
        {isOwner || isAdmin ? (
          <MoreDropdown
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            showEdit={!showEditForm && showFullTask}
            showDelete={!showEditForm && showFullTask}
          />
        ) : null}
      </Card>
      {showEditForm && (
        <TaskEditForm
          task={editedTask}
          onEditFormClose={() => setShowEditForm(false)}
          onUpdateTask={handleUpdateTask}
        />
      )}
      <DeleteConfirmationModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={confirmDelete}
      />
      {showDeleteAlert && (
        <Alert variant="danger" onClose={() => setShowDeleteAlert(false)} dismissible>
          You do not have permission to delete this task.
        </Alert>
      )}
    </div>
  );
};

export default TaskItem;

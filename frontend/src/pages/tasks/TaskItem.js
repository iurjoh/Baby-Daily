import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { MoreDropdown } from "../../components/MoreDropdown";
import TaskEditForm from "./TaskEditForm";
import DeleteConfirmationModal from "./DeleteConfirmationModal"; // Import the modal

const TaskItem = ({ task, onMarkAsDone, onMarkAsNotDone, onDeleteTask, onEditTask }) => {
  const [showFullTask, setShowFullTask] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for the delete confirmation modal
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleTitleClick = () => {
    setShowFullTask(!showFullTask);
  };

  const handleEdit = () => {
    setShowEditForm(true);
    onEditTask(task);
  };

  const handleDelete = () => {
    setShowDeleteModal(true); // Show the delete confirmation modal
  };

  const confirmDelete = () => {
    onDeleteTask(task.id); // Call onDeleteTask when confirmed
    setShowDeleteModal(false); // Close the modal
  };

  const handleUpdateTask = (updatedTask) => {
    setEditedTask(updatedTask.data);
    setShowEditForm(false);
  };

  return (
    <div>
      <Card className="mb-4" style={{ height: "auto" }}>
        <Card.Body onClick={handleTitleClick}>
          <Card.Title>{editedTask.title}</Card.Title>
          {!showFullTask ? null : (
            <Card.Body onClick={handleTitleClick}>
              <Card.Title>{editedTask.title}</Card.Title>
              {!showFullTask ? null : (
                <>
                  <Card.Text>Title: {editedTask.title}</Card.Text>
                  <Card.Text>Description: {editedTask.description}</Card.Text>
                  <Card.Text>Date: {editedTask.date}</Card.Text>
                  <Card.Text>Priority: {editedTask.priority}</Card.Text>
                  <Card.Text>Is Done: {editedTask.is_done ? "Yes" : "No"}</Card.Text>
                </>
              )}
            </Card.Body>
          )}
        </Card.Body>
        <MoreDropdown
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          showEdit={!showEditForm && showFullTask}
          showDelete={!showEditForm && showFullTask}
        />
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
    </div>
  );
};

export default TaskItem;

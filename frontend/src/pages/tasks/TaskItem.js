import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { MoreDropdown } from "../../components/MoreDropdown";
import TaskEditForm from "./TaskEditForm";

const TaskItem = ({ task, onMarkAsDone, onMarkAsNotDone, onDelete }) => {
  const [showFullTask, setShowFullTask] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editedTask, setEditedTask] = useState(task); // Store the edited task

  const handleTitleClick = () => {
    setShowFullTask(!showFullTask);
  };

  const handleEdit = () => {
    setShowEditForm(true);
  };

  const handleDelete = () => {
    onDelete(task.id);
  };

  const handleUpdateTask = (updatedTask) => {
    // Update the edited task and close the form
    setEditedTask(updatedTask);
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
    </div>
  );
};

export default TaskItem;

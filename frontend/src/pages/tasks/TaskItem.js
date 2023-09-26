import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { MoreDropdown } from "../../components/MoreDropdown";
import TaskEditForm from "./TaskEditForm";

const TaskItem = ({ task, onMarkAsDone, onMarkAsNotDone, onDelete }) => {
  const [showFullTask, setShowFullTask] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const handleTitleClick = () => {
    setShowFullTask(!showFullTask);
  };

  const handleEdit = () => {
    setShowEditForm(true);
  };

  const handleDelete = () => {
    onDelete(task.id);
  };

  return (
    <div>
      <Card className="mb-4" style={{ height: "auto" }}>
        <Card.Body onClick={handleTitleClick}>
          <Card.Title>{task.title}</Card.Title>
          {!showFullTask ? null : (
            <>
              <Card.Text>Description: {task.description}</Card.Text>
              <Card.Text>Date: {task.date}</Card.Text>
              <Card.Text>Priority: {task.priority}</Card.Text>
              <Card.Text>Is Done: {task.is_done ? "Yes" : "No"}</Card.Text>
            </>
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
          task={task} // Pass the task data to TaskEditForm
          onEditFormClose={() => setShowEditForm(false)} // Add a callback to close the edit form
        />
      )}
    </div>
  );
};

export default TaskItem;

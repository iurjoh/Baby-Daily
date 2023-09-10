import React from "react";
import { Card } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { MoreDropdown } from "../../components/MoreDropdown";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const Task = (props) => {
  const {
    id,
    owner,
    title,
    description,
    dueDate,
    isCompleted,
    setTasks,
  } = props;

  const currentUser = useCurrentUser();
  const isOwner = currentUser?.username === owner;
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/tasks/${id}/edit`);
  };

  const handleDelete = async () => {
    // Implement the delete logic here
  };

  const handleComplete = async () => {
    // Implement the complete/uncomplete logic here
  };

  return (
    <Card>
      <Card.Body>
        <div>
          <h5>{title}</h5>
          <p>{description}</p>
          <p>Due Date: {dueDate}</p>
          <p>Status: {isCompleted ? "Completed" : "Pending"}</p>
        </div>
        <div>
          <Link to={`/tasks/${id}`}>Details</Link>
          {isOwner && (
            <MoreDropdown
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          )}
          {isCompleted ? (
            <button onClick={handleComplete}>Mark as Incomplete</button>
          ) : (
            <button onClick={handleComplete}>Mark as Completed</button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Task;

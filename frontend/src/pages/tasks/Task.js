import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { MoreDropdown } from "../../components/MoreDropdown";
import { axiosRes } from "../../api/axiosDefaults";
import TaskEditForm from "./TaskEditForm";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import taskStyle from "../../styles/TaskPage.module.css";

const Task = (props) => {
  const { id, title, owner, setTasks } = props;

  const [showEditForm, setShowEditForm] = useState(false);

  const currentUser = useCurrentUser();
  const isOwner = currentUser?.username === owner;

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/tasks/${id}/`);
      setTasks((prevTasks) => ({
        ...prevTasks,
        results: prevTasks.results.filter((task) => task.id !== id),
      }));
    } catch (err) {
      // Handle error
    }
  };

  const handleEdit = () => {
    setShowEditForm(true);
  };

  return (
    <Card className={`${taskStyle.Todo} mb-4`}>
      <Card.Body>
        {showEditForm ? (
          <TaskEditForm
            id={id}
            title={title}
            setTasks={setTasks}
            setShowEditForm={setShowEditForm}
          />
        ) : (
          <Card.Title className="d-flex pt-2 m-0 text-right">
            {title}{" "}
            {isOwner && (
              <MoreDropdown handleEdit={handleEdit} handleDelete={handleDelete} />
            )}
          </Card.Title>
        )}
      </Card.Body>
    </Card>
  );
};

export default Task;

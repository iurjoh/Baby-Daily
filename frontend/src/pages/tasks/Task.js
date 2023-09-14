import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { MoreDropdown } from "../../components/MoreDropdown";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";
import taskStyle from "../../styles/TaskPage.module.css";
import TaskEditForm from "./TaskEditForm";

const Task = (props) => {
  const { id, title, owner, setTasks } = props;

  const [showEditForm, setShowEditForm] = useState(false);

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/tasks/${id}/`);
      setTasks((prevTasks) => ({
        ...prevTasks,
        results: prevTasks.results.filter((task) => task.id !== id),
      }));
    } catch (err) {
      // console.log(err);
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
            {is_owner && (
              <MoreDropdown handleEdit={handleEdit} handleDelete={handleDelete} />
            )}
          </Card.Title>
        )}
      </Card.Body>
    </Card>
  );
};

export default Task;

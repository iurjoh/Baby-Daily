import React, { useState } from "react";
import styles from "../../styles/Task.module.css";
import { Card } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { MoreDropdown } from "../../components/MoreDropdown";
import TaskEditForm from "./TaskEditForm";

const Task = (props) => {
  const {
    id,
    owner,
    title,
    content,
    updated_at,
    setTasks,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const [showEditForm, setShowEditForm] = useState(false);

  const handleEdit = () => {
    setShowEditForm(true);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/tasks/${id}/`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <Card className={styles.Task}>
      <Card.Body>
        <div className="d-flex align-items-center justify-content-between">
          <Link to={`/profiles/${owner.profile_id}`}>
            {owner.username}
          </Link>
          <div className="d-flex align-items-center">
            <span>{updated_at}</span>
            {is_owner && (
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </div>
      </Card.Body>
      <Card.Body>
        {showEditForm ? (
          <TaskEditForm
            id={id}
            title={title}
            content={content}
            setTasks={setTasks}
            setShowEditForm={setShowEditForm}
          />
        ) : (
          <>
            {title && <Card.Title className="text-center">{title}</Card.Title>}
            {content && <Card.Text>{content}</Card.Text>}
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default Task;

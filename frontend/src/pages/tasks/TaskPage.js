import React, { useEffect, useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom";

import TaskItem from "./TaskItem";
import taskStyles from "../../styles/TaskPage.module.css";
import btnStyles from "../../styles/Button.module.css";

function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [showCompletedTasks, setShowCompletedTasks] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axiosReq.get("/tasks/");
        const tasksData = response.data.results;
        const sortedTasks = tasksData.sort(
          (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
        );
        setTasks(sortedTasks);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTasks();
  }, []);

  const handleMarkAsDone = async (taskId) => {
    try {
      await axiosReq.put(`/tasks/${taskId}/`, { is_done: true });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, is_done: true } : task
        )
      );
    } catch (err) {
      console.log(err);
      console.log(err.response.data);
    }
  };

  const handleMarkAsNotDone = async (taskId) => {
    try {
      await axiosReq.put(`/tasks/${taskId}/`, { is_done: false });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, is_done: false } : task
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axiosReq.delete(`/tasks/${taskId}/`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const history = useHistory();

  const handleCreateTask = () => {
    history.push("/tasks/create");
  };

  return (
    <Container>
      <div className={`${taskStyles.Header} text-center mt-5`}>
        <Button
          className={`${btnStyles.Button} ${btnStyles.Blue}`}
          onClick={handleCreateTask}
          variant="primary"
          size="lg"
          style={{ marginBottom: '20px' }}
        >
          Create Task
        </Button>
      </div>
      <div className={`${taskStyles.TaskListContainer}`}>
        {tasks.length === 0 ? (
          <p>No tasks at the moment</p>
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onMarkAsDone={handleMarkAsDone}
              onMarkAsNotDone={handleMarkAsNotDone}
              onDeleteTask={handleDeleteTask}
              onEditTask={handleEditTask}
            />
          ))
        )}
      </div>
    </Container>
  );
}

export default TaskPage;

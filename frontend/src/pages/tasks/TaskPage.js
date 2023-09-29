import React, { useEffect, useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom";

import TaskItem from "./TaskItem";
import taskStyles from "../../styles/TaskPage.module.css";

function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [showCompletedTasks, setShowCompletedTasks] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axiosReq.get(`/tasks/?search=${searchQuery}`);
        console.log(response, "Tasks")
        const tasksData = response.data.results;
        setTasks(tasksData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTasks();
  }, [searchQuery]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

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
      console.log(err.response.data)
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
    console.log(task, "Hi")
  };

  const history = useHistory();

  const handleCreateTask = async () => {
    history.push("/tasks/create");
  };

  return (
    <Container>
      <div className={`${taskStyles.Header} text-center mt-5`}>
        <Button
          className="mb-3"
          onClick={handleCreateTask}
          variant="primary"
          size="lg"
        >
          Create Task
        </Button>
        <Form>
          <Form.Group controlId="searchQuery">
            <Form.Control
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </Form.Group>
        </Form>
      </div>
      <div className={`${taskStyles.TaskListContainer}`}>
        {tasks.length === 0 ? (
          <p>No tasks at the moment</p>
        ) : (
          tasks
            .filter(
              (task) =>
                !showCompletedTasks || (task.is_done && showCompletedTasks)
            )
            .sort((a, b) => {
              // Sort tasks by last create/edit time
              return new Date(b.updated_at) - new Date(a.updated_at);
            })
            .map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onMarkAsDone={handleMarkAsDone}
              onMarkAsNotDone={handleMarkAsNotDone}
              onDeleteTask={handleDeleteTask}
              onEditTask={handleEditTask} // Pass the function to edit a task
            />
            ))
        )}
      </div>
    </Container>
  );
}

export default TaskPage;

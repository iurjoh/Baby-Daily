import React, { useEffect, useState } from "react";
import { Col, Row, Container, Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import TaskCreateForm from "./TaskCreateForm";
import TaskItem from "./TaskItem";
import taskStyles from "../../styles/TaskPage.module.css";
import appStyles from "../../App.module.css";

function TaskPage() {
  const history = useHistory();

  const [tasks, setTasks] = useState([]);
  const [showCompletedTasks, setShowCompletedTasks] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const fetchTasks = async () => {
    try {
      const response = await axiosReq.get(`/tasks/?search=${searchQuery}`);
      const tasksData = response.data.results;
      console.log(tasksData); // Add this line for debugging
      setTasks(tasksData);
    } catch (err) {
      console.log(err);
    }
  };
  

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axiosReq.get(`/tasks/?search=${searchQuery}`);
        const tasksData = response.data.results;
        setTasks(tasksData);
      } catch (err) {
        // Handle error
      }
    };

    fetchTasks();
  }, [searchQuery]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleMarkAsDone = (taskId) => {
    // Update the task status to "done" locally
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, is_done: true } : task
      )
    );
  };

  const handleMarkAsNotDone = (taskId) => {
    // Update the task status to "not done" locally
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, is_done: false } : task
      )
    );
  };

  const handleCreateTask = (newTask) => {
    // Add the newly created task to the list of tasks locally
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <Container>
      <Row>
        <Col className="py-3 p-lg-3" lg={12}>
          <h2 className={`${taskStyles.Header} text-center mt-5`}>Todo Task</h2>
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
          <div className={`${appStyles.Content} p-4`}>
            <TaskCreateForm setTasks={handleCreateTask} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <h2 className={`text-center mt-5`}>
            {showCompletedTasks ? "Completed Tasks" : "All Tasks"}
          </h2>
          <Button onClick={() => setShowCompletedTasks(!showCompletedTasks)}>
            {showCompletedTasks ? "Show All Tasks" : "Show Completed Tasks"}
          </Button>
          {tasks.map((task) =>
            !showCompletedTasks && task.is_done ? null : (
              <TaskItem
                key={task.id}
                task={task}
                onMarkAsDone={handleMarkAsDone}
                onMarkAsNotDone={handleMarkAsNotDone}
              />
            )
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default TaskPage;

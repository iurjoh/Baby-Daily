import React, { useEffect, useState } from "react";
import { Col, Row, Container, Button } from "react-bootstrap";
import appStyles from "../../App.module.css";
import taskStyles from "../../styles/TaskPage.module.css";
import { useParams, useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import TaskCreateForm from "./TaskCreateForm";
import TaskItem from "./TaskItem"; // Import TaskItem component

function TaskPage() {
  const { id } = useParams();
  const history = useHistory();

  const [tasks, setTasks] = useState([]);
  const [showCompletedTasks, setShowCompletedTasks] = useState(false);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axiosReq.get(`/tasks/`);
        const tasksData = response.data.results;
        console.log(tasks);
        setTasks(tasksData);
      } catch (err) {
        // Handle error
      }
    };

    fetchTasks();
  }, [id, title]);

  const handleMarkAsDone = async (taskId) => {
    // Handle marking a task as done
  };

  const handleMarkAsNotDone = async (taskId) => {
    // Handle marking a task as not done
  };

  const redirectToCreateTask = () => {
    history.push("/tasks/create");
  };

  return (
    <Container>
      <Row>
        <Col className="py-3 p-lg-3" lg={12}>
          <h2 className={`${taskStyles.Header} text-center mt-5`}>
            Todo Task
          </h2>
          <div className={`${appStyles.Content} p-4`}>
            <TaskCreateForm setTitle={setTitle} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Button onClick={redirectToCreateTask}>Create Task</Button>
          <h2 className={`text-center mt-5`}>
            {showCompletedTasks ? "Completed Tasks" : "All Tasks"}
          </h2>
          <Button onClick={() => setShowCompletedTasks(!showCompletedTasks)}>
            {showCompletedTasks ? "Show All Tasks" : "Show Completed Tasks"}
          </Button>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onMarkAsDone={handleMarkAsDone}
              onMarkAsNotDone={handleMarkAsNotDone}
            />
          ))}
        </Col>
      </Row>
    </Container>
  );
}

export default TaskPage;

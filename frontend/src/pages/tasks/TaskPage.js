import React, { useEffect, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import appStyles from "../../App.module.css";
import taskStyles from "../../styles/TaskPage.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import TaskCreateForm from "./TaskCreateForm";
import Task from "./Task";

function TaskPage() {
  const { id } = useParams();

  const currentUser = useCurrentUser();
  const [tasks, setTasks] = useState({ results: [] });
  const [title, setTitle] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axiosReq.get(`/tasks/`);
        const tasksData = response.data;
        setTasks(tasksData);
      } catch (err) {
        // console.log(err);
      }
    };

    fetchTasks();
  }, [id, title]);

  return (
    <Container>
      <Row>
        <Col className="py-3 p-lg-3" lg={12}>
          <h2 className={`${taskStyles.Header} text-center mt-5`}>
            Todo Task
          </h2>
          <div className={`${appStyles.Content} p-4`}>
            <TaskCreateForm setTasks={setTasks} setTitle={setTitle} />
          </div>
        </Col>
      </Row>
      <h2 className={`text-center mt-5`}>Tasks list</h2>
      {currentUser ? (
        <br />
      ) : tasks.results.length ? (
        "Tasks"
      ) : null}
      {tasks.results.length ? (
        <InfiniteScroll
          children={tasks.results.map((task) => (
            <Col key={task.id} lg={4} className={`${taskStyles.TodoCard}`}>
              <Task {...task} setTasks={setTasks} />
            </Col>
          ))}
          dataLength={tasks.results.length}
          loader={<Asset spinner />}
          hasMore={!!tasks.next}
          next={() => fetchMoreData(tasks, setTasks)}
        />
      ) : currentUser ? (
        <span>No tasks... yet</span>
      ) : (
        <Container>
          <Asset spinner />
        </Container>
      )}
    </Container>
  );
}

export default TaskPage;

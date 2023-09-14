import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import styles from "../../styles/TaskCreateEditForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useHistory, useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

function TaskEditForm() {
  const [errors, setErrors] = useState({});
  const [taskData, setTaskData] = useState({
    title: "",
    content: "",
  });

  const { title, content } = taskData;
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const { data } = await axiosReq.get(`/tasks/${id}/`);
        const { title, content } = data;
        setTaskData({ title, content });
      } catch (err) {
        // console.log(err);
      }
    };
    fetchTaskData();
  }, [id]);

  const handleChange = (event) => {
    setTaskData({
      ...taskData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axiosReq.put(`/tasks/${id}/`, taskData);
      history.push(`/tasks/${id}`);
    } catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Container className={styles.Container}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
          />
        </Form.Group>
        {errors?.title?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <Form.Group>
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={6}
            name="content"
            value={content}
            onChange={handleChange}
          />
        </Form.Group>
        {errors?.content?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <Button
          className={`${btnStyles.Button} ${btnStyles.Blue}`}
          onClick={() => history.goBack()}
        >
          Cancel
        </Button>
        <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
          Save
        </Button>
      </Container>
    </Form>
  );
}

export default TaskEditForm;

import React from "react";
import { Card, Button } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";

const TaskItem = ({ task, onMarkAsDone, onMarkAsNotDone }) => {
  const handleTaskCompletion = async (taskId) => {
    try {
      const updatedStatus = !task.completed;
      await axiosReq.put(`/tasks/${taskId}/`, { completed: updatedStatus });
      
      if (updatedStatus) {
        onMarkAsDone(taskId);
      } else {
        onMarkAsNotDone(taskId);
      }
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>{task.title}</Card.Title>
        <Card.Text>{task.description}</Card.Text>
        <Button
          variant={task.completed ? "success" : "secondary"}
          onClick={() => handleTaskCompletion(task.id)}
        >
          {task.completed ? "Mark as Not Done" : "Mark as Done"}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default TaskItem;

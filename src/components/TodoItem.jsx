import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";

const transform = keyframes`
  from {
    transform: translateY(-200px);
  }

  to {
    transform: translateY(0);
  }
`;

const fadeout = keyframes`
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(-1000px);
  }
`;

const TextChange = styled.li`
  color: ${(props) => props.isDone && "red"};
  text-decoration: ${(props) => props.isDone && "line-through"};
  animation: ${({ isDelete }) =>
    isDelete
      ? css`
          ${fadeout} 0.7s ease-in-out
        `
      : css`
          ${transform} 0.5s ease-in-out
        `};
`;

const TodoItem = ({ item, onDelete, changeStatus }) => {
  const isDone = item.status === "done";
  const [isDelete, setIsDelete] = useState(false);

  const handleDelete = () => {
    setIsDelete(true);
    onDelete();
  };

  return (
    <>
      <TextChange
        isDone={isDone}
        onClick={changeStatus}
        data-testid="todo"
        isDelete={isDelete}
      >
        <div className="wrapper-item">
          <span>{item.title}</span>
          <img
            src="remove.png"
            alt="remove"
            className="remove-icon"
            onClick={handleDelete}
            data-testid="deleteButton"
          />
        </div>
      </TextChange>
    </>
  );
};

export default TodoItem;

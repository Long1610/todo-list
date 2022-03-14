import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";

const transformY = keyframes`
  from {
    transform: translateY(-200px);
  }

  to {
    transform: translateY(0);
  }
`;

const transformX = keyframes`
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-1000px);
  }
`;

const TextChange = styled.li`
  color: ${(props) => props.isDone && "red"};
  text-decoration: ${(props) => props.isDone && "line-through"};
  animation: ${({ isDelete }) =>
    isDelete
      ? css`
          ${transformX} 0.5s ease-in-out
        `
      : css`
          ${transformY} 0.5s ease-in-out
        `};
`;

const TodoItem = ({ item, onDelete, changeStatus }) => {
  const isDone = item.status === "done";
  const [isDelete, setIsDelete] = useState(false);

  const handleDelete = () => {
    setIsDelete(true);
    setTimeout(onDelete, 500)
  };

  return (
    <>
      <TextChange
        isDone={isDone}
        data-testid="todo"
        isDelete={isDelete}
      >
        <div className="wrapper-item">
          <span onClick={changeStatus}>{item.title}</span>
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

import React from "react";
import styled from "styled-components";

const TextChange = styled.li`
  color: ${(props) => props.isDone && "red"};
  text-decoration: ${(props) => props.isDone && "line-through"};
`;

const TodoItem = ({ item, onDelete, changeStatus }) => {
  const isDone = item.status === "done";
  return (
    <>
      <TextChange
        isDone={isDone}
        onClick={changeStatus}
        className="wrapper-item"
      >
        <span>{item.title}</span>
        <img
          src="remove.png"
          alt="remove"
          className="remove-icon"
          onClick={onDelete}
        />
      </TextChange>
    </>
  );
};

export default TodoItem;

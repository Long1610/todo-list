import React from "react";
import TodoItem from "../components/TodoItem";
import styled from "styled-components";

const List = styled.ul`
  overflow-y: ${(props) => props.isMax && "auto"};
`;
const TodoList = ({ data, onDelete, changeStatus }) => {
  const isMax = data.length > 5;
  return (
    <List className="todo-list" isMax={isMax}>
      {data.map((x) => (
        <TodoItem
          key={x.id}
          item={x}
          onDelete={() => onDelete(x.id)}
          changeStatus={() => changeStatus(x.id)}
        />
      ))}
    </List>
  );
};

export default TodoList;

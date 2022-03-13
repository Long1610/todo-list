import "./App.css";
import { useContext, useState, useEffect } from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import Context from "./store/context";
import { addToDo, removeToDo, changeStatus, updateTodo } from "./store/actions";
import TodoList from "./containers/TodoList";
import { useDarkMode } from "./hooks/useDarkMode";

const lightTheme = {
  textColor: "#000",
  background: "linear-gradient(to right, #8360c3, #2ebf91)",
};

const darkTheme = {
  textColor: "#fff",
  background: "#000",
};

const Global = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.background};
    transition: all 200ms;
    color: ${({ theme }) => theme.textColor}
  }
`;

let todoID = 0;

const arrButton = [
  { title: "All", value: "" },
  { title: "Active", value: "active" },
  { title: "Done", value: "done" },
];

const Button = styled.button`
  background-color: ${(props) => props.isActive && "#61dafb"};
`;

function App() {
  const [state, dispatch] = useContext(Context);
  const [theme, toggleTheme] = useDarkMode();
  const [arr, setArr] = useState([]);
  const [status, setStatus] = useState("");

  const onDetele = (id) => {
    dispatch(removeToDo(id));
  };

  const onKeyUp = (e) => {
    if (e.key === "Enter") {
      dispatch(
        addToDo({ title: e.target.value, status: "active", id: ++todoID })
      );
    }
  };

  const onChangeStatus = (id) => {
    dispatch(changeStatus(id));
  };

  useEffect(() => {
    if (status === "") {
      setArr(state.todo);
    } else if (status === "active") {
      setArr(state.todo.filter((x) => x.status === "active"));
    } else if (status === "done") {
      setArr(state.todo.filter((x) => x.status === "done"));
    }
  }, [status, state.todo]);

  const toggleAll = () => {
    const newArr = arr.map((x) =>
      x.status === "done"
        ? { ...x, status: "active" }
        : { ...x, status: "done" }
    );
    setArr(newArr);
    const arrId = newArr.map((x) => x.id);
    const filterData = state.todo.filter((x) => !arrId.includes(x.id));
    const newData = [...newArr, ...filterData].sort((a, b) => a.id - b.id);
    dispatch(updateTodo(newData));
  };

  return (
    <div className="App">
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <Global />
        <div>
          <button className="button-theme" onClick={toggleTheme}>
            Toggle Theme
          </button>
        </div>
        <div className="wrapper-input">
          <input
            id="form"
            type="text"
            placeholder="Enter task"
            onKeyUp={onKeyUp}
            data-testid="input"
          />
        </div>
        <TodoList
          data={arr}
          onDelete={onDetele}
          changeStatus={onChangeStatus}
        />
        <div className="wrapper-button">
          <button className="button-theme btn-toggle-all" onClick={toggleAll}>
            Toggle All
          </button>
          <div className="filter">
            {arrButton.map((x, id) => (
              <Button
                className="button-theme btn-all"
                onClick={() => setStatus(x.value)}
                isActive={status === x.value}
                key={id}
              >
                {x.title}
              </Button>
            ))}
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;

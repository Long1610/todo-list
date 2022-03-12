import './App.css';
import { useContext, useState, useEffect } from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import Context from "./store/context";
import { addToDo, removeToDo, changeStatus, updateTodo } from "./store/actions";
import TodoList from './containers/TodoList';

const lightTheme = {
  textColor: "#000",
  background: "#fff"
};

const darkTheme = {
  textColor: "#fff",
  background: "#000"
};

const Global = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.background};
    transition: all 200ms;
    color: ${({ theme }) => theme.textColor}
  }
`;

let id = 0

function App() {
  const [state, dispatch] = useContext(Context);
  const [theme, setTheme] = useState("light");
  const [arr, setArr] = useState([]);
  const [status, setStatus] = useState("");
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  const onDetele = (id) => {
    dispatch(removeToDo(id))
  }

  const onKeyUp = (e) => {
    if (e.key === "Enter") {
      dispatch(addToDo({ title: e.target.value, status: "active", id: ++id }));
    }
  };

  const onChangeStatus = (id) => {
    dispatch(changeStatus(id));
  }

  useEffect(() => {
    if (status === "") {
      setArr(state.todo)
    } else if (status === "active") {
      setArr(state.todo.filter(x => x.status === "active"));
    } else if (status === "done") {
      setArr(state.todo.filter(x => x.status === "done"));
    }
  }, [status, state.todo])

  const toggleAll = () => {
    const newArr = arr.map(x => x.status === "done" ? { ...x, status: "active" } : { ...x, status: "done" })
    setArr(newArr)
    const arrId = newArr.map(x => x.id)
    const filterData = state.todo.filter(x => !arrId.includes(x.id))
    const newData = [...newArr, ...filterData].sort((a, b) => a.id - b.id)
    dispatch(updateTodo(newData));
  }

  return (
    <div className="App">
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <Global />
        <div><button className="button-theme" onClick={toggleTheme}>Toggle Theme</button></div>
        <div className="wrapper-input">
          <input id="form" type="text" placeholder="Enter task" onKeyUp={onKeyUp} />
        </div>
        <TodoList data={arr} onDelete={onDetele} changeStatus={onChangeStatus} />
        {state.todo && state.todo.length > 0 && <div className="wrapper-button">
          <button className="button-theme btn-toggle-all" onClick={toggleAll}>Toggle All</button>
          <div className="filter">
            <button className="button-theme btn-all" onClick={() => setStatus("")}>All</button>
            <button className="button-theme btn-all" onClick={() => setStatus("active")}>Active</button>
            <button className="button-theme btn-all" onClick={() => setStatus("done")}>Done</button>
          </div>
        </div>}
      </ThemeProvider>
    </div>
  );
}

export default App;

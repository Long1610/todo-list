const init = {
  todo: [],
  status: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_DO":
      return { ...state, todo: [...state.todo, action.payload] };
    case "REMOVE_TO_DO":
      return {
        ...state,
        todo: state.todo.filter((x) => x.id !== action.id),
      };
    case "CHANGE_STATUS":
      return {
        ...state,
        todo: state.todo.map((x) =>
          x.id === action.id
            ? x.status === "active"
              ? { ...x, status: "done" }
              : { ...x, status: "active" }
            : x
        ),
      };
    case "UPDATE_TODO":
      return {
        ...state,
        todo: action.data,
      };
    default:
      return { ...state };
  }
};

export { init };
export default reducer;

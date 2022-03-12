export const addToDo = (payload) => ({
  type: "ADD_TO_DO",
  payload,
});

export const removeToDo = (id) => ({
  type: "REMOVE_TO_DO",
  id,
});

export const changeStatus = (id) => ({
  type: "CHANGE_STATUS",
  id,
});

export const updateTodo = (data) => ({
  type: "UPDATE_TODO",
  data,
});

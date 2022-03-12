import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("it creates a new todo", () => {
  render(<App />);
  const inputElement = screen.getByTestId("input");

  // Create the todo.
  fireEvent.change(inputElement, { target: { value: "Feed my dog." } });
  fireEvent.keyPress(inputElement);

  const todos = screen.getAllByTestId("todo");
  const todoNameElement = todos[0];

  // The name should be in the screenument as "Feed my dog."
  expect(todoNameElement.textContent).toBe("Feed my dog.");
  // There should be 1 todo in the screenument.
  expect(todos.length).toBe(1);
});

// test2: Make sure that after creating a todo, if the
// user clicks the delete button, a todo goes away.
test("it deletes a todo", () => {
  render(<App />);

  const inputElement = screen.getByTestId("input");

  // Create the todo.
  fireEvent.change(inputElement, { target: { value: "Feed my cat." } });
  fireEvent.keyPress(inputElement);

  // Click the delete button on the todo.
  const todoDeleteButton = screen.getByTestId("deleteButton");
  fireEvent.click(todoDeleteButton);

  const todos = screen.queryAllByTestId("todo");
  // There should be 0 todos found in the screenument.
  expect(todos.length).toBe(0);
});

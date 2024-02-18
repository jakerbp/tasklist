import { useContext, useRef } from "react";
import { TodoContext } from "./App";

export function NewTodo() {
  const nameRef = useRef();
  const { addNewTodo } = useContext(TodoContext);
  function handleSubmit(e) {
    e.preventDefault();
    if (nameRef.current.value === "") return;
    addNewTodo(nameRef.current.value);
    nameRef.current.value = "";
  }

  return (
    <form id="new-todo-form" onSubmit={handleSubmit}>
      <div className="flex gap-4 items-center  border-slate-500 justify-between">
        <input
          type="text"
          id="todo-input"
          className="input input-bordered w-full hover:input-primary focus:input-primary"
          placeholder="Add a new task..."
          ref={nameRef}
          autoFocus={true}
        />
        <button className="btn btn-outline">Add</button>
      </div>
    </form>
  );
}

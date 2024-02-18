import { useContext, useRef, useState } from "react";
import { TodoContext } from "./App";

export function TodoItem({ id, name, completed }) {
  const { toggleTodo, deleteTodo, updateTodoName } = useContext(TodoContext);
  const [isEditing, setIsEditing] = useState(false);
  const nameRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    if (nameRef.current.value === "") return;
    updateTodoName(id, nameRef.current.value);
    setIsEditing(false);
  }

  return (
    <li className="list-item">
      {isEditing ? (
        <form
          onSubmit={handleSubmit}
          className="flex gap-4 mb-2 justify-between"
        >
          <input
            type="text"
            className="input input-bordered w-full input-accent"
            ref={nameRef}
            defaultValue={name}
            autoFocus={true}
          />
          <button className="btn btn-outline grow px-10">Save</button>
        </form>
      ) : (
        <>
          <div className="flex items-center gap-4 mb-2 justify-between ">
            <label className="flex gap-2 items-center">
              <input
                checked={completed}
                type="checkbox"
                className="checkbox"
                data-list-item-checkbox
                onChange={(e) => toggleTodo(id, e.target.checked)}
              />
              <span
                className={`text-lg hover:cursor-pointer ${
                  completed ? "line-through italic opacity-50" : ""
                }`}
              >
                {name}
              </span>
            </label>
            <div className="flex gap-2 items-center">
              <button
                className="btn btn-outline"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
              <button
                className="btn btn-circle btn-outline "
                onClick={() => deleteTodo(id)}
                data-button-delete
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </>
      )}
    </li>
  );
}

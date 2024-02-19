import { createContext, useEffect, useReducer, useState } from "react";
import { NewTodo } from "./NewTodo";
import { TodoList } from "./TodoList";
import { TodoFilter } from "./TodoFilter";
import { ThemeToggle } from "./ThemeToggle";

const ACTIONS = {
  ADD: "ADD",
  TOGGLE: "TOGGLE",
  DELETE: "DELETE",
  EDIT: "EDIT",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD:
      return [
        ...state,
        {
          name: payload.name,
          completed: false,
          id: crypto.randomUUID(),
        },
      ];

    case ACTIONS.DELETE:
      return [...state.filter((todo) => todo.id !== payload.id)];

    case ACTIONS.TOGGLE:
      return state.map((todo) => {
        if (todo.id === payload.id)
          return { ...todo, completed: !todo.completed };
        return todo;
      });
    case ACTIONS.EDIT:
      return state.map((todo) => {
        if (todo.id === payload.id) return { ...todo, name: payload.name };
        return todo;
      });
    default:
      throw new Error(`No action found for ${type}.`);
  }
}

export const TodoContext = createContext();

function App() {
  const [hideCompleted, setHideCompleted] = useState(false);
  const [filterName, setFilterName] = useState("");
  const [todos, dispatch] = useReducer(
    reducer,
    [
      {
        id: 1,
        name: "<-- Mark complete by checking the box",
        completed: false,
      },
      { id: 2, name: "Edit/delete with the buttons -->", completed: false },
    ],
    (initialValue) => {
      const value = localStorage.getItem("todos");
      if (value === null) return initialValue;
      return JSON.parse(value);
    }
  );

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const filteredTodos = todos.filter((todo) => {
    if (hideCompleted && todo.completed) return false;
    return todo.name.toLowerCase().includes(filterName.toLowerCase());
  });

  function addNewTodo(name) {
    dispatch({
      type: ACTIONS.ADD,
      payload: { name },
    });
  }

  function toggleTodo(todoId) {
    dispatch({
      type: ACTIONS.TOGGLE,
      payload: { id: todoId },
    });
  }

  function updateTodoName(id, name) {
    dispatch({
      type: ACTIONS.EDIT,
      payload: { id, name },
    });
  }

  function deleteTodo(todoId) {
    dispatch({
      type: ACTIONS.DELETE,
      payload: { id: todoId },
    });
  }

  return (
    <TodoContext.Provider
      value={{
        todos: filteredTodos,
        addNewTodo,
        toggleTodo,
        deleteTodo,
        updateTodoName,
      }}
    >
      <div className="mx-auto sm:max-w-xl px-2 max-w-sm">
<ThemeToggle/>
        <div className="hero-content text-center">
          <div className="max-w-xl">

            <h1 className="text-5xl font-bold text-center">Task list</h1>

            <div className="my-2 text-sm ">
              <p className="py-1">
                Add new tasks. Tick, edit & delete existing tasks.{" "}
              </p>
              <p>Filter by name. Hide completed tasks.</p>
              <p>All saved to local storage, with no sign-in required.</p>
            </div>
          </div>
        </div>
        <NewTodo />
        <TodoFilter
          filterName={filterName}
          setFilterName={setFilterName}
          hideCompleted={hideCompleted}
          setHideCompleted={setHideCompleted}
        />
        <div className="divider"></div> 
        <TodoList />
      </div>
    </TodoContext.Provider>
  );
}

export default App;

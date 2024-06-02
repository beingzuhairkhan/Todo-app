import './style.css'

interface Todo {
  title: string;
  isCompleted: boolean;
  readonly id: string;
}

const todos: Todo[] = [];

const todoContainer = document.querySelector(".todoContainer") as HTMLDivElement;
const todoInput = document.getElementsByName("title")[0] as HTMLInputElement;
const myForm = document.getElementById("myForm") as HTMLFormElement;

myForm.onsubmit = (e: SubmitEvent) => {
  e.preventDefault();

  const todo: Todo = {
    title: todoInput.value,
    isCompleted: false,
    id: String(Math.floor(Math.random() * 1000)),
  };

  todos.push(todo);
  todoInput.value = "";
  renderTodos(todos);
};

const generateTodoItem = (title: string, isCompleted: boolean, id: string) => {
  const todo = document.createElement("div") as HTMLDivElement;
  todo.className = "todo";

  const checkBox = document.createElement("input") as HTMLInputElement;
  checkBox.setAttribute("type", "checkbox");
  checkBox.className = "isCompleted";
  checkBox.checked = isCompleted;
  checkBox.onchange = () => {
    todos.forEach(item => {
      if (item.id === id) {
        item.isCompleted = checkBox.checked;
        renderTodos(todos);
      }
    });
  };

  const paragraph = document.createElement("p") as HTMLParagraphElement;
  paragraph.innerText = title;
  paragraph.className = isCompleted ? "textCut" : "";

  const btn = document.createElement('button') as HTMLButtonElement;
  btn.innerText = "Delete";
  btn.className = "todo-Delete";
  btn.onclick = () => {
    deleteTodo(id);
  };

  todo.append(checkBox, paragraph, btn);
  todoContainer.append(todo);
};

const renderTodos = (todos: Todo[]) => {
  todoContainer.innerHTML = "";
  todos.forEach(item => {
    generateTodoItem(item.title, item.isCompleted, item.id);
  });
};

const deleteTodo = (id: string) => {
  const idx = todos.findIndex(item => item.id === id);
  if (idx > -1) {
    todos.splice(idx, 1);
    renderTodos(todos);
  }
};

renderTodos(todos);

let dbTodoList = {
  todos: [
    { id: "0", text: 'Todo 0', completed: false },
    { id: "1", text: 'Todo 1', completed: false }
  ]
}

export const getTodos = () => {
  return dbTodoList
}

export const addTodo = ({ id, text }) => {
  dbTodoList.todos = [
    ...dbTodoList.todos, {
      id: id,
      text: text,
      completed: false
    }
  ]
  return id
}

export const toggleTodo = ({ id }) => {
  dbTodoList.todos = dbTodoList.todos.map(todo => {
    if (todo.id !== id) {
      return todo
    }
    return {
      ...todo,
      completed: !todo.completed
    }
  })
  return id
}

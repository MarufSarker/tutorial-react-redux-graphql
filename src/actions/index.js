import {
  asyncGetTodos,
  asyncAddTodo,
  asyncToogleTodo
} from './graphQLFetcher'

export const CONSTANTS = {
  'ADD_TODO': 'ADD_TODO',
  'TOGGLE_TODO': 'TOGGLE_TODO',
  'ASYNC_ACTION': 'ASYNC_ACTION',
  'RECEIVE_TODOS': 'RECEIVE_TODOS'
}

const asyncAction = () => {
  return {
    type: CONSTANTS['ASYNC_ACTION']
  }
}

export const receiveTodos = () => {
  return (dispatch) => {
    dispatch(asyncAction())
    return asyncGetTodos()
      .then(todoList => dispatch({
        type: CONSTANTS['RECEIVE_TODOS'],
        todos: todoList.todos
      }))
  }
}

export const addTodo = (text) => {
  return (dispatch) => {
    dispatch(asyncAction())
    return asyncAddTodo(text)
      .then(id => {
        dispatch({
          type: CONSTANTS['ADD_TODO'],
          text: text,
          id: id
        })
      })
  }
}

export const toggleTodo = (id) => {
  return (dispatch) => {
    dispatch(asyncAction())
    return asyncToogleTodo(id)
      .then(id => {
        dispatch({
          type: CONSTANTS['TOGGLE_TODO'],
          id
        })
      })
  }
}

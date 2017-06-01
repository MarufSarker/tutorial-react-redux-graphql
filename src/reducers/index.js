import { combineReducers } from 'redux'

import { CONSTANTS } from '../actions'

let initialState = {
  todos: [],
  isFetching: false
}

const todoHandler = (todo, action) => {
  switch (action.type) {
    case CONSTANTS['ADD_TODO']:
      return {
        id: action.id,
        text: action.text,
        completed: false
      }
    case CONSTANTS['TOGGLE_TODO']:
      if (todo.id !== action.id) {
        return todo
      }
      return {
        ...todo,
        completed: !todo.completed
      }
    default:
      return todo
  }
}

const todosHandler = (state = initialState.todos, action) => {
  switch (action.type) {
    case CONSTANTS['ADD_TODO']:
      return [
        ...state,
        todoHandler(undefined, action)
      ]
    case CONSTANTS['TOGGLE_TODO']:
      return state.map(todo =>
        todoHandler(todo, action)
      )
    default:
      return state
  }
}

const todoListHandler = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS['ASYNC_ACTION']:
      return Object.assign({}, state, {
        isFetching: true
      })
    case CONSTANTS['RECEIVE_TODOS']:
      return Object.assign({}, state, {
        isFetching: false,
        todos: action.todos
      })
    case CONSTANTS['ADD_TODO']:
    case CONSTANTS['TOGGLE_TODO']:
      return Object.assign({}, state, {
        isFetching: false,
        todos: todosHandler(state.todos, action)
      })
    default:
      return state
  }
}

const todoApp = combineReducers({
  todoList: todoListHandler
});

export default todoApp

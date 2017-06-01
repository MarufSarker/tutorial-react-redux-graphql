import React, { Component } from 'react'

import '../styles/styles.css'

import AddTodo from '../containers/AddTodo'
import TodoList from '../containers/TodoList'

class App extends Component {
  render() {
    return (
      <div className="appContainer">
        <AddTodo/>
        <TodoList/>
      </div>
    );
  }
}

export default App

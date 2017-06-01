import React from 'react'
import { connect } from 'react-redux'

import { addTodo } from '../actions'

let AddTodo = ({ dispatch }) => {
  let input
  return (
    <div className="inputContainer">
      <input
        type="text"
        className="todoInput"
        placeholder="Enter Todo"
        ref={i => input = i}
      />
      <input
        type="button"
        className = "todoInputButton"
        value="ADD"
        onClick={() => {
          if (input.value.trim().length <= 0) {
            return;
          }
          dispatch(addTodo(input.value))
          input.value = ''
        }}
      />
    </div>
  )
}

export default connect()(AddTodo)

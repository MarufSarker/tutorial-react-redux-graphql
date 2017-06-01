import {
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql'

import { getTodos, addTodo, toggleTodo } from '../data'

const todoType = new GraphQLObjectType({
  name: 'ToDo',
  description: 'Single instance of a todo',
  fields: {
    id: {
      type: GraphQLString,
      description: 'ID of the todo item'
    },
    text: {
      type: GraphQLString,
      description: 'Text of the todo item'
    },
    completed: {
      type: GraphQLBoolean,
      description: 'Completion status of the todo item'
    }
  }
})

const todosType = new GraphQLObjectType({
  name: 'Todos',
  description: 'List of Todos',
  fields: {
    todos: {
      type: new GraphQLList(todoType),
      resolve: (data) => {
        return data.map(todo => todo)
      }
    }
  }
})

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    todos: {
      type: new GraphQLList(todoType),
      resolve: (root) => {
        return getTodos().todos.map(todo => todo)
      }
    },
  }),
})

const addTodoMutation = {
  name: 'AddTodoMutation',
  description: 'Mutation for adding todo',
  type: GraphQLString,
  args: {
    text: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Text of the todo'
    },
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'ID of the todo'
    }
  },
  resolve: (root, args) => {
    let { id, text } = args
    return addTodo({ id, text })
  }
}

const toggleTodoMutation = {
  name: 'ToogleTodoMutation',
  description: 'Mutation for toggling todo status',
  type: GraphQLString,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'ID of the todo'
    }
  },
  resolve: (root, args) => {
    let { id } = args
    return toggleTodo({ id })
  }
}

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    addTodo: addTodoMutation,
    toggleTodo: toggleTodoMutation
  })
})

const Schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType
})

export default Schema

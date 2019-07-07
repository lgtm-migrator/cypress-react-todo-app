import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { saveTodo } from '../lib/service';
import Footer from './Footer';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

export default class TodoApp extends Component {
  constructor(props) {
    super(props);

    this.state = { todos: [], currentTodo: '' };
  }

  render() {
    const {
      state: { todos, currentTodo },
    } = this;

    return (
      <Router>
        <div>
          <header className="header">
            <h1>todos</h1>
            <TodoForm
              currentTodo={currentTodo}
              setCurrentTodo={todo => this.setState({ currentTodo: todo })}
              onSubmit={() => {
                saveTodo(currentTodo).then(({ data: todo }) => {
                  this.setState({ todos: todos.concat(todo) });
                });
              }}
            />
          </header>
          <section className="main">
            <TodoList todos={todos} />
          </section>
          <Footer />
        </div>
      </Router>
    );
  }
}

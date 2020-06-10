import React, { Component } from 'react';
import './App.css';

class MyToDoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: '' };
    this.valChange = this.valChange.bind(this);
    this.valSubmit = this.valSubmit.bind(this);
  }

  render() {
    return (
      <div className="App-header">
        <h1>MY FANCY TO DO LIST</h1>
        <TodoList items={this.state.items} />
        <form onSubmit={this.valSubmit}>
          <label htmlFor="new-todo">
            What should we do next....?
          </label>
          <input
            id="new-todo"
            onChange={this.valChange}
            value={this.state.text}
          />
          <button>
            Add #{this.state.items.length + 1}
          </button>
        </form>
      </div>
    );
  }

  valChange(e) {
    this.setState({ text: e.target.value });
  }

  valSubmit(e) {
    e.preventDefault();
    if (!this.state.text.length) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now()
    };
    this.setState(state => ({
      items: state.items.concat(newItem),
      text: ''
    }));
  }
}

class TodoList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.items.map(item => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    );
  }
}

export default MyToDoList;

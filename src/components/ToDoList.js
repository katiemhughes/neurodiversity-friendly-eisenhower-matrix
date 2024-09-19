import React, { Component } from "react";

class ToDoList extends Component {
  state = {
    inputText: "",
  };
  //I don't need to define items in the state here because we don't use it in this component.

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addItem(this.state.inputText);
    this.setState({inputText: ""})
    //here we are defining (with this.props.) and calling the addItem function which I created in the App.js parent component.
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { inputText } = this.state;

    return (
      <div className="formWrapper">
          <form onSubmit={this.handleSubmit}>
            <input
              name="inputText"
              value={inputText}
              placeholder="Next task"
              onChange={this.handleChange}
              autocomplete="off"
            />
            <button className="addButton" type="submit"> Add </button>
          </form>
      </div>
    );
  }
}

export default ToDoList;

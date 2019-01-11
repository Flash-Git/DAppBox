import React, { Component } from "react";

class Method extends Component {

  state = {
    args: [],
    newArgA: "",
    newArgB: ""
  }

  onSubmit = (e) => {
    e.preventDefault();
    const args = this.state.args;
    args.push([this.state.newArgA, this.state.newArgB]);
    this.setState({ args });
    this.props.addMethodArguments(this.props.method.id, this.state.args);
  }

   onChange = (e) => this.setState({
     [e.target.name]: e.target.value
   });

  render(){
    return(
      <div className="method" style={ methodStyle }>
        { this.props.method.contract + " " + this.props.method.methodType + " " + this.props.method.methodName }
        { "(" }
        { this.state.args.map((arg, i) => (
         arg[0] + ": " + arg[1] + (i==this.state.args.length-1 ? "" : ", ")
        )) }
        { ")" }
        <form onSubmit={ this.onSubmit } className="method" style={ methodStyle }>
          <input 
            type="text" 
            name="newArgA" 
            placeholder="Arg Type" 
            value={ this.state.newArgA }
            onChange={ this.onChange }
          />
          <input 
            type="text" 
            name="newArgB" 
            placeholder="Arg" 
            value={ this.state.newArgB }
            onChange={ this.onChange }
          />
          <input 
            type="submit" 
            value="Add Args" 
            className="btn"
          />
        </form>
      </div>
    );
  }
}
//this.props.method.contract
const methodStyle = {
  textAlign: "center",
  justifyContent: "center",
  background: "#444",
  color: "#fff",
  margin: "0.2rem"
}

export default Method;
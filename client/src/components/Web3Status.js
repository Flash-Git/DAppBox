import React, { Component } from "react";

class Web3Status extends Component {

  componentDidMount(){
    this.props.checkConnected();
  }

  onClick = () => {
    this.props.enableWeb3();
    this.props.checkConnected();
  }

  render(){
    return(
      <div id="section-web3Status" className="section" style={ web3StatusStyle }>
        <button onClick={ this.onClick } style={ btnStyle }>{ (this.props.connected ? "Connected" : "Connect to Web3") }</button>
      </div>
    );
  }
}

const web3StatusStyle = {
  textAlign: "center",
  justifyContent: "center",
  background: "#888"
}

const btnStyle = {
  background: "#660000",
  padding: "6px 26px",
  border: "none",
  borderRadius: "5%",
  cursor: "pointer",
  color: "#fff",
  fontWeight: "bold"
}

export default Web3Status;
import React, { Component } from "react";
import PropTypes from "prop-types";

class PreTrade extends Component {

  state = {
    address1: "",
    address2: "",
    validInput1: false,
    validInput2: false
  }

  async componentDidMount() {
    if(this.props.isUser!==0){
      let address1 = "";
      try{
        address1 = await window.web3.currentProvider.selectedAddress;
        console.log(address1);
        this.setState({ address1 });//TODO doesn't update input field
      } catch(e){
        console.error(e);
      }
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    if(this.checkAddresses() === false){
      return;
    }
    this.props.setAddresses([this.state.address1, this.state.address2]);
  }

  checkAddresses = () => {
    if(this.props.connected){
      let sumAdd1 = "";
      let sumAdd2 = "";

      try{
        sumAdd1 = window.web3.utils.toChecksumAddress(this.state.address1);
      } catch(e) {
        this.setState({ validInput1: false });
        return false;
      }
      try{
        sumAdd2 = window.web3.utils.toChecksumAddress(this.state.address2);
      } catch(e) {
        this.setState({ validInput2: false });
        return false;
      }
      if(window.web3.utils.isAddress(sumAdd1)){
        this.setState({ validInput1: true });
      } else {
        this.setState({ validInput1: false });
      }
      if(window.web3.utils.isAddress(sumAdd2)){
          this.setState({ validInput2: true });
      } else {
        this.setState({ validInput2: false });
      }
    }
  }

   onChange = (e) => {this.setState({
     [e.target.name]: e.target.value
   });
   this.checkAddresses();//TODO race condition(?)
  }

  render(){
    return(
      <div id="section-preTrade" className="section" style={ preTradeStyle }>
        <form onSubmit={ this.onSubmit } className="method" style={ methodStyle }>
        <input
            type="text"
            name="address1"
            placeholder="Address 1"
            value={ this.state.address1 }
            onChange={ this.onChange }
            style={ (this.state.validInput1 ? inputStyle : badInputStyle) }
          />
        <input
          type="text"
          name="address2"
          placeholder="Address 2"
          value={ this.state.address2 }
          onChange={ this.onChange }
          style={ (this.state.validInput2 ? inputStyle : badInputStyle) }
        />
        </form>
        <button onClick={ this.onSubmit } style={ btnStyle }>Open Trade Box</button>
        <button onClick={ this.props.refresh } style={ btnStyle }>Refresh</button>
      </div>
    );
  }
}

const methodStyle = {
  textAlign: "center",
  justifyContent: "center",
  background: "#888",
  color: "#fff",
}

const inputStyle= {
  width: "24em",
  textAlign: "center",
  margin: "0.1rem"
}

const badInputStyle= {
  width: "24em",
  textAlign: "center",
  margin: "0.2rem",
  border: "solid red"
}

const preTradeStyle = {
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
  fontWeight: "bold",
  margin: "0 1rem",
  width: "13em"
}

//PropTypes
PreTrade.propTypes = {
  isUser: PropTypes.number.isRequired,
  setAddresses: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired,
  connected: PropTypes.bool.isRequired
}

export default PreTrade;
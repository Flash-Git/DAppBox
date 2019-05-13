import React, { Component } from "react";
import PropTypes from "prop-types";

import { colours } from "../Static";

class PreTrade extends Component {

  constructor(props) {
    super(props);
    this.state = {
      input1: "",
      input2: "",
      address1: "",
      address2: "",
      ensAdd1: "",
      ensAdd2: "",
      validInput1: false,
      validInput2: false
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange1 = this.onChange1.bind(this);
    this.onChange2 = this.onChange2.bind(this);
    this.checkAddress = this.checkAddress.bind(this);
  }

  async checkAddress(index, input) {
    try{
      if(!this.props.connected){
        this.setState({ validInput1: false, validInput2: false });
        return;
      }
    }catch(e){
      await this.props.enableWeb3();
    }
    
    if(!input.includes(".eth")&&!input.includes(".test")){
      if(input.length !== 42){
        index === 0 ? this.setState({ validInput1: false }) : this.setState({ validInput2: false });
        return;
      }

      try{
        const sumAdd = await window.web3.utils.toChecksumAddress(input);
        if(window.web3.utils.isAddress(sumAdd)){
          index === 0 ? this.setState({ validInput1: true, address1: sumAdd, ensAdd1: "" }) : this.setState({ validInput2: true, address2: sumAdd, ensAdd2: "" });
          return;
        }
        index === 0 ? this.setState({ validInput1: false }) : this.setState({ validInput2: false });
        return;
      }catch(e){
        index === 0 ? this.setState({ validInput1: false }) : this.setState({ validInput2: false });
        return;
      }
    }

    try{
      let ensAdd = await window.web3.eth.ens.getAddress(input);
      ensAdd = await window.web3.utils.toChecksumAddress(ensAdd);
      if(!window.web3.utils.isAddress(ensAdd)){
        index === 0 ? this.setState({ validInput1: false }) : this.setState({ validInput2: false });
      }
      index === 0 ? this.setState({ validInput1: true, address1: ensAdd, ensAdd1: input }) : this.setState({ validInput2: true, address2: ensAdd, ensAdd2: input });
      return;
    }catch(e){
      index === 0 ? this.setState({ validInput1: false }) : this.setState({ validInput2: false });
      return;
    }
  }

  async onChange1(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
    
    this.checkAddress(0, e.target.value);
  }

  async onChange2(e) {
    this.setState({
      [e.target.name]: e.target.value
    });

    this.checkAddress(1, e.target.value);
  }

  async onSubmit(e) {
    e.preventDefault();
    if(!this.props.connected){
      await this.props.enableWeb3();
    }
    Promise.all([this.checkAddress(0, this.state.input1), this.checkAddress(1, this.state.input2)])
      .then( () => {
        if(this.state.validInput1 && this.state.validInput1){
          this.props.setAddresses([this.state.address1, this.state.address2], [this.state.ensAdd1, this.state.ensAdd2]);
        }
      });
  }

  render() {
    return(
      <div id="section-preTrade" className="section" style={ preTradeStyle }>
        <form onSubmit={ this.onSubmit } className="form" style={ formStyle }>
          <div style={ addressesStyle }>
            <input
                type="text"
                name="input1"
                placeholder="Address 1"
                value={ this.state.input1 }
                onChange={ this.onChange1 }
                style={ (this.state.validInput1 ? {...inputStyle, ...{ marginBottom: "0.1rem" }} : {...badInputStyle, ...{ marginBottom: "0.1rem" }}) }
              />
            <input
              type="text"
              name="input2"
              placeholder="Address 2"
              value={ this.state.input2 }
              onChange={ this.onChange2 }
              style={ (this.state.validInput2 ? inputStyle : badInputStyle) }
            />
          </div>
        </form>
        <button onClick={ this.onSubmit } style={ btnStyle }>Load Boxes</button>
      </div>
    );
  }
}

const preTradeStyle = {
  display: "flex",
  flexWrap: "wrap",
  flexDirection: "row",
  textAlign: "center",
  justifyContent: "center",
  //margin: "0 0.4rem"
}

const formStyle = {
  display: "flex",
  textAlign: "center",
  justifyContent: "center",
  //width: "24em",
  maxWidth: "100%",
}

const addressesStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  textAlign: "center",
  width: "20em",
  //minWidth: "6em",//oddly fucky
  maxWidth: "100%",
  paddingRight: "8px"
}

const inputStyle = {
  textAlign: "center",
  //margin: "0.05rem 0",
  borderColor: "#888888",
  borderWidth: "1px",
  borderLeft: "solid 4px green",
  borderStyle: "solid",
  padding: "0.1rem",
  backgroundColor: colours.Primary,
  color: colours.Quaternary,
  width: "100%"
}

const badInputStyle = {
  textAlign: "center",
  //margin: "0.05rem 0",
  borderColor: "#888888",
  borderWidth: "1px",
  borderLeft: "solid 4px red",
  borderStyle: "solid",
  padding: "0.1rem",
  backgroundColor: colours.Primary,
  color: colours.Quaternary,
  width: "100%"
}

const btnStyle = {
  display: "flex",
  justifyContent: "center",
  textAlign: "center",
  background: colours.User,
  padding: "10px 14px",
  border: "none",
  borderRadius: "0.4rem",
  cursor: "pointer",
  color: colours.Secondary,
  fontWeight: "bold",
  margin: "0.4rem",
}

//PropTypes
PreTrade.propTypes = {
  isUser: PropTypes.number.isRequired,
  setAddresses: PropTypes.func.isRequired,
  connected: PropTypes.bool.isRequired,
  enableWeb3: PropTypes.func.isRequired
}

export default PreTrade;
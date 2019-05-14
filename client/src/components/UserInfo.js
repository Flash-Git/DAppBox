import React, { Component } from "react";
import Web3Status from "./Web3Status";
import TokenInfo from "./UserInfo/TokenInfo";
import PropTypes from "prop-types";
import makeBlockie from "ethereum-blockies-base64";

import { colours } from "../Static";

class UserInfo extends Component {
  render() {
    if(!this.props.connected){
      return(
        <div id="section-userInfo" className="section" style={ userInfoStyle }>
          <div style={{ margin: "0.45rem", padding: "0.5rem" }}>
            <Web3Status connected ={ this.props.connected } enableWeb3={ this.props.enableWeb3 } />
          </div>
        </div>
      );
    }
    return(
      <div id="section-userInfo" className="section" style={ userInfoStyle }>
        <div style={ topStyle }>
          <img src={ makeBlockie(window.ethereum.selectedAddress) } width="32px" height="32px" alt="blockie" />
          <Web3Status connected ={ this.props.connected } enableWeb3={ this.props.enableWeb3 } />
        </div>
        <div style={ bottomStyle }>
          <TokenInfo connected={ this.props.connected } counter={ this.props.counter } address={ window.ethereum.selectedAddress }
            addErc={ this.props.addErc } />
        </div>
      </div>
    );
  }
}

const userInfoStyle = {
  display: "flex",
  flexDirection: "column",
  color: colours.Quaternary,
  width: "11rem",
  textAlign: "center",
  justifyContent: "center",
  maxHeight: "100%",
  marginLeft: "auto"//
}

const topStyle = {
  marginBottom: "0.8rem",
  marginTop: "0",
  padding: "0.4rem",
  margin: "0.5rem"
}

const bottomStyle = {
  borderRadius: "20px",
  maxHeight: "26rem",//?
  overflowY: "auto",
  scrollbarWidth: "thin",
}

//PropTypes
UserInfo.propTypes = {
  connected: PropTypes.bool.isRequired,
  enableWeb3: PropTypes.func.isRequired,
  addErc: PropTypes.func.isRequired,
  counter: PropTypes.number.isRequired
}

export default UserInfo;
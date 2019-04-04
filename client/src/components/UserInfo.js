import React, { Component } from "react";
import Web3Status from "./Web3Status";
import PropTypes from "prop-types";
import makeBlockie from "ethereum-blockies-base64";

class UserInfo extends Component {

  onClick = () => {
    
  }

  render() {
    return(
      <div id="section-userInfo" className="section" style={ userInfoStyle }>
        {
          window.ethereum.selectedAddress !== undefined ? 
          <img src={ makeBlockie(window.ethereum.selectedAddress) } width="32px" height="32px" alt="blockie" /> : "" 
        }
        <Web3Status enableWeb3={ this.props.enableWeb3 } connected ={ this.props.connected } />
        <div>

        </div>
      </div>
    );
  }
}

const userInfoStyle = {
  width: "10.5rem",
  height: "30rem",
  right: "0",
  position: "fixed",
  textAlign: "center",
  justifyContent: "center",
  background: "#858889",
  marginTop: "3rem",
  marginRight: "0.2rem",
  border: "solid",
  paddingTop: "0.5rem"
}

//PropTypes
UserInfo.propTypes = {
  connected: PropTypes.bool.isRequired,
  enableWeb3: PropTypes.func.isRequired,
}

export default UserInfo;
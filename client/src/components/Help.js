import React, { Component } from "react";
//eslint-disable-next-line
import PropTypes from "prop-types";

class Help extends Component {

  state = {
  }

  toggle = (e) => {
  }

  render(){
    return(
      <div id="section-help" className="section" style={ helpSectionStyle }>
        <div style={ helpCellsStyle }>
          <div style={ helpCellStyle }>
            <h3>Arbitrary function calls</h3>
            <h4>To call the function setInt() of 0xbcF2...</h4>
            <span>Contract Address: &lt;0xbcF2...&gt; Function Name: &lt;setInt&gt; Function Type: &lt;function&gt; Call Type: &lt;Arbitrary&gt;</span>
            <h4>To add the argument int256 _value = 5 to the function setInt()</h4>
            <span>Arg Type: &lt;int256&gt; Arg Name: &lt;_value&gt; Arg Value: &lt;5&gt;</span>
            <h4>On execution: The Box contract will call setInt(5) of 0xbcF2...</h4>
          </div>
          <div style={ helpCellStyle }>
            <h3>Ownable function calls</h3>
            <h4>To offer ownership of contract 0x1234...</h4>
            <span>Contract Address: &lt;0x1234...&gt; Function Name: &lt;setOwner&gt; Function Type: &lt;function&gt; Call Type: &lt;Ownable&gt;</span>
            <h4>To add the argument address _newOwner = &lt;Trade Partner&gt; to the function setOwner()</h4>
            <span>Arg Type: &lt;address&gt; Arg Name: &lt;_newOwner&gt; Arg Value: &lt;Trade Partner&gt;</span>
            <h4>On execution: The Box contract will set the owner variable of 0x1234... to &lt;Trade Partner&gt;</h4>
          </div>
          <div style={ helpCellStyle }>
            <h3>Balanceable function calls</h3>
            <h4>To offer x of contract 0x4321... "tokens"</h4>
            <span>Contract Address: &lt;0x4321...&gt; Function Name: &lt;setOwner&gt; Function Type: &lt;function&gt; Call Type: &lt;Ownable&gt;</span>
            <h4>To add the argument address _newOwner = &lt;Trade Partner&gt; to the function setOwner()</h4>
            <span>Arg Type: &lt;address&gt; Arg Name: &lt;_newOwner&gt; Arg Value: &lt;Trade Partner&gt;</span>
            <h4>On execution: The Box contract will transfer x of contract 0x4321... "tokens" to &lt;Trade Partner&gt;</h4>
          </div>
        </div>
        <button onClick={ this.toggle } style={ btnStyle }>Toggle Help</button>
      </div>
    );
  }
}

const helpSectionStyle = {
  display: "flex",
  textAlign: "center",
  justifyContent: "center",
  background: "#608f82",
  margin: "0 1.6rem",
  padding: "0.4rem",
  border: "solid"
}

const helpCellsStyle = {
  display: "flex"
}

const helpCellStyle = {
  textAlign: "left",
  color: "#fff",
  background: "#706baa",
  padding: "0 0.5rem",
  marginRight: "1rem",
  // borderRightStyle: "solid",
  fontSize: "small",
  lineHeight: "1",
  width: "15rem"
}

const btnStyle = {
  textAlign: "center",
  justifyContent: "center",
  background: "#564899",
  border: "none",
  borderRadius: "5%",
  cursor: "pointer",
  color: "#fff",
  fontWeight: "bold",
  margin: "0 2rem"
}

//PropTypes
Help.propTypes = {

}

export default Help;
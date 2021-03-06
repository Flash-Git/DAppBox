import React, { Component } from "react";
import PropTypes from "prop-types";

import Summary from "./Summary";
import Satisfied from "./Satisfied";
import SubmitBox from "./SubmitBox";
import OfferErc from "./OfferErc";

import { sendStatus, colours } from "../../Static";
import { ArcaContract, ArcaCalls, Erc20Contract, Erc721Contract, ErcCalls } from "../../ContractCalls";

class Box extends Component {

  constructor(props) {
    super(props);
    this.state = {
      connected: false,
      partnerNonce: 0,
      localMethods: [],
      chainMethods: []
    }
    this.getMethods = this.getMethods.bind(this);
    this.addLocalMethod = this.addLocalMethod.bind(this);
    this.addChainErc = this.addChainErc.bind(this);
    this.getErc20Offers = this.getErc20Offers.bind(this);
    this.getErc721Offers = this.getErc721Offers.bind(this);
    this.updateErc = this.updateErc.bind(this);
    this.removeExtraMethods = this.removeExtraMethods.bind(this);
    this.remove = this.remove.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if(this.props.addresses[0] !== newProps.addresses[0] || this.props.addresses[1] !== newProps.addresses[1]
      || newProps.connected !== this.props.connected || newProps.counter !== this.props.counter){
      this.setState({ connected: newProps.connected }, () => this.getMethods());
    }
  }

  getMethods() {
    if(!this.state.connected){
      return;
    }

    const contract = ArcaContract();
    const [add1, add2] = this.props.addresses;

    ArcaCalls("getErc20Count", [add1, add2], contract)
      .then(res => {
        this.getErc20Offers(+res, contract);
        this.removeExtraMethods(+res, "0");
      })
      .catch(e => {
        return e;
      });

    ArcaCalls("getErc721Count", [add1, add2], contract)
      .then(res => {
        this.getErc721Offers(+res, contract);
        this.removeExtraMethods(+res, "1");
        })
      .catch(e => {
        return e;
      });

    ArcaCalls("getNonce", [add2, add1], contract)
      .then(res => {
        this.setState({ partnerNonce: +res });
      })
      .catch(e => {
        return;
      })
  }

  addLocalMethod(method) {
    const [add1, add2] = this.props.addresses;
    const arcaContract = ArcaContract();
    
    if(method.type === 0){
      const ercContract = Erc20Contract(method.contractAdd);
      Promise.all([
        ArcaCalls("getErc20Count", [add1, add2], arcaContract),
        ErcCalls("decimals", ercContract),
        ErcCalls("allowance", ercContract)
      ])
        .then(res => {
          method.id = method.type+"-"+res[0].toString();

          method.decimalString = "1";
          for(let i = 0; i < +(res[1].toString()); i++){
            method.decimalString+="0";
          }

          method.enabled = res[2].toString() === "0" ? false : true;

          this.setState({ localMethods: [...this.state.localMethods, method] });
        })
        .catch(e => {
          this.setState({ localMethods: [...this.state.localMethods, method] });
        });
    }else{
      const ercContract = Erc721Contract(method.contractAdd);
      Promise.all([
        ArcaCalls("getErc721Count", [add1, add2], arcaContract),
        ErcCalls("isApprovedForAll", ercContract)
      ])
        .then(res => {
          method.id = method.type+"-"+res[0].toString();

          method.enabled = res[1];

          this.setState({ localMethods: [...this.state.localMethods, method] });
        });
    }
  }

  addChainErc(_erc) {
    let removals = this.state.chainMethods.filter(erc => {
      return erc.removing === true;
    });

    for(let i = 0; i < removals.length; i++){
      if(removals[i].id === _erc.id){
        return;
      }
    }

    let chainMethods = this.state.chainMethods.filter(erc => {
      return erc.id !== _erc.id;
    });

    let localMethods = this.state.localMethods.filter(erc => {
      return erc.id !== _erc.id;
    });

    chainMethods.push(_erc);
    chainMethods.sort((a, b) => {
      return a.id.split("-").join("") - b.id.split("-").join("");
    });

    this.setState({ chainMethods, localMethods });
  }

  getErc20Offers(_erc20Count, _arcaContract) {
    for(let i = 0; i < _erc20Count; i++){
      const [add1, add2] = this.props.addresses;
      let offer = { id: "0-"+i, type: 0, contractAdd: "", amountId: "", sendStatus: sendStatus.SENT, removed: false };

      ArcaCalls("getOfferErc20", [add1, add2, i], _arcaContract)
        .then(res => {
          [offer.contractAdd, offer.amountId] = [res[0].toString(), res[1]];
          const erc20Contract = Erc20Contract(offer.contractAdd);

          Promise.all([
            ErcCalls("decimals", erc20Contract),
            ErcCalls("name", erc20Contract),
            ErcCalls("symbol", erc20Contract),
            ErcCalls("allowance", erc20Contract)
          ])
          .then(res => {
            let decimalString = "1";
            for(let i = 0; i < +res[0]; i++){
              decimalString+="0";
            }
            offer.amountId = (+offer.amountId/+decimalString).toString();

            res[0] = decimalString;
            res[1] = res[1].toString();
            res[2] = res[2].toString();
            res[3] = res[3].toString() === "0" ? false : true;

            [offer.decimalString, offer.name, offer.symbol, offer.enabled] = res;

            this.addChainErc(offer);
          })
          .catch(e => {
            offer.amountId = "N/A";
            offer.symbol = "CANCELLED";
            offer.name = "N/A";
            offer.enabled = false;
            //this.addChainErc(offer);
          });
        })
        .catch(e => {
          return e;
        });
    }
  }

  getErc721Offers(_erc721Count, _arcaContract) {
    for(let i = 0; i < _erc721Count; i++){
      const [add1, add2] = this.props.addresses;
      let offer = { id: "1-"+i, type: 1, contractAdd: "", amountId: "", sendStatus: sendStatus.SENT };

      ArcaCalls("getOfferErc721", [add1, add2, i], _arcaContract)
        .then(res => {
          [offer.contractAdd, offer.amountId] = [res[0].toString(), res[1].toString()];
          const erc721Contract = Erc721Contract(offer.contractAdd);

          Promise.all([
            ErcCalls("name", erc721Contract),
            ErcCalls("symbol", erc721Contract),
            ErcCalls("isApprovedForAll", erc721Contract)
          ])
          .then(res => {
            res[0] = res[0].toString();
            res[1] = res[1].toString();
            [offer.name, offer.symbol, offer.enabled] = res;
            
            this.addChainErc(offer);
          })
          .catch(e => {
            offer.amountId = "N/A";
            offer.symbol = "N/A";
            offer.name = "N/A";
            offer.enabled = false;

            //this.addChainErc(offer); //Display removed calls
          });
        })
        .catch(e => {
          //console.log(e);
          return;
        });
    }
  }

  removeExtraMethods(_offerCount, _type)  {
    const chainMethods = this.state.chainMethods;
    for(let i = 0; i < chainMethods.length; i++){
      const id = chainMethods[i].id.split("-");
      if(id[0] !== _type) continue;
      if(+id[1] >= _offerCount){
        this.remove(chainMethods[i].id);
      }
    }
  }

  updateErc(_property, _id, _params) {
    const chainMethods = this.state.chainMethods;
    const localMethods = this.state.localMethods;

    switch(_property){
      case "removing":
        this.state.chainMethods.forEach((method, index) => {
          if(method.id === _id){
            chainMethods[index].removing = _params;
          }
        });
        this.setState({ chainMethods });
        break;
      case "sendStatus":
        this.state.localMethods.forEach((method, index) => {
          if(method.id === _id){
            localMethods[index].sendStatus = _params;
          }
        });
        this.setState({ localMethods });
        break;
      case "enabled":
        this.state.localMethods.forEach((method, index) => {
          if(method.id === _id){
            localMethods[index].enabled = _params;
          }
        });
        this.setState({ localMethods });
        break;
      default:
        console.log("Invalid property name: " + _property);
    }
  }

  remove(id) {
    let localMethods = this.state.localMethods.filter(meth => meth.id !== id);
    this.setState({ localMethods });
    let chainMethods = this.state.chainMethods.filter(meth => meth.id !== id);
    this.setState({ chainMethods });
  }

  render() {
    return(
      <div className="box" style={ boxStyle } >
        <Summary address={ this.props.addresses[0] } ensAdd={ this.props.ensAdd } />
        <div className="container" style={ containerStyle }>
          <div>
            { this.state.chainMethods.map(method =>
              <OfferErc key={ method.id } connected={ this.state.connected } method={ method }
                addresses={ this.props.addresses } local={ false } updateErc={ this.updateErc }
                isUser={ this.props.isUser } remove={ this.remove } />
            ) }
          </div>
          <div>
            { this.state.localMethods.map(method =>
              <OfferErc key={ method.id } connected={ this.state.connected } method={ method }
                addresses={ this.props.addresses } local={ true } updateErc={ this.updateErc }
                isUser={ this.props.isUser } remove={ this.remove } />
            ) }
          </div>
        </div>
        { this.props.addresses[0].length === 0 ? "" :
          <Satisfied connected={ this.state.connected } counter={ this.props.counter } addresses={ this.props.addresses } boxNum={ this.props.boxNum }
            isUser={ this.props.isUser } partnerNonce={ this.state.partnerNonce } setSatisfied={ this.props.setSatisfied } />
        }
        { this.props.isUser ?
          <SubmitBox connected={ this.state.connected } address={ this.props.addresses[0] } erc={ this.props.erc } addMethod={ this.addLocalMethod }
          /> : ""
        }
      </div>
    );
  }
}

const boxStyle = {
  display: "grid",
  gridColumnGap: "3px",
  gridTemplateRows: "2rem 3fr",
  gridTemplateColumns: "4fr 1fr",
  justifyContent: "center",
  textAlign: "center",
  width: "100%",
  minWidth: "11rem",
  background: colours.Primary,
  boxShadow: "0px 0px 25px -2px rgba(0,0,0,0.25)",
  color: colours.Secondary,
  fontWeight: "normal",
  padding: "0.3rem",
  margin: "1rem 1.25rem"
}

const containerStyle = {
  gridColumn: "1 auto",
  gridRow: "2 auto",
  overflowY: "auto",
  minHeight: "7.5rem",
  maxHeight: "14.45rem",
  scrollbarWidth: "thin",
  paddingRight: "0.2rem",
  margin: "0.1rem"
}

//PropTypes
Box.propTypes = {
  connected: PropTypes.bool.isRequired,
  counter: PropTypes.number.isRequired,
  addresses: PropTypes.array.isRequired,
  ensAdd: PropTypes.string.isRequired,
  boxNum: PropTypes.number.isRequired,
  isUser: PropTypes.bool.isRequired,
  erc: PropTypes.object.isRequired,
  setSatisfied: PropTypes.func.isRequired
}

export default Box;
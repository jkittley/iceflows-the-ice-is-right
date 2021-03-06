import React from 'react';
import { Badge, Row, Col, UncontrolledTooltip } from 'reactstrap';
import { FaInfoCircle } from 'react-icons/fa';
import ReactStars from 'react-stars'
import "./Fact.css";

class Fact extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      popoverOpen: false,
    };
    this.toggle.bind(this);
  }

  toggle() {
    this.setState({ popoverOpen: !this.state.popoverOpen });
  }

  render() {
    var uid = this.props.id+"_"+this.props.uid;
    var classNames = "fact py-2"
    var icon = null;
    if (this.props.isSelected) classNames += " bg-dark text-white";
    
    return <div onClick={ () => this.props.onClick(this.props) } className={classNames}>
    
    <div className="message">
      <h5>
        <span className="title">{this.props.title }</span>{' '}{ this.props.desc && <a href="#" id={uid}><FaInfoCircle/></a> }
        <br/><span className="units">{this.props.unit }</span>
        { this.props.desc && <UncontrolledTooltip placement="right" target={uid}>
        { this.props.desc }
        </UncontrolledTooltip> }
      </h5>
    </div>
    
    <div className="figure text-right">
    <Badge pill>{icon} {this.props.value }
    {/* <div className="d-none d-xl-inline ml-2"><ReactStars
      className="float-right"
      count={4}
      size={20}
      edit={false}
      value={(this.props.value / this.props.max) * 5}
      color1={'#444'} 
      color2={'#FFD700'} />
    </div> */}
    </Badge>
    </div>

    </div>
  }
}

export default Fact;


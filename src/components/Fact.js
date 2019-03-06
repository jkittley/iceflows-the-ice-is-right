import React from 'react';
import { Badge, Row, Col, Popover, PopoverHeader, PopoverBody, Button } from 'reactstrap';
import { FaInfoCircle } from 'react-icons/fa';



import ReactStars from 'react-stars'

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
    var classNames = "fact py-2"
    var icon = null;
    if (this.props.isSelected) classNames += " bg-dark text-white";
    return <Row onClick={ () => this.props.onClick(this.props) } className={classNames}>
    <Col >
    <h5 className="text-truncate">{this.props.title }{' '}
      <a className="p-0 m-0" id={"Popover_"+this.props.id} onClick={this.toggle.bind(this)}>
        <FaInfoCircle/>
      </a>
      </h5>
      <Popover placement="top" isOpen={this.state.popoverOpen} target={"Popover_"+this.props.id} toggle={ this.toggle.bind(this)}>
        <PopoverHeader>{this.props.title }</PopoverHeader>
        <PopoverBody>{this.props.desc }</PopoverBody>
      </Popover>
    </Col>
    <Col className="d-none d-xl-inline"><ReactStars
      className="float-right"
      count={5}
      size={24}
      edit={false}
      value={(this.props.value / this.props.max) * 5}
      color2={'#ffd700'} />
    </Col>
    <Col className="text-right"><Badge pill>{icon} {this.props.value } {this.props.unit }</Badge></Col>
    </Row>
  }
}

export default Fact;


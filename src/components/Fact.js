import React from 'react';
import { Badge, Row, Col } from 'reactstrap';
import ReactStars from 'react-stars'

class Fact extends React.Component {
  render() {
    var classNames = "fact py-2"
    var icon = null;
    if (this.props.isSelected) classNames += " bg-dark text-white";
    return <Row onClick={ () => this.props.onClick(this.props) } className={classNames}>
    <Col ><h5 className="text-truncate">{this.props.title }</h5></Col>
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


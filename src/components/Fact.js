import React from 'react';
import { Badge, Row, Col } from 'reactstrap';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import ReactStars from 'react-stars'

class Fact extends React.Component {
  render() {
    var classNames = "fact py-2"
    var icon = null;
    if (this.props.isSelected && this.props.isBetter) {
      classNames += " bg-danger text-white";
      icon =  <FaArrowUp />;
    } else if (this.props.isSelected && this.props.isWorse) {
      classNames += " bg-success text-white";
      icon =  <FaArrowDown />;
    } else if (this.props.isSelected)  {
      classNames += " bg-dark text-white";
    }
    return <Row onClick={ () => this.props.onSelect(this.props) } className={classNames}>
    <Col><h4>{this.props.title }</h4></Col>
    <Col className="text-center"><ReactStars
      count={5}
      size={24}
      value={this.props.star}
      color2={'#ffd700'} />
    </Col>
    <Col className="text-right"><Badge pill>{icon} {this.props.value } {this.props.unit }</Badge></Col>
    </Row>
  }
}

export default Fact;


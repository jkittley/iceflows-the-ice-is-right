import React from 'react';
import { Badge, UncontrolledTooltip } from 'reactstrap';
import { FaInfoCircle } from 'react-icons/fa';
import "./Fact.css";

class Fact extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    if (this.props.allowSelection && this.props.onSelect !== null && this.props.onSelect !== undefined) {
      this.props.onSelect({ ...this.props.fact });
    }
  }

  renderLarge() {
    var classNames = "fact large py-2"
    if (this.props.isHighlighted) classNames += " bg-dark text-white";
    return <div onClick={ this.onClick } className={classNames}>
      <div className="title">{ this.props.fact.title }</div>
      { this.props.fact.desc && <div className="desc">{ this.props.fact.desc }</div> }
      <Badge pill>{this.props.fact.value } {this.props.fact.unit }</Badge>
     </div>;
  }

  renderRow() {
    var classNames = "fact py-2"
    if (this.props.isHighlighted) classNames += " bg-dark text-white";
    return <div onClick={ this.onClick } className={classNames}>
      <div className="message">
        <h5>
          <span className="title">{this.props.fact.title }</span>{' '}
          { this.props.fact.desc && <button className="discrete" id={this.props.fact.id+"_tooltip_"+this.props.uid}><FaInfoCircle/></button> }
          { this.props.fact.desc && <UncontrolledTooltip placement="right" target={this.props.fact.id+"_tooltip_"+this.props.uid}>{ this.props.fact.desc }</UncontrolledTooltip> }
        </h5>
        <span className="units">{this.props.fact.unit }</span>
      </div>
      <div className="figure text-right">
        <Badge pill>{this.props.fact.value }</Badge>
      </div>
    </div>;
  }

  render() {
    if (this.props.large) return this.renderLarge();
    return this.renderRow();
  }


}

const uuidv4 = require('uuid/v4');
Fact.defaultProps = {
  uid: uuidv4(),
  isHighlighted: false,
  allowSelection: false,
  onSelect: null,
}

export default Fact;



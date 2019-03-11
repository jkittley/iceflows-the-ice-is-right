import React from 'react';
import Fact from './Fact'
import "./FactList.css";

class FactList extends React.Component {

  constructor(props) {
    super(props);
  }
  
  render() {
    return <div className="fact-list">
    { this.props.facts.filter((f) => this.props.settings.showFacts.indexOf(f.id) >= 0).map( (x,i) => (
        <Fact 
          key={i} {...x} 
          cardId={this.props.id}
          isSelected={this.props.highlightFact === x.title} 
          onClick={this.props.factSelected} 
        />
    ))}
    </div>;
  }
}

export default FactList;


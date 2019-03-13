import React from 'react';
import Fact from './Fact'
import "./FactList.css";

class FactList extends React.Component {
  
  render() {
    return <div className="fact-list">
    { this.props.facts.filter((f) => this.props.settings.showFacts.indexOf(f.id) >= 0).map( (x,i) => (
        <Fact 
          key={i} 
          uid={this.props.uid}
          {...x} 
          isSelected={this.props.highlightFact === x.title} 
          onClick={this.props.factSelected} 
        />
    ))}
    </div>;
  }
}

export default FactList;


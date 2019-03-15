import React from 'react';
import { connect } from 'react-redux'

import Fact from './Fact'
import "./FactList.css";

class FactList extends React.Component {

  filterFunction(a) {
    var selectedFactIds = this.props.factsMeta.filter(f => f.selected).flatMap(f => [f.id]);
    return selectedFactIds.indexOf(a.id) >= 0;
  }

  render() {
    var facts = this.props.facts.filter(this.filterFunction.bind(this));
    // No facts
    if (facts.length === 0) return <h5 className="p-2 text-center">No facts selected - Click the cog in the top right to choose.</h5>;
    // Show Facts
    return <div className="fact-list">
    { facts.map( (x, i) => (
       <Fact 
        key={i} 
        fact={x} 
        large={facts.length===1}
        { ...this.props }
        isHighlighted={ this.props.highlightFact === x.id } />
    ))}
    </div>;
  }
}

const mapStateToProps = state => { return { 
  factsMeta: state.cards.factsMeta
}};
const mapDispatchToProps = { };
export default connect(mapStateToProps, mapDispatchToProps)(FactList);



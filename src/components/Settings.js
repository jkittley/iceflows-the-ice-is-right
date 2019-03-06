
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Col, Label, Input } from 'reactstrap';
import { FaCog } from 'react-icons/fa';
import './Settings.css';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      showFacts: props.showFacts
    };
    this.toggle.bind(this);
    this.save.bind(this);
    this.selectFact.bind(this)
  }

  toggle() {
    this.setState({ 
      visible: !this.state.visible,
      showFacts: this.props.showFacts
    });
  }

  save() {
    this.toggle();
    if (this.props.onSave) this.props.onSave({
      showFacts: this.state.showFacts
    });
  }

  selectFact(fact, checked) {
    if (checked) {
      this.setState({ showFacts: [ ...this.state.showFacts, fact.id ]})
    } else {
      this.setState({ showFacts: this.state.showFacts.filter((f) => f !== fact.id) })
    }
  }

  render() {
    if (!this.state.visible) {
      return <div className="settingsPane"><Button size="lg" color="warning" onClick={ () => this.toggle() }><FaCog/></Button></div>
    } else {
      return <Modal isOpen={this.state.visible}>
      <ModalHeader toggle={ () => this.toggle() }>Settings</ModalHeader>
      <ModalBody>
      <h5>Show Facts</h5>  
      { Object.keys(this.props.factMeta).map(function(key, i) {
        var meta = this.props.factMeta[key];
        var selected = this.props.showFacts.indexOf(meta.id) >= 0; 
        return (
          <Col key={i} sm={{ size: 10 }}>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" defaultChecked={selected} onChange={ (e) => this.selectFact(meta, e.target.checked) } />{' '} {meta.title}
              </Label>
            </FormGroup>
          </Col>);
        }.bind(this))
      }

      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={ () => this.save() }>Save</Button>{' '}
      </ModalFooter>
      </Modal>;
    }
  }
}

export default Settings;

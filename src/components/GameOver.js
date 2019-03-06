
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class GameOver extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return <Modal isOpen={this.props.show}>
    <ModalHeader toggle={this.toggle}>Game Over</ModalHeader>
    <ModalBody>
      You are out of cards.
    </ModalBody>
    <ModalFooter>
      <Button color="primary" onClick={ () => this.props.playAgain() }>Play Again?</Button>{' '}
    </ModalFooter>
    </Modal>;
  }
}

export default GameOver;

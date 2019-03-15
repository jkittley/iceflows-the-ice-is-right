import React from 'react';
import { connect } from 'react-redux'

import { Container, Jumbotron, Button } from 'reactstrap';
import { goHome } from '../redux/actions';
import LogoHeader from './LogoHeader';

class ErrorMessage extends React.Component {

  constructor(props) {
    super(props);
    this.goHome = this.goHome.bind(this);
  }

  goHome() {
    setTimeout(this.props.goHome, 500);
  }

  render() {
    return <Container> 
      <LogoHeader />
      <Jumbotron>
        <h1 className="display-4">Something went wrong :(</h1>
        { this.props.message && <p className="lead">{ this.props.message }</p> }
        <p className="lead">
          <Button color="primary" onClick={ this.goHome }>Back Home</Button>
        </p>
      </Jumbotron> 
      </Container>;
  }

}

ErrorMessage.defaultProps = {
  message: null,
}

const mapDispatchToProps = { goHome }
export default connect(null, mapDispatchToProps)(ErrorMessage);


import React from 'react';
import head from '../res/head.png';
import {Container} from 'reactstrap';
import "./LogoHeader.css";

const LogoHeader = props => (<Container className={ "logo " + props.size }>
<img src={head} alt="The Ice Is Right - An Ice Flows Game"/>
</Container>)

LogoHeader.defaultProps = {
  size: ""
}

export default LogoHeader
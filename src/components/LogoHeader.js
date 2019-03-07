import React from 'react';
import head from '../res/head.png';
import {Container} from 'reactstrap';
import "./LogoHeader.css";

const LogoHeader = props => (<Container className="logo">
<img src={head} alt="The Ice Is Right - An Ice Flows Game"/>
</Container>)

export default LogoHeader
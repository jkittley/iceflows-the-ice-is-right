import React from 'react';
import { Container } from 'reactstrap';
import { FaDesktop } from 'react-icons/fa';

const ScreenTooSmall = props => <Container className="text-center mt-4 pt-4">
 <h1 className="display-4"><FaDesktop/></h1> 
 <h2>Screen Too Small.</h2>
 <h5>Must be at least 800x600</h5>
</Container>;

export default ScreenTooSmall
import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <Navbar>
      <Container>
        <Link to="/list" className='navbar-brand'>Users List</Link>
      </Container>
    </Navbar>
  )
}

export default Nav

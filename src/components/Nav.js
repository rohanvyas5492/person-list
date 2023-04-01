import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <Navbar>
      <Container>
        <Link to="/" className='navbar-brand'>Person List</Link>
      </Container>
    </Navbar>
  )
}

export default Nav

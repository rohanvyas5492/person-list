import React from 'react'
import { Col, Container, Row,Breadcrumb } from 'react-bootstrap'
import FormPage from '../components/FormPage'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='wrapper'>
      <Container>
        <Row>
          <Col md={12}>
          <Breadcrumb>
           <Link to="/">Form Page</Link>
          <Link to ="/list">Person List Page</Link>
          </Breadcrumb>
          </Col>
          <Col>
            <FormPage />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Home

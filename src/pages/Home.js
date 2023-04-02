import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import FormPage from '../components/FormPage'
import Breadcrumbs from '../components/Breadcrumbs'

const Home = () => {
  return (
    <div className='wrapper'>
      <Container>
        <Row>
          <Col md={12}>
          <Breadcrumbs />
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

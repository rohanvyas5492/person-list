import React from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb } from 'react-bootstrap'

const Breadcrumbs = () => {
  return (
    <Breadcrumb>
           <Link to="/">User Form Page</Link>
          <Link to ="/list">Users List Page</Link>
          </Breadcrumb>
  )
}

export default Breadcrumbs

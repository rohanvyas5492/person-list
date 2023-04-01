import { Col, Container, Row,Breadcrumb } from "react-bootstrap"
import PersonList from "../components/PersonList"
import {  useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import {FaPlus} from 'react-icons/fa'
import { clearFields } from "../features/usersSlice"

const List = () => {
  const {users} = useSelector((store=>store.users))
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const addNew = ()=>{
    dispatch(clearFields())
    navigate('/');
  }

  return (
    <div className="wrapper">
        <Container>
        <Row>
          <Col md={12}>
          <Breadcrumb>
           <Link to="/">Form Page</Link>
          <Link to ="/list">Person List Page</Link>
          </Breadcrumb>
          </Col>
          <Col md={12}>
            <div className="add_user-section">
              <button className="add-btn" onClick={()=>addNew()}><FaPlus /> Add user</button>
            </div>
          </Col>
        </Row>
          <Row>
              {users.map((user)=>{
                return <Col lg={3} md={6} key={user.id}><PersonList {...user} /></Col>
              })}
          </Row>
        </Container>
    </div>
  )
}

export default List

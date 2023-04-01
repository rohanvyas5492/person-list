import {MdEmail} from 'react-icons/md'
import {IoCall} from 'react-icons/io5'
import {HiUser} from 'react-icons/hi'
import {BsFillCalendar2DateFill} from 'react-icons/bs'
import {FiEdit} from 'react-icons/fi'
import { useDispatch } from "react-redux"
import { editUser } from "../features/usersSlice"
import { useNavigate } from "react-router-dom"

const PersonList = ({id,firstName,lastName,gender,email,phone,image,birthDate}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const editUserDetails = ()=>{
    dispatch(editUser(id))
    navigate('/')
  }
  return (
    <div className="card">
      <img className="card-img-top" src={image} alt={firstName} />
      <div className="card-body">
        <div className="card-title h5" onClick={()=>editUserDetails()}>{firstName+' '+lastName}</div>
        <div className="card-text"><MdEmail /><span>{email}</span></div>
        <div className="card-text"><IoCall /><span>{phone}</span></div>
        <div className="card-text"><HiUser /><span>{gender}</span></div>
        <div className="card-text"><BsFillCalendar2DateFill /><span>{birthDate}</span></div>
      </div>
      <button className="edit-btn" onClick={()=>editUserDetails()}><FiEdit /></button>
    </div>
  )
}

export default PersonList

import React, { useRef } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { setFirstName,setLastName,setEmail,setPhone,setGender,setDob,setImage,editUser,addUser, addNewUser, editNewUser, clearFields } from '../features/usersSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const FormPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { firstName,lastName,email, phone, gender, dob,isEditing ,imageUrl,singleUser} = useSelector((store) =>store.users );
  const fileInputRef = useRef(null);

  const validateEmail = (url) => {
  const v = /\S+@\S+\.\S+/;
  return v.test(url);
};
  const submitForm = ()=>{
    if(!firstName || !lastName || !email ||!phone || !dob  ){
        toast.error('Please fill out all the fields')
        return
      }else if(!validateEmail(email)){
        toast.error('Email is invalid')
        return
      }else if(gender === ''){
        toast.error('Gender is required')
        return
      }else if(imageUrl === ''){
        toast.error('Profile Pic is required')
        return
      }else{
        const formData = new FormData();
        formData.append('firstName',firstName);
        formData.append('lastName',lastName);
        formData.append('email',email);
        formData.append('phone',phone);
        formData.append('gender',gender);
        formData.append('birthDate',dob);
        formData.append('image',imageUrl);
        if(isEditing){
        dispatch(editUser())
        const userId = singleUser[0].id;
        dispatch(editNewUser({formData:formData,id:userId})).then(() => {
          navigate('/list');
        });
        dispatch(clearFields());
        fileInputRef.current.value = null;
        }else if(!isEditing){
          const newUser = [firstName,lastName,email,phone,gender,dob,imageUrl];
          dispatch(addUser(newUser));
          dispatch(addNewUser(formData)).then(() => {
            navigate('/list');
          });
          fileInputRef.current.value = null;
        }
      }
  }
  const uploadImage = (data)=>{
   dispatch(setImage(data))
  }
  
  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="firstname">First Name</Form.Label>
        <Form.Control
        type="text"
        name={firstName}
        id={firstName}
        onChange={(e)=>dispatch(setFirstName(e.target.value))}
        value={firstName}
        />

      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="lastname">Last Name</Form.Label>
        <Form.Control
        type="text"
        name={lastName}
        id={lastName}
        value={lastName}
        onChange={(e)=>dispatch(setLastName(e.target.value))}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="email">Email</Form.Label>
        <Form.Control
        type="email"
        name={email}
        id={email}
        value={email}
        onChange={(e)=>dispatch(setEmail(e.target.value))}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="phone">Phone</Form.Label>
        <Form.Control
        type="tel"
        name={phone}
        id={phone}
        value={phone}
        onChange={(e)=>dispatch(setPhone(e.target.value))}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="phone">Gender</Form.Label>
        <Form.Check 
            type='radio'
            id='gender'
            label='Male'
            value='male'
            name='gender'
            onChange={(e)=>dispatch(setGender(e.target.value))}
            checked={gender === 'male'}
          />
          <Form.Check 
            type='radio'
            id='gender'
            label='Female'
            value='female'
            name='gender'
            onChange={(e)=>dispatch(setGender(e.target.value))}
            checked={gender === 'female'}
          />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="phone">Date Of Birth</Form.Label>
        <Form.Control
        type="date"
        name={dob}
        id={dob}
        value={dob}
        onChange={(e)=>dispatch(setDob(e.target.value))}
        />
      </Form.Group>
      <Form.Group className="mb-3">
      <div className={imageUrl ? 'user-image-preview' : 'user-image-preview d-none'}>
        <img src={imageUrl} alt='preview' />
      </div>
        <Form.Control
        type="file"
        name='profile-pic'
        id='profile-pic'
        onChange={(e)=>uploadImage(e.target.files[0])}
        ref={fileInputRef}
        />
      </Form.Group>

      <Button variant="primary" type="button" onClick={()=>submitForm()}>
        {isEditing? 'Edit User' : 'Add User'}
      </Button>
    </Form>
  )
}

export default FormPage

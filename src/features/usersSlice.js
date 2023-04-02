import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
    users:[],
    isLoading:false,
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
    gender:'',
    dob:'',
    error:'',
    successMessage:'',
    isEditing:false,
    singleUser:[],
    imageUrl:'',
    uploadedFile:'',
    newUser:[]
}  

export const getUsers = createAsyncThunk('users/getUsers',async()=>{
    const response = await axios.get('https://dummyjson.com/users'); 
    return response?.data;
})
export const addNewUser = createAsyncThunk('users/addtData', async (formData, thunkAPI) => {
  try {
    const response = await axios.post('https://dummyjson.com/users/add', formData, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
export const editNewUser = createAsyncThunk('users/postData', async ({formData,id}, thunkAPI) => {
  try {
    const response = await axios.put(`https://dummyjson.com/users/${id}`, formData, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
    setFirstName(state, action) {
      state.firstName = action.payload;
    },
    setLastName(state, action) {
      state.lastName = action.payload;
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
    setPhone(state, action) {
      state.phone = action.payload;
    },
    setGender(state, action) {
      state.gender = action.payload;
    },
    setDob(state, action) {
      state.dob = action.payload;
    },
    editUser(state,action){
        state.isEditing = true
        const user = state.users.filter((u)=>{
            return u.id === action.payload
        })
        state.singleUser = user;
        if(user){
            user.map((u)=>{
                state.firstName = u.firstName;
                state.lastName = u.lastName;
                state.email = u.email;
                state.phone = u.phone;
                state.gender = u.gender;
                state.dob = u.birthDate;
                state.imageUrl = u.image;
            })  
        }
    },
    setImage(state,action){
        const { name, size, type, imageUrl } = action.payload;
        state.imageUrl = imageUrl
        state.uploadedFile = { name, size, type };
    },
    addUser(state,action){
        // console.log(action.payload);
        state.newUser = action.payload
    },
    clearFields(state){
      state.firstName = '';
      state.lastName = '';
      state.email = '';
      state.phone = '';
      state.gender = '';
      state.dob = '';
      state.imageUrl = '';
      state.newUser = [];
      state.singleUser = [];
      state.isEditing = false;
    }
    },
extraReducers: (builder) => {
  builder
    .addCase(getUsers.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload.users;
    })
    .addCase(getUsers.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(addNewUser.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(addNewUser.fulfilled, (state, action) => {
      state.isLoading = false;
      // console.log(action.payload)
      state.users.push(action.payload)
      toast.success('User Added')
      state.firstName = '';
      state.lastName = '';
      state.email = '';
      state.phone = '';
      state.gender = '';
      state.dob = '';
      state.imageUrl = '';
      state.newUser = []
    })
    .addCase(addNewUser.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(editNewUser.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(editNewUser.fulfilled, (state, action) => {
      const updatedUser = action.payload
      // console.log(action.payload)
      const index = state.users.findIndex(user => user.id === updatedUser.id);
      state.users[index] = updatedUser;
      toast.success('User Edited');
    })
    .addCase(editNewUser.rejected, (state) => {
      state.isLoading = false;
    });
}
})
export const {setFirstName,setLastName,setEmail,setPhone,setGender,setDob,setImage,setError,setSuccessMessage,editUser,isEditing,handleSubmit,addUser,clearFields} = userSlice.actions
export default userSlice.reducer
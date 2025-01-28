import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useGetRolesQuery } from "../../../services/userApi";




export default function UserModal({openModal,userData,setUserData,users,setUsers,setOpenModal}){
    const {data:getRoles}=useGetRolesQuery({})
  
    const handleCloseModal = () => {
        setOpenModal(false);
      };
    
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({
          ...userData,
          [e.target.name]: e.target.value,
        });
      };

    
      const handleSaveUser = async() => {
       const response= await axios.post("http://localhost:8000/api/user",userData)
       console.log(response)
       
        setUsers([
          ...users,
          {
            username: userData.username,
            email: userData.email,
            password: userData.password,
            role: userData.role,
          },
        ]);
        setOpenModal(false); 
      };

console.log(userData)
     
        const handleChange = (event: SelectChangeEvent) => {
            setUserData({...userData,role:event.target.value as string});
          };
    
    return(
        <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>{userData?.username ? 'Edit User' : 'Add User'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Username"
            name="username"
            value={userData?.username}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={userData?.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            name="password"
            value={userData?.password}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            type="password"
          />
          <Select
            label="Role"
            name="role"
            value={userData?.role}
            onChange={handleChange}
            fullWidth
        >
   { getRoles?.roles.map((role:any)=><MenuItem value={role?._id} >{role?.name}</MenuItem>)}
</Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveUser} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    )
}
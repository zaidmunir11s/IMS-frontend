import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";




export default function UserModal({openModal,handleCloseModal,userData,setUserData,users,setUsers,setOpenModal}){
  
    const handleCloseModal = () => {
        setOpenModal(false);
      };
    
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({
          ...userData,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleSaveUser = () => {
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
    return(
        <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>{userData.username ? 'Edit User' : 'Add User'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Username"
            name="username"
            value={userData.username}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            type="password"
          />
          <TextField
            label="Role"
            name="role"
            value={userData.role}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
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
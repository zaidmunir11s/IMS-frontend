import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { useCreateUserMutation, useGetRolesQuery, useUpdateUserMutation } from "../../../services/userApi";




export default function UserModal({openModal,userData,setUserData,users,setUsers,setOpenModal}){
    const {data:getRoles}=useGetRolesQuery({})
    const [createUser]=useCreateUserMutation()
    const [updateUser]=useUpdateUserMutation()
  
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
     if(   !userData?.id)
       await createUser( userData)
      else{
      
      await updateUser(userData)}
       
       
        setOpenModal(false); 
      };

     
        const handleChange = (event: SelectChangeEvent) => {
            setUserData({...userData,role:event.target.value as string});
          };
    
    return(
        <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>{userData?.id ? 'Edit User' : 'Add User'}</DialogTitle>
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
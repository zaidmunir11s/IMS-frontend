import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import axios from "axios";




export default function UserModal({openModal,productCategoryData,setProductCategoryData,productCategories,setProductCategories,setOpenModal}){
  
    const handleCloseModal = () => {
        setOpenModal(false);
      };
    
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProductCategoryData({
          ...productCategoryData,
          [e.target.name]: e.target.value,
        });
      };

     
    
      const handleSaveUser = async() => {
       const response= await axios.post("http://localhost:8000/api/product/category/create",productCategoryData)
       console.log(response)
       
        setProductCategories([
          ...productCategories,
          {
            
            name: productCategoryData?.name,
          },
        ]);
        setOpenModal(false); 
      };

     
       
    
    return(
        <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>{productCategoryData?.name ? 'Edit User' : 'Add User'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            name="name"
            value={productCategoryData?.name}
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
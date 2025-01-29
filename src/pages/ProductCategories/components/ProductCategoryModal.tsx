import { Button, Dialog, DialogActions, DialogContent, DialogTitle,  TextField } from "@mui/material";
import axios from "axios";
import { useCreateProductCategoryMutation, useUpdateProductCategoryMutation } from "../../../services/productApi";


type ProductCategoriesModalProps={
  openModal:boolean,
  productCategoryData:any,
  setProductCategoryData:any,
  productCategories:any,
  setProductCategories:any,
  setOpenModal:any

}


export default function ProductCategoriesModal({openModal,productCategoryData,setProductCategoryData,productCategories,setProductCategories,setOpenModal}:ProductCategoriesModalProps){

  const [createProduct]=useCreateProductCategoryMutation()
  const [updateProduct]=useUpdateProductCategoryMutation()
  
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
        if(!productCategoryData?.id)
     await createProduct(productCategoryData)
    else
    await updateProduct(productCategoryData)
        
      
       
        
        setOpenModal(false); 
      };

     
       
    
    return(
        <Dialog open={openModal} onClose={handleCloseModal} fullWidth>
        <DialogTitle>{'Add Product Category'}</DialogTitle>
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
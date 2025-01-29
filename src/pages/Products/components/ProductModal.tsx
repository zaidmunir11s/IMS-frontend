import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import axios from "axios";
import { useCreateProductMutation, useGetProductCategoriesQuery } from "../../../services/productApi";

type ProductModalProps={
  openModal:boolean,
  productData:any,
  setProductData:any,
  products:any,
  setProducts:any,
  setOpenModal:any

}


export default function ProductModal({openModal,productData,setProductData,products,setProducts,setOpenModal}:ProductModalProps){

  const {data:getProductCategories}=useGetProductCategoriesQuery({})
  const [createProduct]=useCreateProductMutation()
   
  
    const handleCloseModal = () => {
        setOpenModal(false);
      };
    
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProductData({
          ...productData,
          [e.target.name]: e.target.value,
        });
      };

      // useEffect(()=>{
      // fetchRoles()
      // },[])


      // const fetchRoles=async ()=>{
      //   const response= await axios.get("http://localhost:8000/api/user/roles")
      //   setRoles(response?.data?.roles)
      // }
    
      const handleSaveUser = async() => {
        const response= await createProduct(productData)
     
       
       
        
        setOpenModal(false); 
      };


      const handleChange = (event: SelectChangeEvent) => {
        setProductData({...productData,category:event.target.value as string});
      };
      
    
    return(
        <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle> Add Product</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            name="name"
            value={productData?.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            value={productData?.description}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Price"
            name="price"
            value={productData?.price}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          
          />
            <TextField
            label="Quantity"
            name="quantity"
            value={productData?.quantity}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          
          />
          <Select
            label="Category"
            name="category"
            value={productData?.category}
            onChange={handleChange}
            fullWidth
        >
   { getProductCategories?.map((category:any)=><MenuItem value={category?._id} >{category?.name}</MenuItem>)}
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
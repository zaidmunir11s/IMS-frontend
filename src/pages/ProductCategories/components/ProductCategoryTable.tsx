import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { useState ,useEffect} from 'react';
import axios from 'axios';
import UserModal from './ProductCategoryModal';

interface Column {
  id: 'name';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Name', minWidth: 170 },
 
];

interface ProductCategoryData {
name:string
}

function createData(
  name: string,
 
): ProductCategoryData {
  return { name };
}

const initialProductCategories = [
  createData('johndoe'),
  createData('janedoe'),
  createData('alice'),
  createData('bob'),
  createData('charlie'),
];
 function ProductCategoryTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openModal, setOpenModal] = useState(false);
  const [productCategoryData, setProductCategoryData] = useState({
  name:''
  });
  const [productCategories, setProductCategories] = useState(initialProductCategories);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };


  useEffect(()=>{
fetchUsers()
  },[])

  const fetchUsers=async ()=>{
    const response=await axios.get("http://localhost:8000/api/product/categories")
    console.log(response)
    if(response?.data){
      setProductCategoryData(response?.data)
      setProductCategories(response?.data.map((productCategory:any)=>createData(productCategory?.name,)))

  }}

  const handleChangeRowsPerPage = (event:any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenModal = () => {
    setProductCategoryData({
      name:''
    });
    setOpenModal(true);
  };

 

  const handleEditUser = (productCategory: ProductCategoryData) => {
    setProductCategoryData({
      
     name:productCategory?.name
    });
    setOpenModal(true);
  };

  const handleDeleteUser = (productCategory: ProductCategoryData) => {
    setProductCategories(productCategories.filter((p) => p.name !== productCategory.name));
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Button
        variant="contained"
        color="primary"
        sx={{ margin: 2 }}
        onClick={handleOpenModal}
      >
        Add Product Category
      </Button>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {productCategories
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((productCategory) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={productCategory.name}>
                  {columns.map((column) => {
                    const value = productCategory[column?.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === 'actions' ? (
                          <>
                            <IconButton
                              color="primary"
                              onClick={() => handleEditUser(productCategory)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              color="secondary"
                              onClick={() => handleDeleteUser(productCategory)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </>
                        ) : (
                          value
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={productCategories.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
  
     <UserModal openModal={openModal} setOpenModal={setOpenModal} productCategories={productCategories} setProductCategoryData={setProductCategoryData} productCategoryData={productCategoryData} setProductCategories={setProductCategories}/>
    </Paper>
  );
}

export default ProductCategoryTable;

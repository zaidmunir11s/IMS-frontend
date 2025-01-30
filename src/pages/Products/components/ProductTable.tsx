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
import { useState, useEffect } from 'react';
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from '../../../services/productApi';
import ProductModal from './ProductModal';
import toast from 'react-hot-toast';

interface Column {
  id: 'name' | 'description' | 'price' | 'quantity' | 'category' | 'actions';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'description', label: 'Description', minWidth: 200 },
  { id: 'price', label: 'Price', minWidth: 170 },
  { id: 'quantity', label: 'Quantity', minWidth: 170 },
  { id: 'category', label: 'Category', minWidth: 170 },
  { id: 'actions', label: 'Actions', minWidth: 150 },
];

interface ProductData {
  id: string;
  name: string;
  description: string;
  price: string;
  quantity: string;
  category: string;
}

function createData(
  id: string,
  name: string,
  description: string,
  price: string,
  quantity: string,
  category: string,
): ProductData {
  return { id, name, description, price, quantity, category };
}

function ProductTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { data: getProducts } = useGetProductsQuery({});
  const [deleteProduct] = useDeleteProductMutation();

  const [openModal, setOpenModal] = useState(false);
  const [productData, setProductData] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    quantity: '',
    category: '',
  });
  const [products, setProducts] = useState(
    getProducts?.map((product: any) =>
      createData(
        product?._id,
        product?.name,
        product?.description,
        product?.price,
        product.quantity,
        product?.category?.name,
      ),
    ),
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    setProducts(
      getProducts?.map((product: any) =>
        createData(
          product?._id,
          product?.name,
          product?.description,
          product?.price,
          product.quantity,
          product?.category?.name,
        ),
      ),
    );
  }, [getProducts]);

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenModal = () => {
    setProductData({
      id: '',
      name: '',
      description: '',
      price: '',
      quantity: '',
      category: '',
    });
    setOpenModal(true);
  };

  const handleEditUser = (product: ProductData) => {
    setProductData({
      id: product?.id,
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      category: product.category,
    });
    setOpenModal(true);
  };

  const handleDeleteUser = async (product: ProductData) => {
    const response = await deleteProduct(product?.id);
    if (response?.data?.success) toast.success(response?.data?.message);
    else toast.error(response?.data?.message);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Button
        variant="contained"
        color="primary"
        sx={{ margin: 2 }}
        onClick={handleOpenModal}
      >
        Add Product
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
            {products
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product: any) => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={product.username}
                >
                  {columns.map((column) => {
                    const value = product[column?.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === 'actions' ? (
                          <>
                            <IconButton
                              color="primary"
                              onClick={() => handleEditUser(product)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              color="secondary"
                              onClick={() => handleDeleteUser(product)}
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
        count={products?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <ProductModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        products={products}
        setProductData={setProductData}
        productData={productData}
        setProducts={setProducts}
      />
    </Paper>
  );
}

export default ProductTable;

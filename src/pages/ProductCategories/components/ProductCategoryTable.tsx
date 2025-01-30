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
  useDeleteProductCategoryMutation,
  useGetProductCategoriesQuery,
} from '../../../services/productApi';
import ProductCategoriesModal from './ProductCategoryModal';
import toast from 'react-hot-toast';

interface Column {
  id: 'name' | 'actions';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'actions', label: 'Actions', minWidth: 150 },
];

interface ProductCategoryData {
  id: string;
  name: string;
}

function createData(id: string, name: string): ProductCategoryData {
  return { id, name };
}

function ProductCategoryTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { data: getProductCategories } = useGetProductCategoriesQuery({});
  const [deleteProductCtegory] = useDeleteProductCategoryMutation();

  const [openModal, setOpenModal] = useState(false);
  const [productCategoryData, setProductCategoryData] = useState({
    id: '',
    name: '',
  });
  const [productCategories, setProductCategories] = useState(
    getProductCategories?.map((productCategory: any) =>
      createData(productCategory?._id, productCategory?.name),
    ),
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    setProductCategories(
      getProductCategories?.map((productCategory: any) =>
        createData(productCategory?._id, productCategory?.name),
      ),
    );
  }, [getProductCategories]);

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenModal = () => {
    setProductCategoryData({
      id: '',
      name: '',
    });
    setOpenModal(true);
  };

  const handleEditUser = (productCategory: ProductCategoryData) => {
    setProductCategoryData({
      id: productCategory?.id,
      name: productCategory?.name,
    });
    setOpenModal(true);
  };

  const handleDeleteUser = async (productCategory: ProductCategoryData) => {
    {
      const response: any = await deleteProductCtegory(productCategory?.id);
      if (response?.data?.success) toast.success(response?.data?.message);
      else toast.error(response?.data?.message);
    }
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
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((productCategory: any) => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={productCategory.name}
                >
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
        count={productCategories?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <ProductCategoriesModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        productCategories={productCategories}
        setProductCategoryData={setProductCategoryData}
        productCategoryData={productCategoryData}
        setProductCategories={setProductCategories}
      />
    </Paper>
  );
}

export default ProductCategoryTable;

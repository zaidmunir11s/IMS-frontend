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
import UserModal from './ProductModal';

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
  name: string;
  description: string;
  price: string;
  quantity: string;
  category:string
}

function createData(
  name: string,
  description: string,
  price: string,
  quantity: string,
  category:string

): ProductData {
  return { name, description, price, quantity,category };
}

const initialUsers = [
  createData('johndoe', 'john@example.com', 'password123', 'admin'),
  createData('janedoe', 'jane@example.com', 'password456', 'user'),
  createData('alice', 'alice@example.com', 'password789', 'user'),
  createData('bob', 'bob@example.com', 'password321', 'moderator'),
  createData('charlie', 'charlie@example.com', 'password654', 'admin'),
];

 function UserTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openModal, setOpenModal] = useState(false);
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
  });
  const [users, setUsers] = useState(initialUsers);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };


  useEffect(()=>{
fetchUsers()
  },[])

  const fetchUsers=async ()=>{
    const response=await axios.get("http://localhost:8000/api/user/")
    console.log(response?.data)
    if(response?.data){
      setUserData(response?.data)
      setUsers(response?.data.map((user:any)=>createData(user?.username,user?.email,user?.password,user.role?.name)))

  }
}

  const handleChangeRowsPerPage = (event:any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenModal = () => {
    setUserData({
      username: '',
      email: '',
      password: '',
      role: '',
    });
    setOpenModal(true);
  };

 

  const handleEditUser = (user: UserData) => {
    setUserData({
      
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role,
    });
    setOpenModal(true);
  };

  const handleDeleteUser = (user: UserData) => {
    setUsers(users.filter((u) => u.username !== user.username));
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Button
        variant="contained"
        color="primary"
        sx={{ margin: 2 }}
        onClick={handleOpenModal}
      >
        Add User
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
            {users
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={user.username}>
                  {columns.map((column) => {
                    const value = user[column?.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === 'actions' ? (
                          <>
                            <IconButton
                              color="primary"
                              onClick={() => handleEditUser(user)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              color="secondary"
                              onClick={() => handleDeleteUser(user)}
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
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
  
     <UserModal openModal={openModal} setOpenModal={setOpenModal} users={users} setUserData={setUserData} userData={userData} setUsers={setUsers}/>
    </Paper>
  );
}

export default UserTable;

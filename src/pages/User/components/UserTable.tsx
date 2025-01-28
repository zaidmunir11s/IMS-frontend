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
import UserModal from './UserModal';
import { useGetUsersQuery } from '../../../services/userApi';

interface Column {
  id: 'username' | 'email' | 'password' | 'role' | 'actions';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'username', label: 'Username', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 200 },
  { id: 'password', label: 'Password', minWidth: 170 },
  { id: 'role', label: 'Role', minWidth: 170 },
  { id: 'actions', label: 'Actions', minWidth: 150 },
];

interface UserData {
  username: string;
  email: string;
  password: string;
  role: string;
}

function createData(
  username: string,
  email: string,
  password: string,
  role: string,
): UserData {
  return { username, email, password, role };
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
  const {data:getUsers}=useGetUsersQuery({})

  const [openModal, setOpenModal] = useState(false);
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
  });
  const [users, setUsers] = useState(getUsers?.map((user:any)=>createData(user?.username,user?.email,user?.password,user.role?.name)));

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };



useEffect(()=>{
      setUsers(getUsers?.map((user:any)=>createData(user?.username,user?.email,user?.password,user.role?.name)))
},[getUsers])

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
              .map((user:any) => (
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
        count={users?.length}
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

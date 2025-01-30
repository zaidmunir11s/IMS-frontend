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
import UserModal from './UserModal';
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from '../../../services/userApi';
import toast from 'react-hot-toast';

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
  id: string;
  username: string;
  email: string;
  password: string;
  role: string;
}

function createData(
  id: string,
  username: string,
  email: string,
  password: string,
  role: string,
): UserData {
  return { id, username, email, password, role };
}

function UserTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { data: getUsers } = useGetUsersQuery({});
  const [deleteUser] = useDeleteUserMutation();

  const [openModal, setOpenModal] = useState(false);
  const [userData, setUserData] = useState({
    id: '',
    username: '',
    email: '',
    password: '',
    role: '',
  });
  const [users, setUsers] = useState(
    getUsers?.map((user: any) =>
      createData(
        user?._id,
        user?.username,
        user?.email,
        user?.password,
        user.role?.name,
      ),
    ),
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    setUsers(
      getUsers?.map((user: any) =>
        createData(
          user?._id,
          user?.username,
          user?.email,
          user?.password,
          user.role?.name,
        ),
      ),
    );
  }, [getUsers]);

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenModal = () => {
    setUserData({
      id: '',
      username: '',
      email: '',
      password: '',
      role: '',
    });
    setOpenModal(true);
  };

  const handleEditUser = (user: UserData) => {
    setUserData({
      id: user?.id,
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role,
    });
    setOpenModal(true);
  };

  const handleDeleteUser = async (user: UserData) => {
    const response: any = await deleteUser(user?.id);
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
              .map((user: any) => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={user.username}
                >
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

      <UserModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        users={users}
        setUserData={setUserData}
        userData={userData}
        setUsers={setUsers}
      />
    </Paper>
  );
}

export default UserTable;

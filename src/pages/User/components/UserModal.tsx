import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import {
  useCreateUserMutation,
  useGetRolesQuery,
  useUpdateUserMutation,
} from '../../../services/userApi';
import toast from 'react-hot-toast';

export default function UserModal({
  openModal,
  userData,
  setUserData,
  users,
  setUsers,
  setOpenModal,
}: any) {
  const { data: getRoles } = useGetRolesQuery({});
  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveUser = async () => {
    if (!userData?.id) {
      const response: any = await createUser(userData);
      if (response?.data?.data) toast.success(response?.data?.message);
      else toast.error(response?.data?.message);
    } else {
      const response: any = await updateUser(userData);
      if (response?.data?.data) toast.success(response?.data?.message);
      else toast.error(response?.data?.message);
    }

    setOpenModal(false);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setUserData({ ...userData, role: event.target.value as string });
  };

  return (
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
          {getRoles?.roles.map((role: any) => (
            <MenuItem value={role?._id}>{role?.name}</MenuItem>
          ))}
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
  );
}

import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import UserTable from './components/UserTable';


const Users = () => {
  return (
    <>
      <Breadcrumb pageName="Users" />

      <div className="flex flex-col gap-10">
    
        <UserTable />
      </div>
    </>
  );
};

export default Users;

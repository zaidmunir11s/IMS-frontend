import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import UserTable from './components/UserTable';


const Tables = () => {
  return (
    <>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
    
        <UserTable />
      </div>
    </>
  );
};

export default Tables;

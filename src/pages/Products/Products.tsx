import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import ProductTable from './components/ProductTable';


const Products = () => {
  return (
    <>
      <Breadcrumb pageName="Products" />

      <div className="flex flex-col gap-10">
    
        <ProductTable />
      </div>
    </>
  );
};

export default Products;

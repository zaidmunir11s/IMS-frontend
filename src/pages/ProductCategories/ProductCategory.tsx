import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import ProductCategoryTable from './components/ProductCategoryTable';


const ProductCategories = () => {
  return (
    <>
      <Breadcrumb pageName="Product Categories" />

      <div className="flex flex-col gap-10">
    
        <ProductCategoryTable />
      </div>
    </>
  );
};

export default ProductCategories;

import { useEffect, useMemo, useState } from "react";
import ProductGrid from "../../components/product-grid";
import Dropdown from "../../components/dropdown";
import accObj from "./accordionItems";
import FilterSection from "../../components/filter-section";
import { resetCollection } from "../../redux/slices/collectionsSlice";
import { resetGender } from "../../redux/slices/gendersSlice";
import { fetchProducts } from "../../redux/slices/productsSlice";
import { useAppDispatch, useAppSelector } from "../../hooks"; // Importing custom hooks

const options: string[] = [
  "Newest",
  "Best rating",
  "Most popular",
  "Price: Low to High",
  "Price: High to Low",
];

function ProductListingPage() {
  const dispatch = useAppDispatch();
  const selectedGenders = useAppSelector((state) => state.genders.selectedGenders);
  const selectedCollections = useAppSelector((state) => state.collections.selectedCollections);

  const { data: fetchedProductsData } = useAppSelector((state) => state.products);

  const products = fetchedProductsData?.data || [];

  const [open, setOpen] = useState<boolean>(false);
  const [selectedDropdown, setSelectedDropdown] = useState<string>("Sort by");

  const handleDropdownClick = () => {
    setOpen(!open);
  };

  const handleDropdownValue = (opt: string) => {
    setSelectedDropdown(opt);
  };

  useEffect(() => {
    return () => {
      if (window.location.pathname !== "/product-listing-page") {
        dispatch(resetCollection());
        dispatch(resetGender());
      }
    };
  }, [dispatch]);

  const filters = useMemo(
    () => ({
      genders: selectedGenders,
      collections: selectedCollections,
    }),
    [selectedGenders, selectedCollections]
  );

  useEffect(() => {
    dispatch(
      fetchProducts({
        collection: filters.collections[0],
        page: 1,
        per_page: 9,
      })
    );
  }, [dispatch, filters]);

  return (
    <div className="bg-white flex-1 flex gap-8 max-w-[1408px] self-stretch lg:p-24 max-md:p-4">
      <div className="w-[248px] pt-4 pr-4">
        <FilterSection data={accObj} />
      </div>
      <div className="flex flex-1 flex-col gap-8">
        <div className="flex justify-end">
          <Dropdown
            data={options}
            open={open}
            setOpen={handleDropdownClick}
            onChange={handleDropdownValue}
            titleClassName="shadow-md rounded-md font-medium text-sm py-2.5 px-4"
            optionsClassName="flex flex-col border-[1.5px] absolute w-[228px] top-11 bg-white max-h-60 overflow-y-auto rounded-md shadow-lg z-10"
          >
            {selectedDropdown}
          </Dropdown>
        </div>
        <ProductGrid products={products} />
      </div>
    </div>
  );
}

export default ProductListingPage;

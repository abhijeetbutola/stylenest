import { useEffect, useMemo, useState } from "react";
import ProductGrid from "../../components/product-grid";
import Dropdown from "../../components/dropdown";
import accObj from "./accordionItems";
import FilterSection from "../../components/filter-section";
import { resetCollection } from "../../redux/slices/collectionsSlice";
import { resetGender } from "../../redux/slices/gendersSlice";
import { fetchProducts } from "../../redux/slices/productsSlice";
import { useAppDispatch, useAppSelector } from "../../hooks"; // Importing custom hooks
import Button from "../../components/button";
import { ChevronLeft, ChevronRight} from "lucide-react";

const options: string[] = [
  "Newest",
  "Best rating",
  "Most popular",
  "Price: Low to High",
  "Price: High to Low",
];

type PaginationSchema = {
  has_more: boolean;
  page: number;
  per_page: number;
  total: number;
}

function ProductListingPage() {
  const dispatch = useAppDispatch();
  const selectedGenders = useAppSelector((state) => state.genders.selectedGenders);
  const selectedCollections = useAppSelector((state) => state.collections.selectedCollections);

  const { data: fetchedProductsData, status: fetchedProductsStatus, error: fetchedProductsError } = useAppSelector((state) => state.products);

  const products = fetchedProductsData?.data || [];

  const defaultPagination: PaginationSchema = {
    has_more: false,
    page: 1,
    per_page: 10,
    total: 0,
  };

  const paginationData: PaginationSchema = fetchedProductsData?.pagination || defaultPagination
  const totalPages = Math.ceil(paginationData.total / paginationData.per_page)
  
  const [open, setOpen] = useState<boolean>(false);
  const [selectedDropdown, setSelectedDropdown] = useState<string>("Sort by");
  const [page, setPage] = useState<number>(1)


  useEffect(() => {
    return () => {
      if (window.location.pathname !== "/product-listing-page") {
        dispatch(resetCollection());
        dispatch(resetGender());
      }
    };
  }, [dispatch]);

  const handleDropdownClick = () => {
    setOpen(!open);
  };

  const handleDropdownValue = (opt: string) => {
    setSelectedDropdown(opt);
  };

  const handlePageNumber = (value: number) => {
    
    if(value > totalPages) return
    
    dispatch(
      fetchProducts({
        collection: filters.collections[0],
        page: value,
        per_page: 9
      })
    )
    console.log(value);
    
    if(fetchedProductsStatus === "succeeded" && fetchedProductsError !== "failed") setPage(value)
  }

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
        <div className="flex justify-center items-center gap-3">
          {page > 1
           && <div className="flex justify-center items-center border-[1px] border-neutral-200 rounded py-3 px-[18px] bg-white hover:bg-opacity-50 hover:bg-indigo-200 text-sm transition-all">
                <ChevronLeft size={14} />
                <Button onClick={() => setPage((prev) => prev-1)}>Prev</Button>
              </div>
              }
          {products &&
            Array.from({ length: Math.ceil(paginationData.total / paginationData.per_page) }, (_, index) => {
              return (
                <Button key={index} className={["border-[1px] border-neutral-200 py-3 px-[18px] rounded text-sm bg-white hover:bg-indigo-200 hover:bg-opacity-50 transition-all", (index+1) === paginationData.page && "border-none outline outline-indigo-700 hover:bg-white"].filter(Boolean).join(" ")} onClick={() => handlePageNumber(index+1)}>
                  {index + 1} {/* Display 1-based page numbers */}
                </Button>
              );
            })}
          {paginationData.has_more
           && <div className="flex justify-center items-center border-[1px] border-neutral-200 rounded py-3 px-[18px] cursor-pointer bg-white hover:bg-opacity-50 hover:bg-indigo-200 text-sm transition-all" onClick={() => handlePageNumber(page+1)}>
                <Button>Next</Button>
                <ChevronRight size={14} />
              </div>
              }
        </div>
      </div>
    </div>
  );
}

export default ProductListingPage;

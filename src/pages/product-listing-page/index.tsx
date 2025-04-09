import { useEffect, useMemo, useState } from "react";
import ProductGrid from "../../components/product-grid";
import Dropdown from "../../components/dropdown";
import FilterSection from "../../components/filter-section";
import { resetCollection } from "../../redux/slices/collectionsSlice";
import { resetGender } from "../../redux/slices/gendersSlice";
import { fetchProducts } from "../../redux/slices/productsSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Button from "../../components/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import tshirtIcon from "../../assets/icons/tshirticon.svg";
import filterIcon from "../../assets/icons/filtericon.svg";
import { SkeletonProductGrid } from "../../components/skeletons";
import { resetColor } from "../../redux/slices/colorsSlice";
import { resetRating } from "../../redux/slices/ratingsSlice";
import { toggleSidebar } from "../../redux/slices/contextualSidebarSlice";

const sortOptions: Record<string, { sort: string; direction: "asc" | "desc" }> =
  {
    Newest: { sort: "created", direction: "desc" },
    "Best rating": { sort: "rating", direction: "desc" },
    "Most popular": { sort: "popularity", direction: "desc" },
    "Price: Low to High": { sort: "price", direction: "asc" },
    "Price: High to Low": { sort: "price", direction: "desc" },
  };

type PaginationSchema = {
  has_more: boolean;
  page: number;
  per_page: number;
  total: number;
};

function ProductListingPage() {
  const dispatch = useAppDispatch();
  const selectedGenders = useAppSelector(
    (state) => state.genders.selectedGenders
  );
  const selectedCollections = useAppSelector(
    (state) => state.collections.selectedCollections
  );

  const {
    data: fetchedProductsData,
    status: fetchedProductsStatus,
    error: fetchedProductsError,
  } = useAppSelector((state) => state.products);

  const products = fetchedProductsData?.data || [];

  const defaultPagination: PaginationSchema = {
    has_more: false,
    page: 1,
    per_page: 10,
    total: 0,
  };

  const paginationData: PaginationSchema =
    fetchedProductsData?.pagination || defaultPagination;
  const totalPages = Math.ceil(paginationData.total / paginationData.per_page);

  const [open, setOpen] = useState<boolean>(false);
  const [selectedDropdownOption, setSelectedDropdownOption] =
    useState<string>("Sort by");
  const [page, setPage] = useState<number>(1);

  const selectedSort = useMemo(() => {
    return sortOptions[selectedDropdownOption] || "";
  }, [selectedDropdownOption]);

  const handleDropdownClick = (value: boolean) => {
    setOpen(value);
  };

  const handleDropdownValue = (opt: string) => {
    setSelectedDropdownOption(opt);
  };

  const handlePageNumber = (value: number) => {
    if (value > totalPages || value < 0) return;

    dispatch(
      fetchProducts({
        collection: filters.collections[0],
        page: value,
        per_page: 9,
        sort: selectedSort.sort,
        direction: selectedSort.direction,
      })
    );

    window.scrollTo({ top: 0, behavior: "auto" });

    if (
      fetchedProductsStatus === "succeeded" &&
      fetchedProductsError !== "failed"
    )
      setPage(value);
  };

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
        sort: selectedSort.sort,
        direction: selectedSort.direction,
      })
    );
  }, [dispatch, filters, selectedSort]);

  const EmptyPage = (
    <div className="h-full flex flex-col justify-center items-center gap-5">
      <div className="rounded-full p-3 shadow-md">
        <img src={tshirtIcon} />
      </div>
      <div className="flex flex-col gap-2 items-center">
        <p className="font-medium text-xl text-neutral-900">
          Nothing found just yet
        </p>
        <p className="text-base text-neutral-900 font-normal">
          Adjust your filters a bit, and let's see what we can find!
        </p>
      </div>
      <Button
        type="button"
        className="bg-indigo-700 hover:bg-indigo-800 px-[18px] py-2.5 text-base font-medium rounded text-white"
        onClick={() => {
          dispatch(resetCollection());
          dispatch(resetColor());
          dispatch(resetGender());
          dispatch(resetRating());
        }}
      >
        Reset filters
      </Button>
    </div>
  );

  return (
    <div className="bg-white flex-1 flex gap-8 max-w-[1408px] lg:p-24 max-lg:p-4 mx-4">
      <div className="hidden lg:block w-[248px] pt-4 pr-4">
        <FilterSection />
      </div>
      <div className="flex flex-1 flex-col gap-8">
        <div className="flex justify-between items-center text-neutral-900 font-medium text-sm lg:ml-auto">
          <div
            className="lg:hidden flex gap-2 items-center shadow-md rounded-md py-2.5 px-4"
            onClick={() => dispatch(toggleSidebar())}
          >
            <img src={filterIcon} alt="" />
            <span>Filter</span>
          </div>
          <Dropdown
            data={Object.keys(sortOptions)}
            open={open}
            setOpen={(value) => handleDropdownClick(value)}
            onChange={handleDropdownValue}
            type="hover"
            selectedOption={selectedDropdownOption}
            titleClassName="shadow-md rounded-md py-2.5 px-4"
            optionsClassName="flex flex-col border-[1.5px] absolute w-[228px] top-9 bg-white max-h-60 overflow-y-auto rounded-md shadow-lg z-10"
          >
            {selectedDropdownOption}
          </Dropdown>
        </div>
        {fetchedProductsStatus === "loading" ? (
          <SkeletonProductGrid />
        ) : products.length ? (
          <ProductGrid products={products} />
        ) : (
          EmptyPage
        )}
        <div className="flex justify-center items-center gap-2 md:gap-3">
          {page > 1 && (
            <div
              className="flex justify-center items-center border-[1px] border-neutral-200 rounded py-2 md:py-3 px-1.5 md:px-[18px] cursor-pointer bg-white hover:bg-opacity-50 hover:bg-indigo-200 text-sm transition-all"
              onClick={() => handlePageNumber(page - 1)}
            >
              <ChevronLeft size={15} />
              <Button className="hidden md:block">Prev</Button>
            </div>
          )}
          {products.length > 0 &&
            Array.from(
              {
                length: Math.ceil(
                  paginationData.total / paginationData.per_page
                ),
              },
              (_, index) => {
                return (
                  <Button
                    key={index}
                    className={[
                      "border-[1px] border-neutral-200 py-3 px-3 md:px-[18px] rounded text-sm bg-white hover:bg-indigo-200 hover:bg-opacity-50 transition-all",
                      index + 1 === paginationData.page &&
                        "border-none outline outline-indigo-700 hover:bg-white",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() => handlePageNumber(index + 1)}
                  >
                    {index + 1} {/* Display 1-based page numbers */}
                  </Button>
                );
              }
            )}
          {paginationData.has_more && (
            <div
              className="flex justify-center items-center border-[1px] border-neutral-200 rounded py-2 md:py-3 px-1.5 md:px-[18px] cursor-pointer bg-white hover:bg-opacity-50 hover:bg-indigo-200 text-sm transition-all"
              onClick={() => handlePageNumber(page + 1)}
            >
              <Button className="hidden md:block">Next</Button>
              <ChevronRight size={15} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductListingPage;

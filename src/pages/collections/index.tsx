import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import { toggleCollection } from "../../redux/slices/collectionsSlice";

type Data = {
  collection_id: string;
  name: string;
  description: string;
  image_url: string;
  created_at: string;
};

function Collections() {
  const [collectionData, setCollectionData] = useState<Data[] | null>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://www.greatfrontend.com/api/projects/challenges/e-commerce/collections"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        const { data } = result;
        setCollectionData(data);
        setLoading(false);
      } catch (error) {
        setError((error as Error).message || "Something went wrong");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleCollectionClick = (collection: string) => {
    dispatch(toggleCollection(collection));
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-start gap-8 rounded-lg max-sm:py-12 max-lg:py-16 lg:p-24 max-lg:px-4 text-black w-full">
      <div>
        <p className="text-black font-semibold text-3xl">Our Collections</p>
      </div>
      <div className="flex max-sm:flex-col gap-7 w-full">
        {/* First image */}
        <Link
          to="/product-listing-page"
          onClick={() => handleCollectionClick("cozy")}
        >
          <div className="relative max-h-[580px] flex basis-1/2 w-full rounded-lg overflow-hidden">
            <img
              className="w-full object-cover hover:scale-110 transition-all"
              src={collectionData?.[0]?.image_url}
              alt=""
              loading="lazy"
            />
            <div className="absolute bottom-4 left-4 text-white">
              <p className="font-normal text-sm">{collectionData?.[0]?.name}</p>
              <p className="font-medium text-base">
                {collectionData?.[0]?.description}
              </p>
            </div>
          </div>
        </Link>
        {/* Second and Third images */}
        <div className="flex max-h-[580px] basis-1/2 flex-col gap-7">
          <Link
            to="/product-listing-page"
            onClick={() => handleCollectionClick("urban")}
            className="relative flex-1 flex w-full rounded-lg overflow-hidden"
          >
            <div className="flex">
              <img
                className="w-full object-cover hover:scale-110 transition-all"
                src={collectionData?.[1]?.image_url}
                alt=""
                loading="lazy"
              />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="font-normal text-sm">
                  {collectionData?.[1]?.name}
                </p>
                <p className="font-medium text-base">
                  {collectionData?.[1]?.description}
                </p>
              </div>
            </div>
          </Link>
          <Link
            to="/product-listing-page"
            onClick={() => handleCollectionClick("fresh")}
            className="relative flex-1 flex w-full rounded-lg overflow-hidden"
          >
            <div className="flex">
              <img
                className="w-full object-cover hover:scale-110 transition-all"
                src={collectionData?.[2]?.image_url}
                alt=""
                loading="lazy"
              />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="font-normal text-sm">
                  {collectionData?.[2]?.name}
                </p>
                <p className="font-medium text-base">
                  {collectionData?.[2]?.description}
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Collections;

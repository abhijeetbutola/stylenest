import { useState, useEffect } from "react";

type Data = {
  collection_id: string;
  name: string;
  description: string;
  image_url: string;
  created_at: string;
};

function Collections() {
  const [collectionData, setCollectionData] = useState<Data[] | null>([]);
  const [loading, setLoading] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div className="flex-1 flex flex-col justify-center items-start gap-8 rounded-lg p-6 md:p-24 text-black w-full">
      <div>
        <p className="text-black font-semibold text-3xl">Our Collections</p>
      </div>
      <div className="flex gap-7 flex-wrap w-full">
        {/* First image */}
        <div className="relative flex-1 rounded-lg overflow-hidden">
          <img
            className="w-full aspect-[1024/1000] object-cover"
            src={collectionData?.[0]?.image_url}
            alt=""
          />
          <div className="absolute bottom-4 left-4 text-white">
            <p className="font-normal text-sm">{collectionData?.[0]?.name}</p>
            <p className="font-medium text-base">{collectionData?.[0]?.description}</p>
          </div>
        </div>
        {/* Second and Third images */}
        <div className="flex flex-col gap-7 flex-1">
          <div className="relative rounded-lg overflow-hidden">
            <img
              className="w-full aspect-[2152/1000] object-cover"
              src={collectionData?.[1]?.image_url}
              alt=""
            />
            <div className="absolute bottom-4 left-4 text-white">
              <p className="font-normal text-sm">{collectionData?.[1]?.name}</p>
              <p className="font-medium text-base">{collectionData?.[1]?.description}</p>
            </div>
          </div>
          <div className="relative rounded-lg overflow-hidden">
            <img
              className="w-full aspect-[2152/1000] object-cover"
              src={collectionData?.[2]?.image_url}
              alt=""
            />
            <div className="absolute bottom-4 left-4 text-white">
              <p className="font-normal text-sm">{collectionData?.[2]?.name}</p>
              <p className="font-medium text-base">{collectionData?.[2]?.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Collections;

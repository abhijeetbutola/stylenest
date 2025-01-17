import { useState, useEffect } from "react";

type Data = {
    collection_id: string;
    name: string;
    description: string;
    image_url: string;
    created_at: string;
}

function Collections() {
    const [collectionData, setCollectionData] = useState<Data[] | null>([]);
    const [loading, setLoading] = useState<boolean | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const response = await fetch('https://www.greatfrontend.com/api/projects/challenges/e-commerce/collections')
                if(!response.ok) {
                    throw new Error('Failed to fetch data')
                }
                const result = await response.json()
                const {data} = result
                setCollectionData(data)
                setLoading(false)
            } catch(error) {
                setError((error as Error).message || 'Something went wrong')
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    if(loading) {
        return <div>
            Loading data...
        </div>
    }

    if(error) {
        return <div>
            Error: {error}
        </div>
    }
    

    return (
            <div className="h-screen flex flex-col justify-center items-start gap-8 bg-white max-w-[1408px] rounded-lg p-24 text-black">
                <div>
                    <p className="text-black font-semibold text-3xl">Our Collections</p>
                </div>
                <div className="flex gap-7">
                    <div className="relative rounded-lg self-stretch overflow-auto bg-gradient-to-b from-black to-black">
                        <img className="w-[594px] h-[580px] object-cover" src={collectionData?.[0]?.image_url} alt="" />
                        <div className="absolute top-[516px] px-4 text-white">
                            <p className="font-normal text-sm">{collectionData?.[0]?.name}</p>
                            <p className="font-medium text-base">{collectionData?.[0]?.description}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-7">
                        <div className="relative rounded-lg self-stretch overflow-auto">
                            <img className="w-[594px] h-[276px] object-cover" src={collectionData?.[1]?.image_url} alt="" />
                            <div className="absolute top-[212px] px-4 text-white">
                            <p className="font-normal text-sm">{collectionData?.[1]?.name}</p>
                            <p className="font-medium text-base">{collectionData?.[1]?.description}</p>
                        </div>
                        </div>
                        <div className="relative rounded-lg self-stretch overflow-auto">
                            <img className="w-[594px] h-[276px] object-cover" src={collectionData?.[2]?.image_url} alt="" />
                            <div className="absolute top-[212px] px-4 text-white">
                            <p className="font-normal text-sm">{collectionData?.[2]?.name}</p>
                            <p className="font-medium text-base">{collectionData?.[2]?.description}</p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Collections;
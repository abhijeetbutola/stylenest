import Button from "../button";
import logo from "../../assets/icons/stylenest.svg";
import youtube from "../../assets/icons/youtubeicon.svg";
import instagram from "../../assets/icons/instaicon.svg";
import facebook from "../../assets/icons/fbicon.svg";
import github from "../../assets/icons/githubicon.svg";
import x from "../../assets/icons/xicon.svg";
import { useAppDispatch } from "../../hooks";
import { fetchProducts } from "../../redux/slices/productsSlice";
import { Link } from "react-router-dom";
import { resetGender, toggleGender } from "../../redux/slices/gendersSlice";
import {
  resetCollection,
  toggleCollection,
} from "../../redux/slices/collectionsSlice";
import Text from "../text";

function Footer() {
  const dispatch = useAppDispatch();

  const handleCategoryClick = (value: string) => {
    dispatch(
      fetchProducts({
        category: value,
        page: 1,
        per_page: 9,
      })
    );

    dispatch(resetGender());
    dispatch(resetCollection());
    dispatch(toggleGender(value));
  };

  const handleCollectionClick = (value: string) => {
    dispatch(
      fetchProducts({
        collection: [value],
        page: 1,
        per_page: 9,
      })
    );

    dispatch(resetCollection());
    dispatch(resetGender());
    dispatch(toggleCollection(value));
  };

  return (
    <div className="grow max-w-[1408px] mx-4 mb-4">
      <div className="flex-1 lg:p-16 max-lg:p-4 bg-white rounded-b-lg">
        <div className="flex flex-col gap-16 py-24 lg:px-8">
          <div className="max-sm:flex-1 flex justify-between gap-8 md:gap-5 flex-wrap">
            <div className="max-sm:w-full">
              <p className="font-semibold text-xl text-neutral-900">
                Join our newsletter
              </p>
              <Text as={"p"} color="secondary">
                We'll send you a nice letter once per week. No spam.
              </Text>
            </div>
            <div className="max-sm:flex-1 flex items-center gap-4 flex-wrap sm:max-lg:w-full">
              <div className="max-md:flex-1 max-sm:w-full">
                <input
                  type="text"
                  placeholder="Enter your email"
                  className="bg-neutral-50 border border-neutral-200 rounded h-fit sm:min-w-[280px] max-lg:w-full px-3.5 py-2.5 text-sm font-medium placeholder-neutral-500 text-neutral-900"
                />
              </div>
              <div className="max-sm:w-full">
                <Button className="flex justify-center items-center gap-1 bg-indigo-700 hover:bg-indigo-800 text-white text-sm px-4 py-2.5 rounded w-full h-fit">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
          <div className="flex justify-between flex-wrap">
            <div className="flex flex-col gap-8 items-start max-w-[352px]">
              <img src={logo} alt="" className="h-8" />
              <p className="text-neutral-600 font-normal text-base">
                Craft stunning style journeys that weave more joy into every
                thread.
              </p>
            </div>
            <div className="flex gap-8 flex-wrap">
              <div className="flex flex-col gap-4 items-start md:w-[280px] max-sm:w-full">
                <p className="font-normal text-sm text-neutral-500">
                  SHOP CATEGORIES
                </p>
                <div className="flex flex-col gap-3 items-start font-medium text-base text-neutral-600">
                  <Link to="/product-listing-page">
                    <Button
                      className="hover:underline"
                      onClick={() => handleCategoryClick("unisex")}
                    >
                      Unisex
                    </Button>
                  </Link>
                  <Link to="/product-listing-page">
                    <Button
                      className="hover:underline"
                      onClick={() => handleCategoryClick("women")}
                    >
                      Women
                    </Button>
                  </Link>
                  <Link to="/product-listing-page">
                    <Button
                      className="hover:underline"
                      onClick={() => handleCategoryClick("men")}
                    >
                      Men
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex flex-col gap-4 items-start md:w-[280px] max-sm:w-full">
                <p className="font-normal text-sm text-neutral-500">
                  SHOP COLLECTIONS
                </p>
                <Text
                  as={"div"}
                  className="flex flex-col gap-3 items-start font-medium text-base text-neutral-600"
                >
                  <Link to="/product-listing-page">
                    <Button
                      className="hover:underline"
                      onClick={() => handleCollectionClick("latest")}
                    >
                      Latest Arrivals
                    </Button>
                  </Link>
                  <Link to="/product-listing-page">
                    <Button
                      className="hover:underline"
                      onClick={() => handleCollectionClick("urban")}
                    >
                      Urban Oasis
                    </Button>
                  </Link>
                  <Link to="/product-listing-page">
                    <Button
                      className="hover:underline"
                      onClick={() => handleCollectionClick("cozy")}
                    >
                      Cozy Comfort
                    </Button>
                  </Link>
                  <Link to="/product-listing-page">
                    <Button
                      className="hover:underline"
                      onClick={() => handleCollectionClick("fresh")}
                    >
                      Fresh Fusion
                    </Button>
                  </Link>
                </Text>
              </div>
            </div>
          </div>
          <div className="flex justify-between flex-wrap border-t border-t-neutral-200">
            <p className="pt-8 text-neutral-500 font-normal text-base">
              © 2024 StyleNest, Inc. All rights reserved.
            </p>
            <div className="flex gap-6 pt-8 flex-wrap transition-all">
              <a href="https://www.youtube.com/" target="_blank">
                <img
                  src={youtube}
                  alt=""
                  className="h-4 w-5 hover:scale-110"
                  loading="lazy"
                />
              </a>
              <a href="https://www.instagram.com/" target="_blank">
                <img
                  src={instagram}
                  alt=""
                  className="h-4 w-5 hover:scale-110"
                  loading="lazy"
                />
              </a>
              <a href="https://www.facebook.com/" target="_blank">
                <img
                  src={facebook}
                  alt=""
                  className="h-4 w-5 hover:scale-110"
                  loading="lazy"
                />
              </a>
              <a href="https://www.github.com/" target="_blank">
                <img
                  src={github}
                  alt=""
                  className="h-4 w-5 hover:scale-110"
                  loading="lazy"
                />
              </a>
              <a href="https://www.x.com/" target="_blank">
                <img
                  src={x}
                  alt=""
                  className="h-4 w-5 hover:scale-110"
                  loading="lazy"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;

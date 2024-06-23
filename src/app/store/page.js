"use client";
import { dataCollectionId, database, databaseId } from "@/appwrite";
import Card from "@/components/Card";
// import data from "@/data";
import { useEffect, useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

function Store() {
  const [range, setRange] = useState([0, 1000]);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [arrange, setArrange] = useState(null);
  const [tag, setTag] = useState(null);
  const [search, setSearch] = useState(null);
  const [page, setPage] = useState(1);
  const showItems = 20;

  useEffect(() => {
    let promise = database.listDocuments(databaseId, dataCollectionId);
    promise.then((value) => {
      console.log(value);
      setData(value.documents);
    });
  }, []);

  let filteredData = data.filter((item) => {
    return item.price >= range[0] && item.price <= range[1];
  });

  if (arrange) {
    if (arrange === "des") {
      filteredData = filteredData.sort((a, b) => {
        return b.price - a.price;
      });
    } else if (arrange === "asc") {
      filteredData = filteredData.sort((a, b) => {
        return a.price - b.price;
      });
    }
  }

  const handleAsc = () => {
    if (arrange === null) setArrange("asc");
    else if (arrange === "asc") setArrange(null);
    else if (arrange === "des") setArrange("asc");
  };
  const handleDes = () => {
    if (arrange === null) setArrange("des");
    else if (arrange === "des") setArrange(null);
    else if (arrange === "asc") setArrange("des");
  };

  if (tag) {
    filteredData = filteredData.filter((item) => {
      return item.tag.includes(tag);
    });
  }

  const handleTag = (e) => {
    setTag(e.target.value);
  };

  if (search) {
    filteredData = filteredData.filter((item) => {
      return item.name.toLowerCase().includes(search.toLowerCase());
    });
  }

  filteredData = filteredData.slice((page - 1) * showItems, page * showItems);

  const handleAdd = () => {
    if (page >= data.length / showItems) {
      setPage(1);
    } else {
      setPage(page + 1);
    }
  };

  const handleMinus = () => {
    if (page == 1) {
      setPage(1);
    } else {
      setPage(page - 1);
    }
  };

  return (
    <div className="flex flex-col  items-center justify-center w-full mb-20">
      {open ? (
        <div className=" w-full flex my-5  py-10 relative backdrop-blur-md bg-gray-300 rounded-md">
          <div
            className="absolute top-3 right-5 text-2xl font-bold text-blue-500 cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            X
          </div>
          <div className=" h-full w-[50%] px-5 space-y-5 py-3">
            <h3 className="text-xl font-medium ">Budget</h3>
            <RangeSlider
              min={0}
              max={1000}
              value={range}
              onInput={(value) => {
                setRange(value);
              }}
            />
            <div className="flex justify-between">
              <h4 className="text-sm font-medium text-gray-500">{range[0]}$</h4>
              <h4 className="text-sm font-medium text-gray-500">{range[1]}$</h4>
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-medium">Ascending</h3>
              <input
                type="checkbox"
                className="h-5 w-5"
                // onClick={setArrange.bind(this, "asc")}
                onClick={handleAsc}
                checked={arrange === "asc"}
              />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-medium">Descending</h3>
              <input
                type="checkbox"
                className="h-5 w-5"
                // onClick={setArrange.bind(this, "des")}
                onClick={handleDes}
                checked={arrange === "des"}
              />
            </div>
          </div>
          <div className=" h-full w-[50%] space-y-5 px-5 py-3 border-l-2 ">
            <div className="flex items-center justify-between ">
              <h3 className="text-xl font-medium">Bestseller</h3>
              <input
                type="checkbox"
                className="h-5 w-5"
                checked={tag === "bestseller"}
                value={"bestseller"}
                onClick={handleTag}
              />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-medium">Premium</h3>
              <input
                type="checkbox"
                className="h-5 w-5"
                checked={tag === "premium"}
                value={"premium"}
                onClick={handleTag}
              />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-medium">BestPrice</h3>
              <input
                type="checkbox"
                className="h-5 w-5"
                checked={tag === "bestprice"}
                value={"bestprice"}
                onClick={handleTag}
              />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-medium">New</h3>
              <input
                type="checkbox"
                className="h-5 w-5"
                checked={tag === "new"}
                value={"new"}
                onClick={handleTag}
              />
            </div>
            <div className="flex sm:items-center justify-between flex-col sm:flex-row items-start ">
              <h3 className="text-xl font-medium">Name</h3>
              <input
                type="text"
                className="h-8 sm:w-[200px] w-[150px] mt-3 sm:mt-0  rounded-md outline-none px-4 font-semibold"
                placeholder="Name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      ) : (
        <div
          className="w-full flex justify-end my-5 px-3 sm:my-10"
          onClick={() => setOpen(!open)}
        >
          <div className=" bg-gradient-45 from-black to-blue-800 py-2 px-4 rounded-md cursor-pointer">
            <h2 className="font-bold text-sm text-white text-center">
              Apply Filters
            </h2>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-14 sm:flex-row sm:flex-wrap sm:gap-20 sm:items-center sm:justify-center sm:px-10">
        {filteredData.map((el) => (
          <Card
            id={el.$id}
            name={el.name}
            price={el.price}
            url={el.url}
            photos={el.photos}
            tag={el.tag}
            key={el.$id}
          />
        ))}
      </div>
      <div className="flex items-center justify-center gap-5 my-10 text-xl font-semibold">
        <h1 className="cursor-pointer" onClick={handleMinus} >{"<"}</h1>
        <h1 className="text-blue-800">{page}</h1>
        <h1 className="cursor-pointer" onClick={handleAdd} >{">"}</h1>
      </div>
    </div>
  );
}

export default Store;

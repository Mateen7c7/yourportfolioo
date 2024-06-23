"use client";

import {
  dataCollectionId,
  database,
  databaseId,
  marketingCollectionId,
} from "@/appwrite";
import { ID } from "appwrite";
import { useEffect, useRef, useState } from "react";

function Home() {
  const name = useRef();
  const [data, setData] = useState();
  const [search, setSearch] = useState("");
  const [item, setItem] = useState(null);
  const [form, setForm] = useState({
    customer_name: "",
    customer_price: "",
    email: "",
    contact: "",
    user_name: "",
  });
  useEffect(() => {
    const url = window.location.href;
    console.log(url.split("/")[3]);
    name.current = url.split("/")[3];
    const pro = database.listDocuments(databaseId, dataCollectionId);
    pro.then((value) => {
      setData(value.documents);
    });
  }, []);
  const handleClick = (val) => {
    setItem(val);
    setSearch("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form, item);
    let promise = database.createDocument(
      databaseId,
      marketingCollectionId,
      ID.unique(),
      {
        ...form,
        customer_price: Number(form.customer_price),
        agent_name: name.current,
        item_name: item.name,
        item_price: item.price,
      }
    );
    promise.then((value) => {
      console.log(value);
      setForm({
        customer_name: "",
        customer_price: "",
        email: "",
        contact: "",
        user_name: "",
      });
      setItem(null);
    });
  };
  return (
    <div className="w-full hei  flex items-center justify-center ">
      <div className=" ">
        <div>
          {/* <h1>{name.current}</h1> */}
          <h1>Select Item</h1>
          <input
            type="text"
            placeholder="Enter Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="outline-none  w-[300px] p-2"
          />
          <div className="max-h-[140px] w-[300px]  overflow-scroll absolute bg-white ">
            {search &&
              data
                .filter((item) => item.name.includes(search))
                .map((item) => (
                  <div
                    className="cursor-pointer border-2 my-1 px-4 py-1 rounded-sm"
                    key={item.$id}
                    onClick={() => handleClick(item)}
                  >
                    {item.name}
                  </div>
                ))}
          </div>
        </div>
        <div className="mt-10 space-y-1">
          <h1 className="">Item Name</h1>
          <h1 className="text-2xl text-blue-800 font-semibold">{item?.name}</h1>
          <h1>Item Price</h1>
          <h1 className="text-2xl text-blue-800 font-semibold">
            {item?.price}$
          </h1>
          <h1>Customer Name</h1>
          <input
            type="text"
            className="outline-none  w-[300px] p-2 text-2xl text-blue-800 font-semibold"
            value={form.customer_name}
            onChange={(e) =>
              setForm({ ...form, customer_name: e.target.value })
            }
          />
          <h1>Customer Price</h1>
          <input
            type="number"
            className="outline-none  w-[300px] p-2 text-2xl text-blue-800 font-semibold"
            value={form.customer_price}
            onChange={(e) =>
              setForm({ ...form, customer_price: e.target.value })
            }
          />
          <h1>Customer Email</h1>
          <input
            type="email"
            className="outline-none  w-[300px] p-2 text-2xl text-blue-800 font-semibold"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <h1>Customer Contact</h1>
          <select
            value={form.contact}
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
            className="outline-none bg-white  w-[300px] p-2 text-2xl text-blue-800 font-semibold"
          >
            <option value="email" className="text-black">
              Gmail
            </option>
            <option value="whatsapp" className="text-black">
              WhatsUp
            </option>
            <option value="instagram" className="text-black">
              Instagram
            </option>
            <option value="facebook" className="text-black">
              Facebook
            </option>
            <option value="twitter" className="text-black">
              Twitter
            </option>
            <option value="linkedin" className="text-black">
              Linkedin
            </option>
          </select>
          <h1>Customer User Name</h1>
          <input
            type="text"
            className="outline-none  w-[300px] p-2 text-2xl text-blue-800 font-semibold"
            value={form.user_name}
            onChange={(e) => setForm({ ...form, user_name: e.target.value })}
          />
        </div>
        <div
          onClick={handleSubmit}
          className="mt-5 bg-blue-500 text-white text-center rounded-sm py-1 font-semibold cursor-pointer"
        >
          <h1>Submit</h1>
        </div>
      </div>
    </div>
  );
}

export default Home;

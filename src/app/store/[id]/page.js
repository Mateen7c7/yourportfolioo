"use client";
import { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import {
  dataCollectionId,
  database,
  databaseId,
  messageCollectionId,
} from "@/appwrite";
import { ID, Query } from "appwrite";
import { generateUrl } from "@/utils/functions";
import ImageSlider from "@/components/ImageSlider";

function Home() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState();
  const [form, setForm] = useState({
    name: "Mateen",
    email: "mateen@gmail.com",
    contact: "instagram",
    user_name: "mateen",
  });
  const [happy, setHappy] = useState(false);
  useEffect(() => {
    const url = window.location.href;
    const idd = url.split("/")[4];
    let promise = database.listDocuments(databaseId, dataCollectionId, [
      Query.equal("$id", idd),
    ]);
    promise.then((value) => {
      setData(value.documents[0]);
    });
  }, []);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form, data);
    let promise = database.createDocument(
      databaseId,
      messageCollectionId,
      ID.unique(),
      { ...form, price: data.price, item: data.name }
    );
    promise.then(
      (value) => {
        console.log(value);
        setHappy(true);
      },
      (error) => {
        console.log(error);
      }
    );
  };
  return (
    <div className=" bg-gradient-45 from-black to-blue-800 w-full hei py-10 relative">
      {open && (
        <div className="absolute top-0 w-full hei z-20 flex items-center justify-center ">
          <div className="w-[90%] h-[80%] backdrop-blur-md rounded-xl bg-gray-600 bg-opacity-20 py-8 px-5 relative space-y-4 ">
            <h5
              onClick={() => setOpen(!open)}
              className="text-xl font-medium text-white absolute right-5 top-5 cursor-pointer"
            >
              X
            </h5>
            {happy ? (
              <div className="relative">
                <h1 className="text-3xl font-bold text-white">Thank You</h1>
                <h1 className="text-3xl font-bold text-white">
                  Your Order is{" "}
                  <span className="text-green-500">Confirmed!!</span>{" "}
                </h1>
                <h1 className="text-3xl font-bold text-white">
                  Our <span className="text-sky-500">Development!</span> Team
                  will contact you soon
                </h1>
              </div>
            ) : (
              <>
                {/* <h5
                  onClick={() => setOpen(!open)}
                  className="text-xl font-medium text-white absolute right-5 top-5 cursor-pointer"
                >
                  X
                </h5> */}
                <h5 className="text-xl font-medium text-sky-500">Your Name</h5>
                <input
                  type="text"
                  className="w-full h-10 text-xl bg-transparent text-white font-semibold"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <h5 className="text-xl font-medium text-sky-500">Price</h5>
                <h5 className="w-full h-10 text-xl bg-transparent text-white font-semibold">
                  {data?.price}
                </h5>
                <h5 className="text-xl font-medium text-sky-500">Email</h5>
                <input
                  type="email"
                  className="w-full h-10 text-xl bg-transparent text-white font-semibold"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <h5 className="text-xl font-medium text-sky-500">
                  Mode of Contact
                </h5>
                <select
                  defaultValue={form.contact}
                  onChange={(e) =>
                    setForm({ ...form, contact: e.target.value })
                  }
                  className="w-full h-10 text-xl bg-transparent text-white font-semibold"
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
                <h5 className="text-xl font-medium text-sky-500">
                  User Name of {form?.contact}
                </h5>
                <input
                  type="text"
                  className="w-full h-10 text-xl bg-transparent text-white font-semibold"
                  value={form.user_name}
                  onChange={(e) =>
                    setForm({ ...form, user_name: e.target.value })
                  }
                />
                <div
                  className="w-full flex justify-center"
                  onClick={handleSubmit}
                >
                  <h5 className="bg-gradient-45 from-black to-blue-800 py-2 px-4 rounded-md text-white text-xl font-bold cursor-pointer">
                    Submit
                  </h5>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      <div className="absolute top-2 left-2 " onClick={() => router.back()}>
        <IoMdArrowRoundBack className="text-3xl text-white" />
      </div>
      <div className="flex justify-center items-center gap-5 ">
        <div className="aspect-[2/3] w-[70vw] sm:w-[300px]">
          {data?.photos.length > 0 && (
            <ImageSlider>
              {data?.photos.map((image, index) => {
                return <img key={index} src={generateUrl(image)} alt={"ok"} />;
              })}
            </ImageSlider>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-5 my-4 px-10">
        <h1 className="text-3xl font-bold text-white">{data?.name}</h1>
        <h1 className="text-3xl font-bold text-blue-500">{data?.price}$</h1>
      </div>
      <div className="flex justify-between items-center mt-10 px-10 sm:justify-start sm:gap-20">
        <a href={data?.url} target="_blank" className="cursor-pointer">
          <div className="border-2 border-white rounded-full py-2 px-6">
            <h2 className="text-white text-lg font-bold">Live Demo</h2>
          </div>
        </a>

        <div
          onClick={() => setOpen(!open)}
          className="border-2 border-white rounded-full py-2 px-6 cursor-pointer"
        >
          <h2 className="text-white text-lg font-bold">Buy Now</h2>
        </div>
      </div>
    </div>
  );
}

export default Home;

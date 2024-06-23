// "use client";
import { generateUrl } from "@/utils/functions";
import Link from "next/link";

function Card({ id, name, price, url, photos, tag }) {
  return (
    <>
      <div className="border-b-2 pb-5 border-blue-800 ">
        <div className="w-[70vw] sm:w-[200px] aspect-[2/3] ">
          <img
            alt="ok"
            src={generateUrl(photos[0])}
            className="w-full h-full object-contain rounded-xl"
          />
        </div>
        <div className="flex justify-between items-center my-4">
          <h3 className="font-bold text-2xl sm:text-lg ">{name}</h3>
          <h3 className="font-bold text-2xl sm:text-lg text-blue-800">
            {price}$
          </h3>
        </div>
        <div className="flex justify-between">
          <a href={url} target="_blank">
            <div className="bg-gradient-45 from-black to-blue-800 py-2 px-4 rounded-md sm:px-2 sm:py-1">
              <h3 className="font-bold text-lg  text-white text-center sm:text-sm">
                Live Demo
              </h3>
            </div>
          </a>

          <Link href={`/store/${id}`}>
            <div className="bg-gradient-45 from-black to-blue-800 py-2 px-4 rounded-md hover:bg-black sm:px-2 sm:py-1">
              <h3 className="font-bold text-lg text-white text-center sm:text-sm">
                More Info
              </h3>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Card;

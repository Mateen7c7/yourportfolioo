"use client";
import { IoMdMenu } from "react-icons/io";
import { ImCross } from "react-icons/im";
import Link from "next/link";
import { useState } from "react";
function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="w-full h-16 bg-gradient-45 from-black to-blue-800 ">
      <div className="flex items-center justify-between px-3 h-full">
        <div>
          <h1 className="text-2xl font-bold text-white">YourPortfolio</h1>
        </div>
        <div onClick={() => setOpen(!open)} className="sm:hidden">
          <IoMdMenu className="text-3xl text-white " />
        </div>
        <div className="sm:flex hidden justify-evenly items-center w-[50vw] ">
          {/* <Link href="/">
            <h2 className="text-xl font-semibold text-white">Home</h2>
          </Link> */}
          <Link href="/store">
            <h2 className="text-xl font-semibold text-white">Store</h2>
          </Link>
          <Link href="/about">
            <h2 className="text-xl font-semibold text-white">About</h2>
          </Link>
          <Link href="/contact">
            <h2 className="text-xl font-semibold text-white">Contact</h2>
          </Link>
        </div>
      </div>
      {open && (
        <div className="w-full h-[200px] bg-gradient-45 from-black to-blue-800 absolute top-0 z-10">
          <div
            className="absolute top-5 right-5"
            onClick={() => setOpen(!open)}
          >
            <ImCross className="text-xl text-white " />
          </div>
          <div
            className="h-full flex flex-col items-start pl-10 justify-around"
            onClick={() => setOpen(!open)}
          >
            {/* <Link href="/">
              <h2 className="text-2xl font-semibold text-white">Home</h2>
            </Link> */}
            <Link href="/store">
              <h2 className="text-2xl font-semibold text-white">Store</h2>
            </Link>
            <Link href="/about">
              <h2 className="text-2xl font-semibold text-white">About</h2>
            </Link>
            <Link href="/contact">
              <h2 className="text-2xl font-semibold text-white">Contact</h2>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Nav;

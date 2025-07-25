// import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="navbar bg-none shadow-sm">
      <div className="navbar-start"></div>
      <div className="navbar-center">
        <span className=" text-[24px] sm:text-[28px] text-[#888] uppercase">
          Vigilantes Archive Access
        </span>

        {/* <Link href="/" className="btn btn-ghost text-sm sm:text-lg text-[#bbb] font-mono uppercase">
          Vigilantes Archive Access
        </Link> */}
      </div>
      <div className="navbar-end"></div>
    </div>
  );
};

export default Navbar;

// <div className="navbar-start">
//   <div className="dropdown">
//     <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         className="h-5 w-5"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke="currentColor"
//       >
//         {" "}
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth="2"
//           d="M4 6h16M4 12h16M4 18h7"
//         />{" "}
//       </svg>
//     </div>
//     <ul
//       tabIndex={0}
//       className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
//     >
//       <li>
//         <Link href="/">Homepage</Link>
//       </li>
//       {/* <li>
//         <Link href="/gigblogs">Gig Blogs</Link>
//       </li> */}
//     </ul>
//   </div>
// </div>

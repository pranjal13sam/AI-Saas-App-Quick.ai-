import { useClerk, useUser, SignIn, Protect } from "@clerk/clerk-react";
import {
  FileText,
  Hash,
  House,
  Icon,
  Image,
  Scissors,
  SquarePen,
  Users,
  Eraser,
  LogOut,
} from "lucide-react";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const navItems = [
  { to: "/ai", label: "Dashboard", Icon: House },
  { to: "/ai/write-article", label: "Write Article", Icon: SquarePen },
  { to: "/ai/blog-titles", label: "Blog Titles", Icon: Hash },
  { to: "/ai/generate-images", label: "Generate Images", Icon: Image },
  { to: "/ai/remove-background", label: "Remove Background", Icon: Eraser },
  { to: "/ai/remove-object", label: "Remove Object", Icon: Scissors },
  { to: "/ai/review-resume", label: "Review Resume", Icon: FileText },
  { to: "/ai/community", label: "Community", Icon: Users },
];

const Sidebar = ({ sidebar, setSidebar }) => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();

  /*When the app loads via a route change (like navigation), the @clerk/clerk-react useUser() hook already has user data.
    But on page refresh, user info is festched asynchronously, so user is temporarily undefined until Clerk finishes loading it. */

  return (
    <div
      className={`
    w-60 bg-white border-r border-gray-200 flex flex-col justify-between items-center
    fixed top-14 bottom-0 z-50 transition-transform duration-300 ease-in-out
    ${sidebar ? "translate-x-0" : "-translate-x-full"}
    sm:relative sm:translate-x-0 sm:z-0
  `}
    >
      <div className="my-7 w-full">
        <img
          src={user.imageUrl}
          alt="user avatar"
          className="w-13 rounded-full mx-auto"
        />
        <h1 className="mt-1 text-center">{user.fullName}</h1>
        <div className="px-6 mt-5 text-sm text-gray-600 font-medium">
          {/* //this is more cleaner version of using map via destructuring */}
          {navItems.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/ai"}
              onClick={() => setSidebar(false)}
              className={({ isActive }) =>
                `px-3.5 py-2.5 flex items-center gap-3 rounded ${
                  isActive
                    ? "bg-gradient-to-r from-[#3C81F6] to-[#9234EA] text-white"
                    : ""
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : ""}`} />
                  {label}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      {/* logout functionality */}

      <div className="w-full border-t border-gray-200 p-4 px-7 flex items-center justify-between">
        <div
          onClick={openUserProfile}
          className="flex gap-2 items-center cursor-pointer"
        >
          <img src={user.imageUrl} className="w-8 rounded-full" alt="" />
          <div>
            <h1 className="text-sm font-medium">{user.fullName}</h1>
            <p className="text-xs text-gray-500">
              <Protect plan="premium" fallback="Free">
                Premium
              </Protect>
              &nbsp;Plan
            </p>
          </div>
        </div>
        <LogOut
          className="w-4.5 text-gray-400 hover:text-gray-700 transition cursor-pointer"
          onClick={signOut}
        />
      </div>
    </div>
  );
};

export default Sidebar;

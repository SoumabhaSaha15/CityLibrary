import { useEffect, type FC } from "react";
import { GoHomeFill } from "react-icons/go";
import { MdLogout } from "react-icons/md";
import { LuSettings, LuBook } from "react-icons/lu";
import { createFileRoute } from "@tanstack/react-router";
import { Outlet, useNavigate } from "@tanstack/react-router";
import { useUserAuth } from "@/Contexts/UserAuth/AuthContext";
import UserAuthProvider from "@/Contexts/UserAuth/AuthProvider";
import {
  TbLayoutSidebarLeftExpand,
  TbLayoutSidebarRightExpand,
} from "react-icons/tb";
const User: FC = () => {
  const user = useUserAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (user.userDetails === null) {
      user.login(
        () => {},
        () => navigate({ to: "/login" }),
      );
    }
  }, []);
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <div className="flex flex-1 justify-baseline items-center flex-row">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost bg-base-100 hover:bg-base-200 lg:hidden rounded-full"
            >
              <TbLayoutSidebarLeftExpand className="size-5" />
            </label>
            <div className="p-3">CityLibrary</div>
          </div>
          <div className="flex gap-2">
            <div className="dropdown dropdown-bottom dropdown-left">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={
                      user.userDetails?.profile ||
                      import.meta.env.VITE_DEFAULT_USER_IMAGE
                    }
                  />
                </div>
              </div>
              <ul
                tabIndex={-1}
                className="menu menu-md dropdown-content bg-base-300 rounded-box z-1 mt-4 w-64 p-4 shadow"
              >
                <li className="mb-2">
                  <a>{user.userDetails?.username}</a>
                </li>
                <li className="mb-2">
                  <a>{user.userDetails?.email}</a>
                </li>
                <li>
                  <button
                    className="bg-error"
                    onClick={() => {
                      if (user.userDetails !== null) {
                        user.logout(() => {
                          navigate({ to: "/login" });
                        });
                      }
                    }}
                  >
                    <MdLogout className="size-5" />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Outlet />
      </div>
      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        />
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}

            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right rounded-full"
                data-tip="Homepage"
                onClick={() => {
                  navigate({ to: "/user" });
                }}
              >
                {/* Home icon */}
                <GoHomeFill className="size-4" />
                <span className="is-drawer-close:hidden">Homepage</span>
              </button>
            </li>

            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right rounded-full"
                data-tip="Book"
                onClick={() => {
                  navigate({ to: "/user/book" });
                }}
              >
                <LuBook className="size-4" />
                <span className="is-drawer-close:hidden">Book</span>
              </button>
            </li>

            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right rounded-full"
                data-tip="Settings"
              >
                <LuSettings className="size-4" />
                <span className="is-drawer-close:hidden">Settings</span>
              </button>
            </li>
          </ul>

          <ul className="drawer-end menu w-full grow flex-col-reverse">
            <li>
              <label
                htmlFor="my-drawer-4"
                aria-label="open sidebar"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right rounded-full"
                data-tip="Expand"
              >
                <TbLayoutSidebarRightExpand size={16} />
                <span className="is-drawer-close:hidden">Expanden</span>
              </label>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export const Route = createFileRoute("/user")({
  component: () => <UserAuthProvider children={<User />} />,
});

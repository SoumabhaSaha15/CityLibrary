import { useEffect, type FC } from "react";
import { GoHomeFill } from "react-icons/go";
import { LuSettings2 } from "react-icons/lu";
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
          <div className="flex-1">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost hover:bg-base-200 lg:hidden rounded-full"
            >
              <TbLayoutSidebarLeftExpand className="size-5" />
            </label>
            <div className="px-4">CityLibrary</div>
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
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a>{user.userDetails?.username}</a>
                </li>
                <li>
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
              >
                {/* Home icon */}
                <GoHomeFill className="size-4" />
                <span className="is-drawer-close:hidden">Homepage</span>
              </button>
            </li>
            {/* List item */}
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right rounded-full"
                data-tip="Settings"
              >
                <LuSettings2 className="size-4" />
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
                <TbLayoutSidebarRightExpand />
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

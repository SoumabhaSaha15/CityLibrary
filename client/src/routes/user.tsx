import { GoSun } from "react-icons/go";
import { GoMoon } from "react-icons/go";
import { ImQuill } from "react-icons/im";
import { useEffect, type FC } from "react";
import { useRipple } from "use-ripple-hook";
import { GoHomeFill } from "react-icons/go";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiLogoutBoxLine } from "react-icons/ri";
import { LuSettings, LuBook } from "react-icons/lu";
import { createFileRoute } from "@tanstack/react-router";
import { useTheme } from "@/Contexts/Theme/ThemeContext";
import { TbLayoutSidebarRightExpand } from "react-icons/tb";
import { Outlet, useNavigate } from "@tanstack/react-router";
import { useUserAuth } from "@/Contexts/UserAuth/AuthContext";
import UserAuthProvider from "@/Contexts/UserAuth/AuthProvider";

const User: FC = () => {
  const user = useUserAuth();
  const [homeRipple, homeEvent] = useRipple({ color: "currentColor" });
  const [openRipple, openEvent] = useRipple({ color: "currentColor" });
  const [bookRipple, bookEvent] = useRipple({ color: "currentColor" });
  const [closeRipple, closeEvent] = useRipple({ color: "currentColor" });
  const [themeRipple, themeEvent] = useRipple({ color: "currentColor" });
  const [authorRipple, authorEvent] = useRipple({ color: "currentColor" });
  const [settingsRipple, settingsEvent] = useRipple({ color: "currentColor" });

  const navigate = useNavigate();
  const { theme, applyTheme } = useTheme();
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
              onPointerDown={openEvent}
              ref={openRipple}
              className="p-2 hover:bg-primary btn btn-square btn-ghost bg-base-100 rounded-lg lg:hidden"
            >
              <GiHamburgerMenu className="size-6" />
            </label>
            <div className="p-2 font-black text-lg">CityLibrary</div>
          </div>
          <div className="flex gap-2">
            <div className="dropdown dropdown-bottom dropdown-left">
              <div tabIndex={0} role="button" className="avatar aspect-square">
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
                className="menu menu-md dropdown-content bg-base-300 rounded-box z-2 mt-4 w-64 p-4 shadow"
              >
                <li className="mb-2">
                  <span className="font-bold w-56 text-sm block overflow-hidden text-ellipsis whitespace-nowrap">
                    {user.userDetails?.username}
                  </span>
                </li>
                <li className="mb-2">
                  <span className="text-sm w-56 block overflow-hidden text-ellipsis whitespace-nowrap">
                    {user.userDetails?.email}
                  </span>
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
          <ul className="menu w-full grow gap-0.5">
            {/* List item */}
            <li>
              <button
                className="bg-base-300 hover:bg-primary p-2 is-drawer-close:tooltip is-drawer-close:tooltip-right is-drawer-open:h-10 max-h-10 rounded-b-sm rounded-t-lg is-drawer-close:justify-center is-drawer-close:aspect-square"
                data-tip="Homepage"
                onClick={() => {
                  navigate({ to: "/user" });
                }}
                ref={homeRipple}
                onPointerDown={homeEvent}
              >
                {/* Home icon */}
                <GoHomeFill className="size-6 text-accent" />
                <span className="is-drawer-close:hidden">Homepage</span>
              </button>
            </li>

            <li>
              <button
                className="bg-base-300 hover:bg-primary p-2 is-drawer-close:tooltip is-drawer-close:tooltip-right is-drawer-open:h-10 max-h-10 rounded-sm is-drawer-close:justify-center is-drawer-close:aspect-square"
                data-tip="Book"
                ref={bookRipple}
                onPointerDown={bookEvent}
                onClick={() => {
                  navigate({ to: "/user/books", params: { page: 1 } });
                }}
              >
                <LuBook className="size-6 text-accent" />
                <span className="is-drawer-close:hidden">Book</span>
              </button>
            </li>

            <li>
              <button
                className="bg-base-300 hover:bg-primary p-2 is-drawer-close:tooltip is-drawer-close:tooltip-right is-drawer-open:h-10 max-h-10 rounded-sm is-drawer-close:justify-center is-drawer-close:aspect-square"
                data-tip="Author"
                ref={authorRipple}
                onPointerDown={authorEvent}
                onClick={() => {
                  navigate({ to: "/user/authors", params: { page: 1 } });
                }}
              >
                <ImQuill className="size-6 text-accent" />
                <span className="is-drawer-close:hidden">Author</span>
              </button>
            </li>

            <li>
              <button
                className="bg-base-300 hover:bg-primary p-2 is-drawer-close:tooltip is-drawer-close:tooltip-right is-drawer-open:h-10 max-h-10 rounded-t-sm rounded-b-lg is-drawer-close:justify-center is-drawer-close:aspect-square"
                data-tip="Settings"
                onPointerDown={settingsEvent}
                ref={settingsRipple}
              >
                <LuSettings className="size-6 text-accent" />
                <span className="is-drawer-close:hidden">Settings</span>
              </button>
            </li>
          </ul>

          <ul className="drawer-end menu w-full grow flex-col-reverse gap-0.5">
            <li>
              <label
                aria-label="logout buttton"
                className="bg-error p-2 is-drawer-close:tooltip is-drawer-close:tooltip-right is-drawer-open:h-10 max-h-10 rounded-t-sm rounded-b-lg is-drawer-close:justify-center is-drawer-close:aspect-square"
                data-tip="Logout"
                onClick={() => {
                  if (user.userDetails !== null) {
                    user.logout(() => {
                      navigate({ to: "/login" });
                    });
                  }
                }}
              >
                <RiLogoutBoxLine className="size-6" />
                <span className="is-drawer-close:hidden">Logout</span>
              </label>
            </li>

            <li>
              <label
                htmlFor="my-drawer-4"
                aria-label="open sidebar"
                className="bg-base-300 hover:bg-primary p-2 is-drawer-close:tooltip is-drawer-close:tooltip-right is-drawer-open:h-10 max-h-10 rounded-sm is-drawer-close:justify-center is-drawer-close:aspect-square"
                data-tip="Toggle Drawer"
                onPointerDown={closeEvent}
                ref={closeRipple}
              >
                <TbLayoutSidebarRightExpand className="size-6 text-accent" />
                <span className="is-drawer-close:hidden">Close</span>
              </label>
            </li>

            <li>
              <label
                aria-label="change theme"
                className="bg-base-300 hover:bg-primary p-2 is-drawer-close:tooltip is-drawer-close:tooltip-right is-drawer-open:h-10 max-h-10 rounded-b-sm rounded-t-lg is-drawer-close:justify-center is-drawer-close:aspect-square"
                data-tip="Toggle Theme"
                onClick={() => applyTheme(theme === "dark" ? "light" : "dark")}
                onPointerDown={themeEvent}
                ref={themeRipple}
              >
                {theme == "light" ? (
                  <GoSun className="size-6 text-accent" />
                ) : (
                  <GoMoon className="size-6 text-accent" />
                )}
                <span className="is-drawer-close:hidden">{theme}</span>
              </label>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export const Route = createFileRoute("/user")({
  component: () => (
    <UserAuthProvider>
      <User />
    </UserAuthProvider>
  ),
});

import { cn } from "@/util/cn";
import { ImQuill } from "react-icons/im";
import { MdHistory } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { useRipple } from "use-ripple-hook";
import { GoHomeFill } from "react-icons/go";
import { GiHamburgerMenu } from "react-icons/gi";
import { authActions, useAuth } from "@/store/auth";
import RippleButton from "@/Components/RippleButton";
import { IoMdSunny, IoMdMoon } from "react-icons/io";
import { BiSolidBookAlt, BiBook } from "react-icons/bi";
import { createFileRoute } from "@tanstack/react-router";
import { useTheme } from "@/Contexts/Theme/ThemeContext";
import { TbLayoutSidebarRightExpandFilled } from "react-icons/tb";
import { Outlet, useNavigate, redirect, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/user")({
  component: User,
  beforeLoad: async (_) => {
    const res = await authActions.isSessionActive();
    if (!res) throw redirect({ to: "/login" });
  },
});

function User() {
  const auth = useAuth();
  const navigate = useNavigate();
  const { theme, applyTheme } = useTheme();
  const [openRipple, openEvent] = useRipple({ color: "currentColor" });
  const [closeRipple, closeEvent] = useRipple({ color: "currentColor" });

  return (
    <div className="drawer lg:drawer-open">
      <input id="side-rails" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <div className="flex flex-1 justify-baseline items-center flex-row">
            <label
              htmlFor="side-rails"
              aria-label="open sidebar"
              onPointerDown={openEvent}
              ref={openRipple}
              className="p-2 hover:bg-primary btn btn-circle btn-ghost lg:hidden"
            >
              <GiHamburgerMenu className="size-6" />
            </label>
            <Link to="/" className="btn btn-ghost text-xl gap-2 rounded-lg">
              <BiBook className="w-6 h-6 text-primary" />
              <span className="font-bold bg-gradient-to-right from-primary to-secondary bg-clip-text">
                CityLibrary
              </span>
            </Link>
          </div>
          <div className="flex gap-2">
            <div tabIndex={0} role="button" className="avatar aspect-square">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={
                    auth.user?.profile ||
                    import.meta.env.VITE_DEFAULT_USER_IMAGE
                  }
                />
              </div>
            </div>
          </div>
        </nav>
        <Outlet />
      </div>
      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="side-rails"
          aria-label="close sidebar"
          className="drawer-overlay"
        />
        <div
          className={cn(
            "flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64",
            // drawerInView ? "opacity-100 scale-100" : "opacity-0 scale-95",
          )}
        >
          {/* Sidebar content here */}
          <ul className="menu w-full grow gap-0.5 bg-base-100">
            {/* List item */}
            <li>
              <RippleButton
                className="bg-base-300 hover:bg-primary p-2 is-drawer-close:tooltip is-drawer-close:tooltip-right is-drawer-open:h-10 max-h-10 rounded-b-sm rounded-t-lg is-drawer-close:justify-center is-drawer-close:aspect-square"
                data-tip="Homepage"
                onClick={() => {
                  navigate({ to: "/user" });
                }}
              >
                {/* Home icon */}
                <GoHomeFill className="size-6 text-accent" />
                <span className="is-drawer-close:hidden">Homepage</span>
              </RippleButton>
            </li>

            <li>
              <RippleButton
                className="bg-base-300 hover:bg-primary p-2 is-drawer-close:tooltip is-drawer-close:tooltip-right is-drawer-open:h-10 max-h-10 rounded-sm is-drawer-close:justify-center is-drawer-close:aspect-square"
                data-tip="Book"
                onClick={() => {
                  navigate({ to: "/user/books", params: { page: 1 } });
                }}
              >
                <BiSolidBookAlt className="size-6 text-accent" />
                <span className="is-drawer-close:hidden">Book</span>
              </RippleButton>
            </li>

            <li>
              <RippleButton
                className="bg-base-300 hover:bg-primary p-2 is-drawer-close:tooltip is-drawer-close:tooltip-right is-drawer-open:h-10 max-h-10 rounded-sm is-drawer-close:justify-center is-drawer-close:aspect-square"
                data-tip="Author"
                onClick={() => {
                  navigate({ to: "/user/authors", params: { page: 1 } });
                }}
              >
                <ImQuill className="size-6 text-accent" />
                <span className="is-drawer-close:hidden">Author</span>
              </RippleButton>
            </li>

            <li>
              <RippleButton
                className="bg-base-300 hover:bg-primary p-2 is-drawer-close:tooltip is-drawer-close:tooltip-right is-drawer-open:h-10 max-h-10 rounded-t-sm rounded-b-lg is-drawer-close:justify-center is-drawer-close:aspect-square"
                data-tip="History"
              >
                <MdHistory className="size-6 text-accent" />
                <span className="is-drawer-close:hidden">History</span>
              </RippleButton>
            </li>
          </ul>

          <ul className="drawer-end menu w-full grow flex-col-reverse gap-0.5 bg-base-100">
            <li>
              <RippleButton
                aria-label="logout buttton"
                className="bg-error p-2 is-drawer-close:tooltip is-drawer-close:tooltip-right is-drawer-open:h-10 max-h-10 rounded-t-sm rounded-b-lg is-drawer-close:justify-center is-drawer-close:aspect-square"
                data-tip="Logout"
                onClick={() => {
                  if (auth.isAuthenticated) {
                    auth
                      .logout()
                      .then(() => {
                        navigate({ to: "/login" });
                      })
                      .catch(console.error);
                  }
                }}
              >
                <IoLogOut className="size-6 rotate-180" />
                <span className="is-drawer-close:hidden">Logout</span>
              </RippleButton>
            </li>

            <li>
              <label
                htmlFor="side-rails"
                aria-label="open sidebar"
                className="bg-base-300 hover:bg-primary p-2 is-drawer-close:tooltip is-drawer-close:tooltip-right is-drawer-open:h-10 max-h-10 rounded-sm is-drawer-close:justify-center is-drawer-close:aspect-square"
                data-tip="Toggle Drawer"
                onPointerDown={closeEvent}
                ref={closeRipple}
              >
                <TbLayoutSidebarRightExpandFilled className="is-drawer-close:rotate-180 size-6 text-accent" />
                <span className="is-drawer-close:hidden">Close</span>
              </label>
            </li>

            <li>
              <RippleButton
                aria-label="change theme"
                className="bg-base-300 hover:bg-primary p-2 is-drawer-close:tooltip is-drawer-close:tooltip-right is-drawer-open:h-10 max-h-10 rounded-b-sm rounded-t-lg is-drawer-close:justify-center is-drawer-close:aspect-square"
                data-tip="Toggle Theme"
                onClick={() => applyTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme == "light" ? (
                  <IoMdSunny className="size-6 text-accent" />
                ) : (
                  <IoMdMoon className="size-6 text-accent" />
                )}
                <span className="is-drawer-close:hidden">{theme}</span>
              </RippleButton>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

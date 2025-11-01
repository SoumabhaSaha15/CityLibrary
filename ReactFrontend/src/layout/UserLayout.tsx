import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { IoMenu, IoSunny, IoMoon, IoLogOutOutline } from "react-icons/io5";
import { useUserAuth } from "../context/Auth/UserAuthContext";
import { useTheme } from "@heroui/use-theme";
import UserCard from "../components/UserCard";
import {
  Navbar,
  NavbarContent,
  Button,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@heroui/react";
import LoadingPage from "../pages/global/Loading";

const UserLayout: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const { theme, setTheme } = useTheme();
  const auth = useUserAuth(),
    navigate = useNavigate();

  React.useEffect(() => {
    if (auth.userDetails === null)
      auth.login(
        () => {},
        () => navigate("/forms/user-login")
      );
  }, [navigate]);

  if (auth.userDetails === null) return <LoadingPage />;
  else
    return (
      <>
        <Navbar>
          <NavbarContent justify="start">
            <Button
              isIconOnly={true}
              size="md"
              radius="full"
              onPress={() => setIsDrawerOpen(true)}
              aria-label="Open drawer"
              variant="bordered"
              className="border-1.5"
              children={<IoMenu size={24} />}
            />
          </NavbarContent>
          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <h1 className="text-lg font-bold">City Library</h1>
          </NavbarContent>
          <NavbarContent justify="end">
            <Button
              size="md"
              className="text-xl"
              radius="full"
              isIconOnly
              endContent={
                theme === "dark" ? <IoSunny size={20} /> : <IoMoon size={20} />
              }
              onPress={() => setTheme(theme === "dark" ? "light" : "dark")}
            />
            <Popover placement={"bottom-end"}>
              <PopoverTrigger>
                <Avatar
                  name={auth.userDetails.username}
                  src={auth.userDetails.profile}
                />
              </PopoverTrigger>
              <PopoverContent children={<UserCard {...auth.userDetails} />} />
            </Popover>
          </NavbarContent>
        </Navbar>
        <React.Suspense fallback={<LoadingPage />} children={<Outlet />} />

        <Drawer
          isOpen={isDrawerOpen}
          placement="left"
          onOpenChange={setIsDrawerOpen}
          backdrop="blur"
        >
          <DrawerContent>
            <DrawerHeader>City Library</DrawerHeader>
            <DrawerBody>
              <Button
                size="md"
                className="text-xl"
                onPress={() => auth.logout(() => navigate("/forms/user-login"))}
                radius="sm"
                children="logout"
                color="danger"
                endContent={<IoLogOutOutline size={20} />}
              />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    );
};
export default UserLayout;

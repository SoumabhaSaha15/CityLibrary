import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { IoMenu, IoSunny, IoMoon, IoLogOutOutline } from "react-icons/io5";
import { useUserAuth } from "../context/Auth/UserAuthContext";
import { useTheme } from "@heroui/use-theme";
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
  User,
  Link
} from "@heroui/react";
import LoadingPage from "../pages/Loading";

const UserLayout: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const { theme, setTheme } = useTheme();
  const auth = useUserAuth();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (auth.userDetails === null) auth.login(() => { }, () => { navigate('/forms/user-login') })
  }, []);
  if (auth.userDetails === null) return <LoadingPage />;
  else return (
    <>
      <Navbar>
        <NavbarContent justify="start">
          <Button
            isIconOnly={true}
            size="md"
            radius="full"
            onPress={() => setIsDrawerOpen(true)}
            aria-label="Open drawer"
            children={<IoMenu size={24} />}
          />
        </NavbarContent>

        <NavbarContent justify="end">
          <Popover placement={"bottom-end"}>
            <PopoverTrigger>
              <Avatar name={auth.userDetails.username} src={auth.userDetails.profile} />
            </PopoverTrigger>
            <PopoverContent
              children={
                <User
                  name={auth.userDetails.username}
                  avatarProps={{ src: auth.userDetails.profile, }}
                  description={
                    <Link
                      isExternal
                      href={`mailto://${auth.userDetails.email}`}
                      size="sm"
                      children={auth.userDetails.email}
                    />
                  }
                />
              }
            />
          </Popover>
        </NavbarContent>

      </Navbar>

      <React.Suspense fallback={<LoadingPage />} children={<Outlet />} />

      <Drawer isOpen={isDrawerOpen} placement="left" onOpenChange={setIsDrawerOpen} backdrop="blur">
        <DrawerContent>
          <DrawerHeader>City Library</DrawerHeader>
          <DrawerBody>
            <Button
              size="md"
              className="text-xl"
              radius="sm"
              endContent={theme === 'dark' ? <IoSunny size={20} /> : <IoMoon size={20} />}
              onPress={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              children={theme}
            />
            <Button
              size="md"
              className="text-xl"
              onPress={() => auth.logout(() => { navigate('/forms/user-login'); })}
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
}
export default UserLayout;
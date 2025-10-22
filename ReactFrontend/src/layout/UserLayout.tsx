import React from "react";
import { Outlet } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { FaSun, FaMoon } from "react-icons/fa";
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
  PopoverContent
} from "@heroui/react";
import LoadingPage from "../pages/Loading";

const UserLayout: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const { theme, setTheme } = useTheme();
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
            children={<IoMenu size={24} />}
          />
        </NavbarContent>

        <NavbarContent justify="end">
          <Popover color="secondary" placement={"bottom-end"}>
          <PopoverTrigger>
            <Avatar name="junior"/>
          </PopoverTrigger>
          <PopoverContent children="hello"/>
        </Popover>
        </NavbarContent>

      </Navbar>

      <React.Suspense fallback={<LoadingPage />} children={<Outlet />} />

      <Drawer isOpen={isDrawerOpen} placement="left" onOpenChange={setIsDrawerOpen}>
        <DrawerContent>
          <DrawerHeader>Drawer Title</DrawerHeader>
          <DrawerBody>
            <Button
              radius="full"
              size="sm"
              className="text-xl"
              fullWidth={false}
              endContent={theme === 'dark' ? <FaSun size={20} /> : <FaMoon size={20} />}
              onPress={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              children={theme+" mode"}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
export default UserLayout;
import React from "react";
import { BiBook } from "react-icons/bi";
import { Outlet } from "react-router-dom";
import { useTheme } from "@heroui/use-theme";
import { IoMdSunny, IoMdMoon } from "react-icons/io";
import { Navbar, NavbarBrand, NavbarContent, Button } from "@heroui/react";
const AuthFormsLayout: React.FC = () => {
  const { theme, setTheme } = useTheme();
  return (
    <>
      <Navbar isBordered>
        <NavbarContent>
          <NavbarBrand>
            <BiBook size={24} />
            <p className="font-bold text-inherit ml-2">CityLibrary</p>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent justify="end">
          <Button
            radius="full"
            size="sm"
            variant="ghost"
            isIconOnly={true}
            onPress={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <IoMdSunny size={20} /> : <IoMdMoon size={20} />}
          </Button>
        </NavbarContent>
      </Navbar>
      <Outlet />
    </>
  );
};

export default AuthFormsLayout;

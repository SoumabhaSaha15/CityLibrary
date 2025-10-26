import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { IoMenu, IoSunny, IoMoon, IoLogOutOutline } from "react-icons/io5";
import { useUserAuth } from "../context/Auth/UserAuthContext";
import { useTheme } from "@heroui/use-theme";
import { type ResponseSchema } from "../validator/user-auth";
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
  CardHeader,
  Card,
  CardFooter,
  Image,
  addToast,
} from "@heroui/react";
import LoadingPage from "../pages/Loading";
const UserCard: React.FC<ResponseSchema> = (props) => {
  return (
    <Card
      isFooterBlurred
      className="w-full h-[240px] col-span-12 sm:col-span-5"
    >
      <CardHeader className="absolute z-10 top-1 flex-col items-start bg-background/30">
        <h4 className="text-content1-foreground font-medium text-2xl">
          {props.username}
        </h4>
      </CardHeader>
      <Image
        removeWrapper
        alt={props.username + " profile"}
        className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
        src={props.profile}
      />
      <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
        <div>
          <p className="text-black text-tiny">{props.email}</p>
        </div>
        <Button
          className="text-tiny"
          color="primary"
          radius="full"
          size="sm"
          onPress={() => {
            addToast({
              title: "emil copied.",
              description: `${props.email} copied to clipboard.`,
              color: "primary",
            });
            navigator.clipboard.writeText(props.email);
          }}
        >
          Copy
        </Button>
      </CardFooter>
    </Card>
  );
};

const UserLayout: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const { theme, setTheme } = useTheme();
  const auth = useUserAuth();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (auth.userDetails === null)
      auth.login(
        () => {},
        () => {
          navigate("/forms/user-login");
        }
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
                radius="sm"
                endContent={
                  theme === "dark" ? (
                    <IoSunny size={20} />
                  ) : (
                    <IoMoon size={20} />
                  )
                }
                onPress={() => setTheme(theme === "dark" ? "light" : "dark")}
                children={theme}
              />
              <Button
                size="md"
                className="text-xl"
                onPress={() => {
                  auth.logout(() => {
                    navigate("/forms/user-login");
                  });
                }}
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

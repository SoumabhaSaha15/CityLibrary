import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Avatar,
  addToast,
} from "@heroui/react";
import { IoCopy, IoLogOutOutline } from "react-icons/io5";
import { type ResponseSchema } from "../validator/user-auth";

const UserCard: React.FC<ResponseSchema & { logout: () => void }> = (props) => {
  const copyEmail = () => {
    navigator.clipboard
      .writeText(props.email)
      .then(() => {
        addToast({
          title: "Email copied",
          description: `${props.email} copied to clipboard.`,
          color: "primary",
        });
      })
      .catch((err) => {
        console.error("Failed to copy email: ", err);
        addToast({
          title: "Failed to copy",
          description: "Could not copy email to clipboard.",
          color: "danger",
        });
      });
  };
  return (
    <Card className="max-w-[300px]" shadow="none">
      <CardHeader className="flex gap-3 p-4 justify-center place-items-center">
        <Avatar
          src={props.profile}
          size="lg"
          radius="md"
          className="flex-shrink-0"
        />
        <div className="flex flex-col flex-1 min-w-0">
          <h4 className="text-lg font-semibold truncate">{props.username}</h4>
        </div>
      </CardHeader>

      <CardBody className="pt-0 px-4">
        <Button
          fullWidth
          size="lg"
          color="primary"
          variant="flat"
          radius="full"
          className="text-ellipsis"
          endContent={<IoCopy className="text-base" />}
          children={props.email}
          onPress={copyEmail}
        />
      </CardBody>
      <CardFooter className="p-4 pt-0">
        <Button
          fullWidth
          size="lg"
          color="danger"
          // variant="light" // 'light' variant often looks good in footers
          radius="full"
          children={"Logout"}
          endContent={<IoLogOutOutline className="text-base" />}
          onPress={props.logout}
        />
      </CardFooter>
    </Card>
  );
};

export default UserCard;

import { Card, CardHeader, Button, Avatar, addToast } from "@heroui/react";
import { IoCopy } from "react-icons/io5";
import { type ResponseSchema } from "../validator/user-auth";
const UserCard: React.FC<ResponseSchema> = (props) => {
  return (
    <Card className="max-w-[300px] border-0 shadow-none" shadow="sm">
      <CardHeader className="flex gap-3 p-4">
        <Avatar
          src={props.profile}
          size="lg"
          radius="sm"
          className="flex-shrink-0"
        />
        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <h4 className="text-lg font-semibold truncate">{props.username}</h4>
          <div className="flex items-center gap-1 text-default-500">
            <Button
              fullWidth
              size="sm"
              color="primary"
              variant="flat"
              startContent={<IoCopy className="text-base" />}
              onPress={() => {
                addToast({
                  title: "Email copied",
                  description: `${props.email} copied to clipboard.`,
                  color: "primary",
                });
                navigator.clipboard.writeText(props.email);
              }}
            >
              Copy Email
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};
export default UserCard;

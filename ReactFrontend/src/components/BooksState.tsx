import { type FC } from "react";
import { Spinner, Card, CardHeader, CardBody } from "@heroui/react";
import { IoWarningOutline } from "react-icons/io5";
export const LoadingState: FC = () => (
  <div className="flex justify-center items-center min-h-[400px]">
    <Spinner label="Loading books..." size="lg" />
  </div>
);

export const ErrorState: FC<{ error: string }> = ({ error }) => (
  <Card className="p-4 bg-danger-50 text-danger-700 max-w-md mx-auto">
    <CardHeader className="flex gap-2 items-center">
      <IoWarningOutline size={24} />
      <p className="font-bold text-lg">Failed to load books</p>
    </CardHeader>
    <CardBody>
      <p>{error}</p>
    </CardBody>
  </Card>
);

export const EmptyState: FC = () => (
  <div className="text-center text-default-500 min-h-[400px] flex flex-col justify-center items-center">
    <p className="text-lg font-medium">No books found.</p>
    <p>Try adjusting your search query.</p>
  </div>
);

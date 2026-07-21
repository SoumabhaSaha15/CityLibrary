import { cn } from "@/util/cn";
import { BiLoaderAlt } from "react-icons/bi";

const LoadingPage = () => {
  return (
    <div
      className={cn(
        "flex items-center justify-center p-6 custom-grad",
        location.pathname.startsWith("/user")
          ? "min-h-[calc(100dvh-4rem)]"
          : "min-h-dvh",
      )}
    >
      <div className="card bg-base-100 border border-base-200/80 shadow-xl max-w-sm w-full p-6 text-center rounded-2xl">
        <div className="flex justify-center mb-4">
          <BiLoaderAlt className="w-12 h-12 text-primary animate-spin" />
        </div>
        <h2 className="text-xl font-semibold text-base-content mb-1">
          Loading...
        </h2>
        <p className="text-sm text-base-content/60 mb-6">
          Fetching requested data
        </p>
        <progress className="progress progress-primary w-full h-1.5"></progress>
      </div>
    </div>
  );
};

export default LoadingPage;

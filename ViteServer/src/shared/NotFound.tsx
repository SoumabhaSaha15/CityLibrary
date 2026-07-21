import { cn } from "@/util/cn";
import { MdOutlineBrokenImage } from "react-icons/md";
import { Link, useRouter } from "@tanstack/react-router";

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <div
      className={cn(
        "flex items-center justify-center p-6 custom-grad",
        location.pathname.startsWith("/user")
          ? "min-h-[calc(100dvh-4rem)]"
          : "min-h-dvh",
      )}
    >
      <div className="card bg-base-100 border border-base-200/80 shadow-xl max-w-md w-full p-8 text-center rounded-2xl">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-error/10 flex items-center justify-center text-error">
          <MdOutlineBrokenImage className="w-8 h-8" />
        </div>

        <span className="text-sm font-semibold tracking-wider text-error uppercase">
          Error 404
        </span>
        <h1 className="text-3xl font-bold text-base-content mt-1 mb-2">
          Page Not Found
        </h1>
        <p className="text-sm text-base-content/70 mb-6">
          The route you are looking for does not exist or has been moved.
        </p>
        <div className="flex flex-row gap-3">
          <button
            className="btn btn-outline flex-1 gap-2 rounded-xl"
            onClick={() => router.history.back()}
          >
            Back
          </button>
          <Link to="/" className="btn btn-primary flex-1 gap-2 rounded-xl">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

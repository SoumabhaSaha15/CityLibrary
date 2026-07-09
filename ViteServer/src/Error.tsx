// ErrorPage.tsx
import { MdError } from "react-icons/md";
import { BiErrorCircle } from "react-icons/bi";
import { FaBug, FaRedo, FaHome } from "react-icons/fa";
import { type ErrorComponentProps } from "@tanstack/react-router";

const ErrorPage = (props: ErrorComponentProps) => {
  return (
    <div className="min-h-[calc(100dvh-64px)] flex items-center justify-center p-4">
      <div className="card bg-base-100 shadow-2xl max-w-2xl w-full">
        <div className="card-body items-center text-center">
          <div className="relative mb-8">
            <BiErrorCircle className="w-32 h-32 text-error opacity-20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <FaBug className="w-16 h-16 text-error animate-pulse" />
            </div>
          </div>

          <h1 className="card-title text-4xl sm:text-5xl font-bold mb-4 text-error">
            {props.error.message}
          </h1>

          <p className="text-lg text-base-content/70 mb-8 max-w-md">
            {props.info?.componentStack || "no info"}
          </p>

          <div className="alert alert-error shadow-lg mb-8 max-w-md rounded-full">
            <MdError className="w-6 h-6" />
            <span>Unable to process your request</span>
          </div>

          <div className="card-actions flex-col sm:flex-row gap-3">
            <button
              className="btn btn-error btn-lg gap-2 rounded-full"
              onClick={() => {
                props.reset();
              }}
            >
              <FaRedo className="w-5 h-5" />
              Try Again
            </button>
            <button className="btn btn-outline btn-lg gap-2 rounded-full">
              <FaHome className="w-5 h-5" />
              Go Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;

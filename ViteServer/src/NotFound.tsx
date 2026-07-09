// NotFoundPage.tsx
import { FaExclamationTriangle, FaHome, FaArrowLeft } from "react-icons/fa";
import { MdError } from "react-icons/md";

const NotFoundPage = () => {
  return (
    <div className="min-h-[calc(100dvh-64px)] flex items-center justify-center p-4">
      <div className="card bg-base-100 shadow-2xl max-w-2xl w-full">
        <div className="card-body items-center text-center">
          <div className="relative mb-8">
            <MdError className="w-32 h-32 text-error opacity-20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-8xl font-bold text-error">404</span>
            </div>
          </div>

          <h1 className="card-title text-4xl sm:text-5xl font-bold mb-4">
            Page Not Found
          </h1>

          <p className="text-lg text-base-content/70 mb-8 max-w-md">
            Oops! The page you're looking for doesn't exist. It might have been
            moved or deleted.
          </p>

          <div className="alert alert-warning shadow-lg mb-8 max-w-md rounded-full">
            <FaExclamationTriangle className="w-6 h-6" />
            <span>The requested URL was not found on this server</span>
          </div>

          <div className="card-actions flex-col sm:flex-row gap-3">
            <button className="btn btn-primary btn-lg gap-2 rounded-full">
              <FaHome className="w-5 h-5" />
              Go Home
            </button>
            <button className="btn btn-outline btn-lg gap-2 rounded-full">
              <FaArrowLeft className="w-5 h-5" />
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

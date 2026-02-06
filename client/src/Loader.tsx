import { BiLoaderAlt } from "react-icons/bi";

const LoadingPage = () => {
  return (
    <div className="min-h-[calc(100dvh-64px)] flex items-center justify-center p-4">
      <div className="card bg-base-100 shadow-2xl max-w-md w-full">
        <div className="card-body items-center text-center">
          <div className="relative mb-8">
            <BiLoaderAlt className="w-24 h-24 text-primary animate-spin" />
          </div>

          <h2 className="card-title text-3xl sm:text-4xl font-bold mb-4">
            Loading...
          </h2>

          <p className="text-lg text-base-content/70 mb-6">
            Please wait while we fetch your data
          </p>

          <div className="w-full max-w-xs">
            <progress className="progress progress-primary w-full"></progress>
          </div>

          <div className="flex gap-2 mt-6">
            <span className="loading loading-dots loading-lg text-primary"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;

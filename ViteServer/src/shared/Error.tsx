import { ZodError } from "zod";
import { AxiosError } from "axios";
import { MdErrorOutline } from "react-icons/md";
import { FaBug, FaFileCode, FaServer } from "react-icons/fa";
import { Link, type ErrorComponentProps } from "@tanstack/react-router";
import { cn } from "@/util/cn";

interface ErrorCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  children?: React.ReactNode;
  reset: () => void;
}

const ErrorCard = ({
  icon,
  title,
  subtitle,
  children,
  reset,
}: ErrorCardProps) => (
  <div
    className={cn(
      "flex items-center justify-center p-6 custom-grad",
      location.pathname.startsWith("/user")
        ? "min-h-[calc(100dvh-4rem)]"
        : "min-h-dvh",
    )}
  >
    <div className="card bg-base-100 border border-base-200/80 shadow-xl max-w-xl w-full p-6 sm:p-8 rounded-2xl">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl bg-warning/10 text-warning flex items-center justify-center">
          {icon}
        </div>
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider">
            {subtitle}
          </span>
          <h1 className="text-xl font-bold text-base-content">{title}</h1>
        </div>
      </div>
      {children}
      <div className="flex gap-3">
        <button className="btn btn-warning flex-1 rounded-xl" onClick={reset}>
          Retry
        </button>
        <Link to="/" className="btn btn-outline flex-1 rounded-xl">
          Home
        </Link>
      </div>
    </div>
  </div>
);

const ZodErrorView = ({
  error,
  reset,
}: {
  error: ZodError;
  reset: () => void;
}) => (
  <ErrorCard
    icon={<FaFileCode className="w-6 h-6" />}
    title="Invalid Data Format"
    subtitle="Validation Error"
    reset={reset}
  >
    <p className="text-sm text-base-content/70 mb-4">
      Failed schema validation:
    </p>
    <div className="bg-base-200/50 border border-base-200 rounded-xl p-3 mb-6 max-h-60 overflow-y-auto space-y-2">
      {error.issues.map((issue, idx) => (
        <div
          key={idx}
          className="flex items-start justify-between gap-3 text-xs bg-base-100 p-2.5 rounded-lg"
        >
          <code className="font-mono text-warning font-semibold">
            {issue.path.length > 0 ? issue.path.join(".") : "root"}
          </code>
          <span className="text-base-content/80 text-right">
            {issue.message}
          </span>
        </div>
      ))}
    </div>
  </ErrorCard>
);

const AxiosErrorView = ({
  error,
  reset,
}: {
  error: AxiosError;
  reset: () => void;
}) => {
  const statusCode = error.response?.status ?? "Network Error";
  const method = error.config?.method?.toUpperCase();
  const url = error.config?.url;

  return (
    <ErrorCard
      icon={<FaServer className="w-6 h-6" />}
      title="Server Request Failed"
      subtitle={`API Error • ${statusCode}`}
      reset={reset}
    >
      <div className="alert alert-error/10 text-error border border-error/20 rounded-xl mb-4 text-sm font-medium gap-2">
        <MdErrorOutline className="w-5 h-5" />
        <span>{error.message}</span>
      </div>
      {(method || url) && (
        <div className="bg-base-200/50 border border-base-200 rounded-xl p-3 mb-6 font-mono text-xs text-base-content/70 flex gap-2 overflow-x-auto">
          {method && (
            <span className="badge badge-sm badge-neutral uppercase">
              {method}
            </span>
          )}
          <span className="truncate">{url || "Unknown"}</span>
        </div>
      )}
    </ErrorCard>
  );
};

const UnexpectedErrorView = ({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) => (
  <div className="min-h-[calc(100dvh-4rem)] flex items-center justify-center p-6">
    <div className="card bg-base-100 border border-base-200/80 shadow-xl max-w-lg w-full p-6 sm:p-8 rounded-2xl text-center">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-error/10 flex items-center justify-center text-error">
        <FaBug className="w-8 h-8 animate-pulse" />
      </div>
      <span className="text-xs font-semibold tracking-wider text-error uppercase">
        Unexpected Error
      </span>
      <h1 className="text-2xl font-bold text-base-content mt-2 mb-4">
        Something went wrong
      </h1>
      <div className="alert alert-error/10 text-error text-sm mb-6 rounded-xl border border-error/20 text-left">
        {error.message || "Unknown error"}
      </div>
      <div className="flex gap-3">
        <button
          className="btn btn-error flex-1 text-white rounded-xl"
          onClick={reset}
        >
          Retry
        </button>
        <Link to="/" className="btn btn-outline flex-1 rounded-xl">
          Home
        </Link>
      </div>
    </div>
  </div>
);

export default function ErrorPage({ error, reset }: ErrorComponentProps) {
  return error instanceof ZodError ? (
    <ZodErrorView error={error} reset={reset} />
  ) : error instanceof AxiosError ? (
    <AxiosErrorView error={error} reset={reset} />
  ) : (
    <UnexpectedErrorView error={error as Error} reset={reset} />
  );
}

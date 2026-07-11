import { useAuth } from "@/store/auth";
import { FaIdBadge } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import RippleButton from "@/Components/RippleButton";
import { createFileRoute } from "@tanstack/react-router";
import { useToast, DefaultOptions } from "@/Contexts/Toast/ToastContext";

export const Route = createFileRoute("/user/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useAuth();
  const toast = useToast();
  if (user === null) return <></>;
  return (
    <div className="page-height min-h-[calc(100dvh-64px)] grid place-items-center bg-base-200 p-4">
      <div className="card bg-base-100 shadow-sm sm:card-side max-w-72 sm:max-w-xl">
        <figure className="px-10 pt-10 sm:px-6 sm:py-6">
          <img
            src={user.profile}
            alt={user.username}
            className="rounded-lg sm:h-40 sm:w-40 sm:object-cover"
          />
        </figure>
        <div className="card-body">
          <div className="w-full flex justify-center sm:justify-start">
            <span className="badge badge-primary">
              <FaIdBadge className="h-4 w-4" />
              Library Member
            </span>
          </div>

          <h2
            className="card-title justify-center sm:justify-start"
            title={user.username}
          >
            {user.username}
          </h2>
          <p className="overflow-hidden text-ellipsis">{user.email}</p>
          <div className="card-actions justify-center sm:justify-end">
            <RippleButton
              className="btn btn-primary"
              onClick={() => {
                navigator.clipboard.writeText(user.email);
                toast.open("copied", true, 1000, DefaultOptions.success);
              }}
            >
              <MdAlternateEmail className="h-4 w-4 shrink-0" />
              copy mail
            </RippleButton>
          </div>
        </div>
      </div>
    </div>
  );
}

import { FaIdBadge } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { createFileRoute } from "@tanstack/react-router";
import { useUserAuth } from "@/Contexts/UserAuth/AuthContext";
import { useRipple } from "use-ripple-hook";
export const Route = createFileRoute("/user/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [mailRipple, mailEvent] = useRipple();
  const { userDetails } = useUserAuth();
  if (userDetails == null) return <></>;
  return (
    <div className="page-height min-h-[calc(100dvh-64px)] grid place-items-center bg-base-200 p-4">
      <div className="card bg-base-100 shadow-sm sm:card-side max-w-72 sm:max-w-xl">
        <figure className="px-10 pt-10 sm:px-6 sm:py-6">
          <img
            src={userDetails.profile}
            alt={userDetails.username}
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
            title={userDetails.username}
          >
            {userDetails.username}
          </h2>
          <p className="overflow-hidden text-ellipsis">{userDetails.email}</p>
          <div className="card-actions justify-center sm:justify-end">
            <button
              className="btn btn-primary"
              ref={mailRipple}
              onPointerDown={mailEvent}
              onClick={() => {
                navigator.clipboard.writeText(userDetails.email);
              }}
            >
              <MdAlternateEmail className="h-4 w-4 shrink-0" />
              copy mail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { cn } from "@/util/cn";
import { useAuth } from "@/store/auth";
import * as qrCode from "@zag-js/qr-code";
import { useState, useId, useEffect } from "react";
import RippleButton from "@/components/RippleButton";
import { useThrottledCallback } from "@tanstack/react-pacer";
import { useToast } from "@/contexts/Toast/ToastContext";
import { createFileRoute } from "@tanstack/react-router";
import { FaCircleUser, FaQrcode } from "react-icons/fa6";
import { useMachine, normalizeProps } from "@zag-js/react";

export const Route = createFileRoute("/user/")({
  component: RouteComponent,
});

function RouteComponent() {
  const toast = useToast();
  const { user } = useAuth();
  const navigate = Route.useNavigate();
  if (user === null) return navigate({ to: "/login" });

  const [activeTab, setActiveTab] = useState<"user-id" | "qr-code">("user-id");
  const [isMobileView, setIsMobileView] = useState<boolean>(
    window.innerWidth <= 640,
  );
  const handleResize = useThrottledCallback(
    () => setIsMobileView(window.innerWidth <= 640),
    { wait: 250, key: "window-resize-handler" },
  );

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  const service = useMachine(qrCode.machine, {
    id: useId(),
    value: JSON.stringify(user, ["username", "email"]),
  });

  const api = qrCode.connect(service, normalizeProps);

  return (
    <>
      {/* tabs */}
      {!isMobileView && (
        <div role="tablist" className="tabs tabs-border custom-grad">
          <label className="tab">
            <input
              type="radio"
              onChange={() => setActiveTab("user-id")}
              name="current-page"
              defaultChecked={activeTab === "user-id"}
            />
            <FaCircleUser size={12} />
            &nbsp; user-id
          </label>
          <label className="tab">
            <input
              type="radio"
              onChange={() => setActiveTab("qr-code")}
              name="current-page"
              defaultChecked={activeTab === "qr-code"}
            />
            <FaQrcode size={12} />
            &nbsp; qr-code
          </label>
        </div>
      )}
      {/* content */}
      <div
        className={cn(
          "page-height grid place-items-center custom-grad p-4",
          isMobileView
            ? "min-h-[calc(100dvh-8rem)]"
            : "min-h-[calc(100dvh-5rem)]",
        )}
      >
        {/* user id */}
        <div
          className={cn(
            activeTab == "user-id" ? "hero min-h-full px-4 py-8" : "hidden",
          )}
        >
          <div className="hero-content flex-col lg:flex-row-reverse w-full max-w-6xl gap-8">
            <div className="text-center lg:text-left lg:flex-1">
              <h1 className="text-3xl sm:text-4xl font-bold text-secondary text-shadow-lg transition">
                CityLibrary Member ID Card
              </h1>
            </div>
            <div className="card bg-base-300 w-full max-w-sm lg:max-w-md shrink-0 shadow-md hover:scale-110 transition-transform">
              <div className="card-body p-4 sm:p-8">
                <form className="fieldset space-y-4" aria-label="user-id-card">
                  {/* <label aria-label="Upload profile picture"> */}
                  <div className="avatar grid place-items-center">
                    <div className="w-36">
                      <img
                        src={user.profile}
                        alt="profile-pic"
                        className="rounded-lg"
                      />
                    </div>
                  </div>
                  {/* </label> */}

                  <div>
                    <label className="floating-label">
                      <span className="bg-transparent font-black">
                        Username
                      </span>
                      <input
                        type="text"
                        className="validator input input-bordered w-full focus:outline-none focus:ring-0 focus:ring-accent"
                        value={user.username}
                        readOnly={true}
                      />
                    </label>
                  </div>

                  <div>
                    <label className="floating-label">
                      <span className="bg-transparent font-black">Email</span>
                      <input
                        type="email"
                        className="validator input input-bordered w-full focus:outline-none focus:ring-0 focus:ring-accent"
                        value={user.email}
                        readOnly={true}
                      />
                    </label>
                  </div>

                  <RippleButton
                    className="btn btn-primary w-full hover:btn-secondary"
                    type="button"
                    onClick={() => {
                      window.navigator.clipboard.writeText(user.email);
                      toast.open("email copied");
                    }}
                  >
                    Copy Email
                  </RippleButton>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* qr code*/}
        <div
          className={cn(
            activeTab == "qr-code" ? "hero min-h-full px-4 py-8" : "hidden",
          )}
        >
          <div className="hero-content flex-col lg:flex-row w-full max-w-6xl gap-8">
            <div className="text-center lg:text-left lg:flex-1">
              <h1 className="text-4xl sm:text-5xl font-bold text-secondary text-shadow-lg transition">
                CityLibrary Member QR
              </h1>
            </div>
            <div className="card bg-base-300 w-full max-w-sm lg:max-w-md shrink-0 shadow-md hover:scale-110 transition-transform">
              <div className="card-body p-4 sm:p-8">
                <form className="fieldset space-y-4" aria-label="user-id-card">
                  {/* <label aria-label="Upload profile picture"> */}
                  <div className="avatar grid place-items-center">
                    <div
                      className="w-[90%] bg-white shadow-lg rounded-lg hover:shadow-accent/80 hover:shadow-md"
                      {...api.getRootProps()}
                    >
                      <svg {...api.getFrameProps()}>
                        <path {...api.getPatternProps()} />
                      </svg>
                      <div {...api.getOverlayProps()}>
                        <img
                          src={user.profile}
                          className="aspect-square w-8 sm:w-14 rounded-lg"
                          alt={user.username}
                        />
                      </div>
                    </div>
                  </div>
                  {/* </label> */}

                  <RippleButton
                    className="btn btn-primary w-full hover:btn-secondary"
                    type="button"
                    onClick={() => {
                      window.navigator.clipboard.writeText(api.value);
                      toast.open("data copied");
                    }}
                  >
                    Copy Data
                  </RippleButton>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* dock */}
      {isMobileView && (
        <div className="custom-position-unset dock dock-md bg-base-300 is-drawer-close:left-14 is-drawer-close:w-[calc(100%-7rem)] is-drawer-open:left-64 is-drawer-open:w-[calc(100%-32rem)]">
          <RippleButton
            className={cn(
              "rounded-full bg-base-100 text-base-content hover:bg-primary",
              activeTab == "user-id" && "bg-accent text-accent-content",
            )}
            onClick={() => setActiveTab("user-id")}
          >
            <FaCircleUser />
            <span className="dock-label">user-id</span>
          </RippleButton>

          <RippleButton
            className={cn(
              "rounded-full bg-base-100 text-base-content hover:bg-primary",
              activeTab == "qr-code" && "bg-accent text-accent-content",
            )}
            onClick={() => setActiveTab("qr-code")}
          >
            <FaQrcode />
            <span className="dock-label">qr-code</span>
          </RippleButton>
        </div>
      )}
    </>
  );
}

import { cn } from "@/util/cn";
import { useState } from "react";
import { authActions } from "@/store/auth";
import RippleButton from "@/Components/RippleButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { loginSchema, type LoginSchema } from "@/validators/user-auth";
import { useToast, DefaultOptions } from "@/Contexts/Toast/ToastContext";
import {
  createFileRoute,
  useNavigate,
  Link,
  redirect,
} from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
  beforeLoad: async ({ context: { auth } }) => {
    const res = await authActions.isSessionActive();
    if (auth && res) throw redirect({ to: "/user" });
  },
});

function RouteComponent() {
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState<"text" | "password">(
    "password",
  );
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({ resolver: zodResolver(loginSchema) });
  const toast = useToast();

  const login: SubmitHandler<LoginSchema> = async (data) => {
    try {
      await authActions.loginWithCred(data);
      reset();
      toast.open("login successfull", true, 1000, DefaultOptions.success);
      navigate({ to: "/user" });
    } catch (error) {
      toast.open((error as Error).message, true, 1000, DefaultOptions.error);
    }
  };

  return (
    <>
      <div className="min-h-dvh scroll-smooth transition-all snap-y snap-mandatory">
        <div className="hero min-h-screen px-4 py-8">
          <div className="hero-content flex-col lg:flex-row w-full max-w-6xl gap-8">
            <div className="text-center lg:text-left lg:flex-1">
              <h1 className="text-4xl sm:text-5xl font-bold text-secondary text-shadow-lg transition">
                Login to your account
              </h1>
              <p className="py-6 px-2 sm:px-6">
                Donot have an account&nbsp;
                <Link to="/signup" className="link link-accent">
                  signup
                </Link>
              </p>
            </div>
            <div className="card bg-base-100 w-full max-w-sm lg:max-w-md shrink-0 shadow-lg rounded-lg hover:scale-110 transition-transform">
              <div className="card-body p-4 sm:p-8">
                <form
                  className="fieldset space-y-4"
                  onSubmit={handleSubmit(login)}
                >
                  <div>
                    <label className="floating-label" htmlFor="NameInput">
                      <span
                        className={cn(
                          "transition-colors duration-300",
                          errors.username && "text-error text-sm ml-2",
                        )}
                      >
                        {errors.username ? errors.username.message : "Username"}
                      </span>
                      <input
                        type="text"
                        className={cn(
                          "validator input input-bordered w-full focus:outline-none focus:ring-0 rounded-lg focus:ring-accent",
                          errors.username && "focus:ring-error",
                        )}
                        id="NameInput"
                        {...register("username")}
                        placeholder="Your name"
                        autoComplete="name"
                        disabled={isSubmitting}
                        required
                      />
                    </label>
                  </div>

                  <div>
                    <label className="floating-label" htmlFor="PasswordInput">
                      <span
                        className={cn(
                          "transition-colors duration-300",
                          errors.password && "text-error text-sm ml-2",
                        )}
                      >
                        {errors.password ? errors.password.message : "Password"}
                      </span>
                      <input
                        type={passwordType}
                        className={cn(
                          "validator input input-bordered w-full focus:outline-none focus:ring-0 focus:ring-accent rounded-lg",
                          errors.password && "focus:ring-error",
                        )}
                        id="PasswordInput"
                        {...register("password")}
                        placeholder="****"
                        autoComplete="new-password"
                        disabled={isSubmitting}
                        required
                      />
                    </label>
                  </div>

                  <label className="label justify-between">
                    Show password
                    <input
                      type="checkbox"
                      className="checkbox"
                      onInput={() =>
                        setPasswordType((prev) =>
                          prev == "password" ? "text" : "password",
                        )
                      }
                    />
                  </label>

                  <RippleButton
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary w-full hover:btn-secondary rounded-lg"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="loading loading-dots loading-md text-accent" />
                        Submitting...
                      </>
                    ) : (
                      <>Submit</>
                    )}
                  </RippleButton>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

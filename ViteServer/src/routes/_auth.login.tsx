import { cn } from "@/util/cn";
import { useState } from "react";
import { authActions } from "@/store/auth";
import { useForm } from "@tanstack/react-form";
import RippleButton from "@/components/RippleButton";
import { useToast } from "@/contexts/Toast/ToastContext";
import { loginSchema, type LoginSchema } from "@/validators/user-auth";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const toast = useToast();
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState<"text" | "password">(
    "password",
  );

  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    } satisfies LoginSchema,
    validators: {
      onChange: loginSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await authActions.loginWithCred(value);
        form.reset();
        toast.open("login successfull", "alert-success");
        navigate({ to: "/user" });
      } catch (error) {
        toast.open((error as Error).message, "alert-error");
      }
    },
  });

  return (
    <>
      <div className="min-h-dvh scroll-smooth transition-all snap-y snap-mandatory custom-grad">
        <div className="hero min-h-screen px-4 py-8">
          <div className="hero-content flex-col lg:flex-row w-full max-w-6xl gap-8">
            <div className="text-center lg:text-left lg:flex-1">
              <h1 className="text-4xl sm:text-5xl font-bold text-secondary text-shadow-lg transition">
                Login to your account
              </h1>
              <p className="py-6 px-2 sm:px-6">
                Donot have an account&nbsp;
                <Link to="/signup" preload={false} className="link link-accent">
                  signup
                </Link>
              </p>
            </div>
            <div className="card bg-base-200 w-full max-w-sm lg:max-w-md shrink-0 shadow-lg rounded-lg hover:scale-110 transition-transform">
              <div className="card-body p-4 sm:p-8">
                <form
                  className="fieldset space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                  }}
                >
                  <form.Field name="username">
                    {(field) => {
                      const errorMessage = field.state.meta.isTouched
                        ? field.state.meta.errors[0]?.message
                        : undefined;
                      return (
                        <div>
                          <label className="floating-label" htmlFor="NameInput">
                            <span
                              className={cn(
                                "transition-colors duration-300",
                                errorMessage && "text-error text-sm ml-2",
                              )}
                            >
                              {errorMessage ?? "Username"}
                            </span>
                            <input
                              type="text"
                              className={cn(
                                "validator input input-bordered w-full focus:outline-none focus:ring-0 rounded-lg focus:ring-accent",
                                errorMessage && "focus:ring-error",
                              )}
                              id="NameInput"
                              name={field.name}
                              value={field.state.value}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              onBlur={field.handleBlur}
                              placeholder="Your name"
                              autoComplete="name"
                              required
                            />
                          </label>
                        </div>
                      );
                    }}
                  </form.Field>

                  <form.Field name="password">
                    {(field) => {
                      const errorMessage = field.state.meta.isTouched
                        ? field.state.meta.errors[0]?.message
                        : undefined;
                      return (
                        <div>
                          <label
                            className="floating-label"
                            htmlFor="PasswordInput"
                          >
                            <span
                              className={cn(
                                "transition-colors duration-300",
                                errorMessage && "text-error text-sm ml-2",
                              )}
                            >
                              {errorMessage ?? "Password"}
                            </span>
                            <input
                              type={passwordType}
                              className={cn(
                                "validator input input-bordered w-full focus:outline-none focus:ring-0 focus:ring-accent rounded-lg",
                                errorMessage && "focus:ring-error",
                              )}
                              id="PasswordInput"
                              name={field.name}
                              value={field.state.value}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              onBlur={field.handleBlur}
                              placeholder="****"
                              autoComplete="new-password"
                              required
                            />
                          </label>
                        </div>
                      );
                    }}
                  </form.Field>

                  <label className="label justify-between">
                    Show password
                    <input
                      type="checkbox"
                      className="checkbox"
                      onChange={() =>
                        setPasswordType((prev) =>
                          prev === "password" ? "text" : "password",
                        )
                      }
                    />
                  </label>

                  <form.Subscribe selector={(state) => [state.isSubmitting]}>
                    {([isSubmitting]) => (
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
                    )}
                  </form.Subscribe>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

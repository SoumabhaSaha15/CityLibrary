import { cn } from "@/util/cn";
import { useState } from "react";
import { authActions } from "@/store/auth";
import { useForm } from "@tanstack/react-form";
import RippleButton from "@/components/RippleButton";
import { useToast } from "@/contexts/Toast/ToastContext";
import { signupSchema, type SignupSchema } from "@/validators/user-auth";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  const defaultImage = import.meta.env.VITE_DEFAULT_USER_IMAGE;
  const [passwordType, setPasswordType] = useState<"text" | "password">(
    "password",
  );
  const toast = useToast();
  const navigate = useNavigate();
  const [displayImage, setDisplayImage] = useState<string>(defaultImage);

  const form = useForm({
    validators: {
      onChange: signupSchema,
    },
    defaultValues: {
      profile: undefined as unknown as FileList,
      username: "",
      email: "",
      password: "",
    } satisfies SignupSchema,
    onSubmit: async ({ value }) => {
      try {
        await authActions.signup(value);
        form.reset();
        toast.open("signup successfull", "alert-success");
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
          <div className="hero-content flex-col lg:flex-row-reverse w-full max-w-6xl gap-8">
            <div className="text-center lg:text-left lg:flex-1">
              <h1 className="text-4xl sm:text-5xl font-bold text-secondary text-shadow-lg transition">
                Signup to our service
              </h1>
              <p className="py-6 px-2 sm:px-6">
                Already have an account&nbsp;
                <Link to="/login" className="link link-accent" preload={false}>
                  login
                </Link>
              </p>
            </div>
            <div className="card bg-base-200 w-full max-w-sm lg:max-w-md shrink-0 shadow-md hover:scale-110 transition-transform">
              <div className="card-body p-4 sm:p-8">
                <form
                  className="fieldset space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                  }}
                >
                  <label htmlFor="profile" aria-label="Upload profile picture">
                    <div className="avatar grid place-items-center">
                      <div className="w-32">
                        <img
                          src={displayImage}
                          alt="profile-pic"
                          className="rounded-lg"
                        />
                      </div>
                    </div>
                  </label>

                  <form.Field name="profile">
                    {(field) => {
                      const isInvalid =
                        field.state.meta.isTouched &&
                        field.state.meta.errors.length > 0;

                      return (
                        <input
                          type="file"
                          id="profile"
                          className={cn(
                            "validator file-input file-input-bordered w-full focus:outline-none focus:ring-0 focus:ring-accent",
                            isInvalid && "focus:ring-error",
                          )}
                          onChange={(e) => {
                            const files = e.target.files;
                            field.handleChange(files as FileList);
                            if (files?.[0]) {
                              setDisplayImage(URL.createObjectURL(files[0]));
                            } else {
                              setDisplayImage(defaultImage);
                            }
                          }}
                          onBlur={field.handleBlur}
                          required
                        />
                      );
                    }}
                  </form.Field>

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
                                "validator input input-bordered w-full focus:outline-none focus:ring-0 focus:ring-accent",
                                errorMessage && "focus:ring-error",
                              )}
                              id="NameInput"
                              name={field.name}
                              value={field.state.value ?? ""}
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

                  <form.Field name="email">
                    {(field) => {
                      const errorMessage = field.state.meta.isTouched
                        ? field.state.meta.errors[0]?.message
                        : undefined;
                      return (
                        <div>
                          <label
                            className="floating-label"
                            htmlFor="EmailInput"
                          >
                            <span
                              className={cn(
                                "transition-colors duration-300",
                                errorMessage && "text-error text-sm ml-2",
                              )}
                            >
                              {errorMessage ?? "Email"}
                            </span>
                            <input
                              type="email"
                              className={cn(
                                "validator input input-bordered w-full focus:outline-none focus:ring-0 focus:ring-accent",
                                errorMessage && "focus:ring-error",
                              )}
                              id="EmailInput"
                              name={field.name}
                              value={field.state.value ?? ""}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              onBlur={field.handleBlur}
                              placeholder="your.email@example.com"
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
                                "validator input input-bordered w-full focus:outline-none focus:ring-0 focus:ring-accent",
                                errorMessage && "focus:ring-error",
                              )}
                              id="PasswordInput"
                              name={field.name}
                              value={field.state.value ?? ""}
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
                        className="btn btn-primary w-full hover:btn-secondary"
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

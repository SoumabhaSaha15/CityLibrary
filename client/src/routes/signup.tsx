import { cn } from "@/util/cn";
import LoadingPage from "@/Loader";
import base from "@/util/axios-base";
import useRipple from "use-ripple-hook";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useToast, DefaultOptions } from "@/Contexts/Toast/ToastContext";
import { signupSchema, type SignupSchema } from "@/validators/user-auth";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { type ResponseSchema, responseSchema } from "@/validators/user-auth";
export const Route = createFileRoute("/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  const [ripple, event] = useRipple({ timingFunction: "ease-in-out" });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const defaultImage = import.meta.env.VITE_DEFAULT_USER_IMAGE;
  const [passwordType, setPasswordType] = useState<"text" | "password">(
    "password",
  );
  const [displayImage, setDisplayImage] = useState<string>(defaultImage);
  const navigate = useNavigate();
  const toast = useToast();

  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupSchema>({ resolver: zodResolver(signupSchema) });
  const watchedImage = watch("profile");

  useEffect(() => {
    try {
      base
        .get<ResponseSchema>("/user/login", {
          schema: responseSchema,
        })
        .then((res) => {
          if (res.status === 200) {
            window.localStorage.setItem("loginData", JSON.stringify(res.data));
            navigate({ to: "/user" });
          } else setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
    return () => setIsLoading(false);
  }, []);

  useEffect(() => {
    if (watchedImage && watchedImage[0]) {
      const objectUrl = URL.createObjectURL(watchedImage[0]);
      setDisplayImage(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else setDisplayImage(defaultImage);
  }, [watchedImage]);

  const signup: SubmitHandler<SignupSchema> = async (data) => {
    const response = await base.postForm("/user/signup", data);
    console.log(response.data, data);
    if (response.status === 201) {
      reset();
      navigate({ to: "/user" });
      toast.open(
        "User created successfully",
        true,
        1000,
        DefaultOptions.success,
      );
    } else {
      toast.open("Failed to create user", true, 1000, DefaultOptions.error);
    }
  };

  return isLoading ? (
    <LoadingPage />
  ) : (
    <>
      <div className="hero min-h-dvh scroll-smooth transition-all snap-y snap-mandatory">
        <div className="hero min-h-screen px-4 py-8">
          <div className="hero-content flex-col lg:flex-row-reverse w-full max-w-6xl gap-8">
            <div className="text-center lg:text-left lg:flex-1">
              <h1 className="text-4xl sm:text-5xl font-bold text-secondary text-shadow-lg transition">
                Signup to our service
              </h1>
              <p className="py-6 px-2 sm:px-6">
                Already have an account&nbsp;
                <Link to="/login" className="link link-accent">
                  login
                </Link>
              </p>
            </div>
            <div className="card bg-base-100 w-full max-w-sm lg:max-w-md shrink-0 shadow-2xl rounded-2xl hover:scale-110 transition-transform">
              <div className="card-body p-4 sm:p-8">
                <form
                  className="fieldset space-y-4"
                  onSubmit={handleSubmit(signup)}
                >
                  <label htmlFor="profile">
                    <div className="avatar grid place-items-center">
                      <div className="w-32 rounded-full">
                        <img src={displayImage} />
                      </div>
                    </div>
                  </label>

                  <input
                    type="file"
                    id="profile"
                    className={cn(
                      "validator file-input file-input-bordered w-full focus:outline-none focus:ring-0 rounded-full focus:ring-accent",
                      errors.profile && "focus:ring-error",
                    )}
                    {...register("profile")}
                    disabled={isSubmitting}
                    required
                  />

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
                          "validator input input-bordered w-full focus:outline-none focus:ring-0 rounded-full focus:ring-accent",
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
                    <label className="floating-label" htmlFor="EmailInput">
                      <span
                        className={cn(
                          "transition-colors duration-300",
                          errors.email && "text-error text-sm ml-2",
                        )}
                      >
                        {errors.email ? errors.email.message : "Email"}
                      </span>
                      <input
                        type="email"
                        className={cn(
                          "validator input input-bordered w-full focus:outline-none focus:ring-0 focus:ring-accent rounded-full",
                          errors.email && "focus:ring-error",
                        )}
                        id="EmailInput"
                        {...register("email")}
                        placeholder="your.email@example.com"
                        disabled={isSubmitting}
                        required
                      />
                    </label>
                  </div>

                  <div>
                    <label className="floating-label" htmlFor="EmailInput">
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
                          "validator input input-bordered w-full focus:outline-none focus:ring-0 focus:ring-accent rounded-full",
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

                  <button
                    ref={ripple}
                    type="submit"
                    disabled={isSubmitting}
                    onPointerDown={event}
                    className="btn btn-primary w-full hover:btn-secondary rounded-full"
                    children={
                      isSubmitting ? (
                        <>
                          <span className="loading loading-dots loading-md text-accent" />
                          Submitting...
                        </>
                      ) : (
                        <>Submit</>
                      )
                    }
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

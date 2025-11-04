import { z } from "zod";
import React from "react";
import base from "../../utils/base";
import { BiUser } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { signupSchema } from "../../validator/user-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Divider,
  Avatar,
  Form,
  addToast,
} from "@heroui/react";

type SignupFormData = z.infer<typeof signupSchema>;

const Signup: React.FC = () => {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [profilePreview, setProfilePreview] = React.useState<string>(
    import.meta.env.VITE_DEFAULT_USER_IMAGE
  );
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignupFormData>({ resolver: zodResolver(signupSchema) });

  const onSubmit: SubmitHandler<SignupFormData> = async (data) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("profile", data.profile![0]);

    try {
      const response = await base.post("/user/signup", formData);

      if (response.status === 201) {
        addToast({
          title: response.status,
          description: response.statusText,
          color: "success",
        });
        navigate("/user");
      } else throw new Error(`Signup failed: ${response.statusText}`);
    } catch (error) {
      console.error("Error during signup:", error);

      addToast({
        title: "Error",
        description: (error as Error).message,
        color: "danger",
      });
    }

    reset({ password: "", profile: undefined, username: "", email: "" });
    setProfilePreview(import.meta.env.VITE_DEFAULT_USER_IMAGE);
  };

  return (
    <>
      <div className="min-h-[calc(100dvh-65px)] flex items-center justify-center p-4 bg-background">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="flex flex-col gap-3 px-8 pt-8 pb-4">
            <div className="text-center">
              <h2 className="text-xl font-semibold">Create Your Account</h2>
            </div>
          </CardHeader>

          <Divider />

          <CardBody className="px-8 py-6">
            <Form
              onSubmit={handleSubmit(onSubmit)}
              onReset={() => reset()}
              className="flex flex-col gap-4"
            >
              <Controller
                name="profile"
                control={control}
                render={({
                  field: { onChange, onBlur, ref },
                  fieldState: { error },
                }) => (
                  <div className="flex flex-col items-center gap-3 w-full">
                    <label htmlFor="profile-upload" className="cursor-pointer">
                      <Avatar
                        src={profilePreview}
                        icon={<BiUser className="h-10 w-10 text-default-400" />}
                        className="w-24 h-24 text-large"
                      />
                    </label>
                    <Input
                      id="profile-upload"
                      type="file"
                      className="hidden"
                      accept="image/png, image/jpeg, image/webp"
                      onBlur={onBlur}
                      ref={ref}
                      onChange={(e) => {
                        onChange(e.target.files);
                        const file = e.target.files?.[0];
                        if (profilePreview) URL.revokeObjectURL(profilePreview);
                        if (file) {
                          setProfilePreview(URL.createObjectURL(file));
                        } else {
                          setProfilePreview(
                            import.meta.env.VITE_DEFAULT_USER_IMAGE
                          );
                        }
                      }}
                    />
                    {error && (
                      <p className="text-sm text-danger">{error.message}</p>
                    )}
                  </div>
                )}
              />

              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    label="Username"
                    variant="underlined"
                    autoComplete="username"
                    isInvalid={!!errors.username}
                    errorMessage={errors.username?.message}
                    size="lg"
                  />
                )}
              />

              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="email"
                    label="Email"
                    variant="underlined"
                    isInvalid={!!errors.email}
                    errorMessage={errors.email?.message}
                    size="lg"
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type={isPasswordVisible ? "text" : "password"}
                    label="Password"
                    autoComplete="new-password"
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={() => setIsPasswordVisible((prev) => !prev)}
                        aria-label="toggle password visibility"
                      >
                        {isPasswordVisible ? (
                          <FaEyeSlash className="text-default-400" />
                        ) : (
                          <FaEye className="text-default-400" />
                        )}
                      </button>
                    }
                    variant="underlined"
                    isInvalid={!!errors.password}
                    errorMessage={errors.password?.message}
                    size="lg"
                  />
                )}
              />

              <Button
                type="submit"
                color="primary"
                size="lg"
                radius="full"
                className="mt-2 w-full"
                isLoading={isSubmitting}
              >
                {isSubmitting ? "Creating Account..." : "Sign Up"}
              </Button>
            </Form>

            <Divider className="my-6" />

            <div className="text-center text-sm">
              <span className="text-default-500">
                Already have an account?{" "}
              </span>
              <a
                href="#"
                className="text-primary font-semibold hover:underline"
              >
                Log In
              </a>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Signup;

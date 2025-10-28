import React from "react";
import base from "../../utils/base";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchema } from "./../../validator/user-auth";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Divider,
  Form,
  addToast,
} from "@heroui/react";

const Signup: React.FC = () => {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginSchema>({ resolver: zodResolver(loginSchema) });

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("password", data.password);
    try {
      const response = await base.post("/user/login", formData);
      if (response.status === 200) {
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
    reset({ password: "", username: "" });
  };
  return (
    <>
      <div className="min-h-[calc(100dvh-65px)] flex items-center justify-center p-4 bg-background">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="flex flex-col gap-3 px-8 pt-8 pb-4">
            <div className="text-center">
              <h2 className="text-xl font-semibold">Login to your account</h2>
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
                className="mt-2 w-full"
                isLoading={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>
            </Form>

            <Divider className="my-6" />

            <div className="text-center text-sm">
              <span className="text-default-500">Don't have an account? </span>
              <a
                href="#"
                className="text-primary font-semibold hover:underline"
              >
                Sign Up
              </a>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Signup;

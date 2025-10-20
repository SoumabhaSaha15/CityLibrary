import { z } from "zod";
import { signupSchema } from "../validator/user-auth";
import React from "react";
import { BiBook, BiUser } from "react-icons/bi";
import { useTheme } from "@heroui/use-theme";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaEye, FaEyeSlash, FaSun, FaMoon } from "react-icons/fa";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Divider,
  Avatar,
  Form
} from "@heroui/react";

type SignupFormData = z.infer<typeof signupSchema>;

const Signup: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [profilePreview, setProfilePreview] = React.useState<string>(import.meta.env.VITE_DEFAULT_USER_IMAGE);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<SignupFormData>({ resolver: zodResolver(signupSchema) });

  const onSubmit: SubmitHandler<SignupFormData> = async (data) => {
    console.log("Form Data Submitted:", data);
    reset({password:"",profile:undefined,username:"",email:""});
    setProfilePreview(import.meta.env.VITE_DEFAULT_USER_IMAGE);
  };

  return (
    <>
      <Navbar isBordered>
        <NavbarContent>
          <NavbarBrand>
            <BiBook size={24} />
            <p className="font-bold text-inherit ml-2">CityLibrary</p>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent justify="end">
          <Button
            variant="light"
            radius="full"
            size="sm"
            isIconOnly={true}
            onPress={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <FaSun size={20} /> : <FaMoon size={20} />}
          </Button>
        </NavbarContent>
      </Navbar>

      <div className="min-h-screen flex items-center justify-center p-4 dark:bg-background-700">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="flex flex-col gap-3 px-8 pt-8 pb-4">
            <div className="text-center">
              <h2 className="text-xl font-semibold">Create Your Account</h2>
            </div>
          </CardHeader>

          <Divider />

          <CardBody className="px-8 py-6">
            <Form onSubmit={handleSubmit(onSubmit)} onReset={() => reset()} className="flex flex-col gap-4">
              <Controller
                name="profile"
                control={control}
                render={({ field: { onChange, onBlur, ref }, fieldState: { error } }) => (
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
                          setProfilePreview(import.meta.env.VITE_DEFAULT_USER_IMAGE);
                        }
                      }}
                    />
                    {error && <p className="text-sm text-danger">{error.message}</p>}
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
                        onClick={() => setIsPasswordVisible(prev => !prev)}
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
                {isSubmitting ? 'Creating Account...' : 'Sign Up'}
              </Button>
            </Form>

            <Divider className="my-6" />

            <div className="text-center text-sm">
              <span className="text-default-500">Already have an account? </span>
              <a href="#" className="text-primary font-semibold hover:underline">
                Sign In
              </a>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Signup;

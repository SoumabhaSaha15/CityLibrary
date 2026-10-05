import { router } from "@/router";
import { authStore } from "@/store/auth";
import { themeStore } from "@/store/theme";
import { useSelector } from "@tanstack/react-store";
import { RouterProvider } from "@tanstack/react-router";

export default function App() {
  const auth = useSelector(authStore, (state) => state);
  const { theme } = useSelector(themeStore, (state) => state);
  return <RouterProvider router={router} context={{ auth, theme }} />;
}

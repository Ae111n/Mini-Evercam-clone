import { userStore } from "~/store/user";

export default async function ({ redirect, route }) {
  const user = await userStore();
  const isAuthenticated = user.isAuthenticated;
  if (isAuthenticated == false && route.path !== "/login") {
    redirect("/login");
  }
  if (isAuthenticated == true && route.path === "/login") {
    redirect("/dashboard");
  }
}

import { api } from "@/lib/ky";
import { HTTPError } from "ky";

interface LoginUser {
  email: string;
  password: string;
}

interface RegisterUser extends LoginUser {
  name: string;
}

export async function login(user: LoginUser) {
  // should be application/x-www-form-urlencoded
  const formData = new URLSearchParams();
  formData.set("email", user.email);
  formData.set("password", user.password);
  try {
    const res: {token:string} = await api.post("auth/login", { body: formData }).json();
    return res.token
  } catch (err) {
    if (err instanceof HTTPError) {
      throw new Error(await err.response.text())
    }
    throw new Error("Something went wrong. Try again")
  }
}

export async function register(user: RegisterUser) {
  // should be application/x-www-form-urlencoded
  const formData = new URLSearchParams();
  formData.set("name", user.name);
  formData.set("email", user.email);
  formData.set("password", user.password);
  try {
    await api.post("auth/register", { body: formData });
  } catch (err) {
    if (err instanceof HTTPError) {
      throw new Error(await err.response.text())
    }
    throw new Error("Something went wrong. Try again")
  }
}

import { api } from "@/lib/ky";

export async function isAuthenticated():Promise<boolean> {
  try {
    await api.get("ping")
    return true
  } catch {
    return false
  }
}

export async function getUser(): Promise<User> {
  return await api.get("user").json() as User
}

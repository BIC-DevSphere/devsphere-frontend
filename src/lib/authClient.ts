import { API_BASE_URL } from "@/config/apiConfig"
import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: `${API_BASE_URL}/auth`,
})

export const { signIn, signUp, useSession, signOut } = authClient
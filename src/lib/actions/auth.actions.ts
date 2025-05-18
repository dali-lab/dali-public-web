export async function signIn(email: string, password: string) {
    const user = await getUserByEmail(email);
    if (!user) {
        return { error: "User not found" };
    }
    if (user.password !== password) {
        return { error: "Invalid password" };
    }
    return { success: "User signed in successfully" };
}

export async function signUp(email: string, password: string, checkPassword: string) {
    if (password !== checkPassword) {
        return { error: "Passwords do not match" };
    }
    const user = await getUserByEmail(email);
    if (user) {
        return { error: "User already exists" };
    }
    const newUser = await createUser(email, password);
    return { success: "User created successfully" };
}

export async function signOut() {
    return { success: "User signed out successfully" };
}

export async function Register(formData: FormData) {
    try {
        console.log("here trying to login", formData);
        const user = await fetch("/api/auth/register");
        return user;
    } catch (error) {
        return error;
    }
}

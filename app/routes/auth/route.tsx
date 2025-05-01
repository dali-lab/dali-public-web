import { LoginForm } from "~/components/login-form";

export default function AuthPage() {
    return (
      <div className="flex flex-col items-center justify-center w-screen h-screen">
        <LoginForm />
      </div>
    );
}
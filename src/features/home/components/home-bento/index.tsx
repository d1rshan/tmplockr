import { LoginForm } from "./login-form";
import { RecieveForm } from "./recieve-form";
import { SignupForm } from "./signup-form";

export const HomeBento = () => {
  return (
    <>
      <div className="hidden mt-10 mb-20 px-4 sm:grid gap-4 grid-cols-2">
        <RecieveForm />
        <SignupForm />
        <LoginForm />
      </div>
      <div className="sm:hidden mt-10 grid grid-cols-1 px-4 gap-4">
        <LoginForm />
        <RecieveForm />
        <SignupForm />
      </div>
    </>
  );
};

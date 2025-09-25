import { LoginCard } from "./login-card";
import { RecieveCard } from "./recieve-card";
import { SignupCard } from "./signup-card";

// TODO: take care of styling and properly displaying error messages for login and sign up
export const HomeBento = () => {
  return (
    <>
      <div className="hidden mt-10 mb-20 px-4 sm:grid gap-4 grid-cols-2">
        <LoginCard />
        <SignupCard />
        <RecieveCard />
      </div>
      <div className="sm:hidden mt-10 grid grid-cols-1 px-4 gap-4">
        <RecieveCard />
        <LoginCard />
        <SignupCard />
      </div>
    </>
  );
};

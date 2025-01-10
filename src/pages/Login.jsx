import { SignIn } from "@clerk/clerk-react";

const Login = () => {
  return (
    <div className="flex justify-center my-20 items-center">
      <SignIn signUpForceRedirectUrl="/dashboard" />
    </div>
  );
};

export default Login;

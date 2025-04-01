import Input from "../../components/input";
import signinpic from "../../assets/icons/signinpagepic.svg";
import Button from "../../components/button";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { saveAuthToLocalStorage } from "../../utils/authLocalStorageUtils";
import { login } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import signInWithGoogle from "../../auth/authMethods/googleoauth";
import googleLogo from "../../assets/icons/icons8-google.svg";
import useAuth from "../../auth/useAuth";
import Container from "../../components/container";

function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const user = useAuth();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (user) {
      saveAuthToLocalStorage(user);
      dispatch(login(user));
      navigate(from, { replace: true });
    }
  }, [user, dispatch, navigate, from]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const email = formData.email;
    const password = formData.password;
    try {
      const response = await fetch(
        "https://www.greatfrontend.com/api/projects/challenges/auth/sign-in",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      if (response.ok) {
        const userData = await response.json();
        saveAuthToLocalStorage(userData);
        dispatch(login(userData));
        toast.success("Login successful!", {
          className: "toast-class",
          delay: 500,
        });
        navigate(from, { replace: true });
      } else {
        toast.error("Login failed!");
      }
    } catch (error) {
      console.error("Login error: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Google sign-in error: ", error);
    }
  };

  return (
    <Container className="lg:grid grid-cols-2 gap-8 py-8 px-4 sm:max-lg:px-[140px] lg:px-24">
      <div className="flex justify-center items-center lg:px-[104px]">
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="text-3xl font-semibold text-neutral-900">
              Login to your account
            </div>
            <div>
              <label
                htmlFor="email"
                className="font-medium text-sm text-neutral-700"
              >
                Email
              </label>
              <Input
                id="email-input"
                type="email"
                name="email"
                value={formData.email}
                placeholder="john@example.com"
                className="bg-neutral-50 border-[1px] border-neutral-200 w-full rounded-[4px] text-sm text-neutral-900 px-[14px] py-2.5"
                autoComplete="email"
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="font-medium text-sm text-neutral-700"
              >
                Password
              </label>
              <Input
                id="password-input"
                type="password"
                name="password"
                value={formData.password}
                placeholder="Password"
                className="bg-neutral-50 border-[1px] border-neutral-200 w-full h-10 rounded-[4px] text-sm text-neutral-900 px-[14px] py-2.5"
                autoComplete="current-password"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex flex-col gap-6 font-medium text-sm">
              <Button
                type="submit"
                className="bg-indigo-700 py-2.5 text-white rounded hover:bg-indigo-800"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex justify-center items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Logging in...
                  </div>
                ) : (
                  "Submit"
                )}
              </Button>
              <p className="text-center text-neutral-900">
                Don't have an account?{" "}
                <Link to={"/sign-up"} className="text-indigo-700">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
          <br />
          <div className="text-center text-sm font-semibold">OR</div>
          <br />
          <Button
            onClick={handleGoogleSignIn}
            className="flex items-center w-full border border-neutral-300 hover:border-neutral-100 py-2 px-4 rounded-full text-center text-neutral-700 font-medium text-sm hover:bg-neutral-100 transition-all"
          >
            <img src={googleLogo} alt="" className="h-8" />
            <div className="grow">Continue with Google</div>
          </Button>
        </div>
      </div>
      <div className="hidden lg:block rounded-md overflow-hidden">
        <img src={signinpic} alt="" />
      </div>
    </Container>
  );
}

export default SignIn;

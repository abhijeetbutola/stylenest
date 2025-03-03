import Input from "../../components/input";
import signinpic from "../../assets/signinpagepic.svg";
import Button from "../../components/button";
import { useNavigate, useLocation } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { saveAuthToLocalStorage } from "../../utils/authLocalStorageUtils";
import { login } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import signInWithGoogle from "../../authMethods";
import googleLogo from "../../assets/icons8-google.svg";

function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

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

  return (
    <div className="bg-white max-w-[1408px] w-full rounded-t-lg mx-4">
      <div className="py-8 px-4 sm:max-lg:px-[140px] lg:p-24">
        <div className="flex justify-center items-center gap-8">
          <div className="self-stretch flex justify-center items-center lg:px-[104px]">
            <div>
              <form
                onSubmit={handleSubmit}
                className="flex-1 flex flex-col gap-6"
              >
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
                <Button
                  type="submit"
                  className="bg-indigo-700 py-2.5 font-medium text-sm text-white rounded hover:bg-indigo-800"
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
              </form>
              <br />
              <div className="text-center text-sm font-semibold">OR</div>
              <br />
              <div className="flex items-center border border-neutral-300 py-2 px-4 rounded-full text-center text-neutral-700 font-medium text-sm">
                <img src={googleLogo} alt="" className="h-8" />
                <div className="grow">
                  <Button onClick={signInWithGoogle} className="">
                    Continue with Google
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className=" hidden lg:block">
            <img src={signinpic} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;

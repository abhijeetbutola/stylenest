import Input from "../../components/input";
import signuppic from "../../assets/icons/signuppagepic.svg";
import Button from "../../components/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Container from "../../components/container";
import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

function SignUp() {
  /*
        Todos for building this component
        1. Install react hook form
        2. Install zod
        3. Define react hook form variables like register, handleSubmit, and others
        4. Define zod schema for validation
        5. State in the react hook form that validation is going to be done via zod
        6. create an onSubmit function in which we will have a try, catch block. In the try block we will fetch the api and send the data in the body of the request and our headers will be content-type: application/json. Provide a toast message accordingly(successful signup or not)
        7. For real time password validity check we will make use of the watch function in the react hook form. We will tell it watch the "password" field. Then using an array of objects, where each object is for different parameters that we want to check, we will update the ui in real time
        8. Then in jsx we will pass the handleSubmit function from react hook form into onSubmit function of the form tag. The handleSubmit function will itself take in onSubmit function that we have created.
        9. 
    */

  const signupSchema = z
    .object({
      email: z.string().email("Invalid email format"),
      password: z
        .string()
        .min(8, "Password must be atleast 8 characters long")
        .regex(/[A-Z]/, "Password must contain an uppercase letter")
        .regex(/[a-z]/, "Password must container a lowercase letter")
        .regex(/\d/, "Password must contain a number"),
      confirmPassword: z.string().min(1, "Confirm password is required"),
      terms: z.boolean(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords must match",
      path: ["confirm password"],
    });

  type SignUpFormData = z.infer<typeof signupSchema>;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpFormData>({ resolver: zodResolver(signupSchema) });

  const onSubmit = (data: SignUpFormData) => {
    console.log("Form Submitted: ", data);
  };

  const password = watch("password", "");
  const termsAccepted = watch("terms", false);

  const passwordCriteria = [
    { id: 1, label: "At least 8 characters", isValid: password.length >= 8 },
    {
      id: 2,
      label: "Contains an uppercase letter",
      isValid: /[A-Z]/.test(password),
    },
    {
      id: 3,
      label: "At least a lowercase letter",
      isValid: /[a-z]/.test(password),
    },
    { id: 4, label: "Contains a number", isValid: /\d/.test(password) },
    {
      id: 5,
      label: "Contains a special character",
      isValid: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    },
  ];

  return (
    <Container className="lg:grid grid-cols-2 gap-8 px-3 lg:px-24 py-8">
      <div className="flex justify-center items-center lg:px-[104px] py-[72px]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 md:w-[456px] lg:w-[384px]"
        >
          <div className="text-3xl font-semibold text-neutral-900">
            Create your account
          </div>
          <Input
            id="email-input"
            type="email"
            label="Email"
            placeholder="john@example.com"
            error={errors.email?.message}
            {...register("email")}
            required
          />
          <Input
            id="password-input"
            type="password"
            label="Password"
            placeholder="Password"
            error={errors.password?.message}
            {...register("password")}
            required
          />
          <ul className="flex flex-col gap-2 text-xs font-normal">
            {passwordCriteria.map((criterion) => (
              <li key={criterion.id}>
                <div className="flex gap-3 items-center">
                  <span className="rounded-full overflow-clip">
                    <CheckCircle2
                      className={
                        criterion.isValid
                          ? "bg-green-500 text-white transition-all"
                          : "bg-white text-neutral-400 transition-all"
                      }
                    />
                  </span>
                  <span
                    className={
                      criterion.isValid
                        ? "text-neutral-600 transition-all"
                        : "text-neutral-400 transition-all"
                    }
                  >
                    {criterion.label}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <Input
            id="confirm-password-input"
            type="password"
            label="Confirm Password"
            placeholder="Confirm your password"
            className="bg-neutral-50 border-[1px] border-neutral-200 w-full"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
            required
          />
          <div className="flex flex-col gap-6 font-medium text-sm text-neutral-900">
            <p className="flex gap-3 items-center text-sm font-normal text-neutral-600">
              <Input
                type="checkbox"
                className="accent-indigo-700 w-4 h-4"
                {...register("terms", { required: true })}
              />
              <span>
                I agree with StyleNest{" "}
                <Link to={"/"} className="text-indigo-700">
                  Terms of Service
                </Link>
              </span>
            </p>
            <Button
              type="submit"
              disabled={!termsAccepted}
              className={`w-full py-2.5 font-medium text-sm text-white rounded transition-colors ${
                termsAccepted
                  ? "bg-indigo-700 hover:bg-indigo-800"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Create account
            </Button>
            <p className="text-center">
              Already have an account?{" "}
              <Link to="/sign-in" className="text-indigo-700">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
      <div className="hidden lg:block rounded-md overflow-hidden ">
        <img src={signuppic} alt="" className="object-cover h-full w-full" />
      </div>
    </Container>
  );
}

export default SignUp;

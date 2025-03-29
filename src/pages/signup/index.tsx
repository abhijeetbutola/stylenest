import Input from "../../components/input";
import signuppic from "../../assets/icons/signuppagepic.svg";
import Button from "../../components/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
        .regex(/\d/, "Password must contain a number"),
      confirmPassword: z.string().min(1, "Confirm password is required"),
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
  const passwordCriteria = [
    { id: 1, label: "At least 8 characters", isValid: password.length >= 8 },
    {
      id: 2,
      label: "Contains an uppercase letter",
      isValid: /[A-Z]/.test(password),
    },
    { id: 3, label: "Contains a number", isValid: /\d/.test(password) },
  ];

  return (
    <div className="bg-white w-full max-w-[1408px] py-8 px-24 mx-4">
      <div className="flex justify-center items-center">
        <div className="flex-1 flex justify-center items-center px-[104px]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex-1 flex flex-col gap-6 max-w-[384px]"
          >
            <div className="text-3xl font-semibold text-neutral-900">
              Create your account
            </div>
            <Input
              id="email-input"
              type="email"
              label="Email"
              placeholder="john@example.com"
              className="bg-neutral-50 border-[1px] border-neutral-200 w-full"
              error={errors.email?.message}
              {...register("email")}
              required
            />
            <Input
              id="password-input"
              type="password"
              label="Password"
              placeholder="Password"
              className="bg-neutral-50 border-[1px] border-neutral-200 w-full"
              error={errors.password?.message}
              {...register("password")}
              required
            />
            <ul>
              {passwordCriteria.map((criterion) => (
                <li
                  key={criterion.id}
                  className={
                    criterion.isValid ? "text-green-500" : "text-neutral-300"
                  }
                >
                  {criterion.label}
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
            <Button
              type="submit"
              className="bg-indigo-700 py-2.5 font-medium text-sm text-white rounded hover:bg-indigo-800"
            >
              Submit
            </Button>
          </form>
        </div>
        <div className="flex-1">
          <img src={signuppic} alt="" />
        </div>
      </div>
    </div>
  );
}

export default SignUp;

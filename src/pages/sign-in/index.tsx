import Input from "../../components/input"
import signinpic from "../../assets/signinpagepic.svg"
import Button from "../../components/button"
import { useNavigate, useLocation } from "react-router-dom"
import { ChangeEvent, useState } from "react"
import { saveAuthToLocalStorage } from "../../utils/authLocalStorageUtils"
import { login } from "../../redux/slices/authSlice"
import { useDispatch } from "react-redux"

function SignIn() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    console.log(formData);

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const from = location.state?.from?.pathname || "/"

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const email = formData.email
        const password = formData.password
        try {
            const response = await fetch("https://www.greatfrontend.com/api/projects/challenges/auth/sign-in", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({ email, password })
            })

            if(response.ok) {
                console.log("Login successful");
                const userData = await response.json()
                console.log(userData);
                saveAuthToLocalStorage(userData)
                dispatch(login(userData))
                alert("Login successful!")
                navigate(from, { replace: true })
            } else {
                alert("Login failed!")
            }
        } catch(error) {
            console.error("Login error: ", error);
        }
    }

    return (
        <div className="bg-white w-full max-w-[1408px] py-8 px-24 mx-4">
            <div className="flex justify-center items-center">
                <div className="flex-1 flex justify-center items-center px-[104px]">
                    <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-6 max-w-[384px]">
                        <div className="text-3xl font-semibold text-neutral-900">
                            Login to your account
                        </div>
                        <Input id="email-input" type="email" name="email" label="Email" value={formData.email} placeholder="john@example.com" className="bg-neutral-50 border-[1px] border-neutral-200 w-full" autoComplete="email" onChange={handleInputChange} required />
                        <Input id="password-input" type="password" name="password" label="Password" value={formData.password} placeholder="Password" className="bg-neutral-50 border-[1px] border-neutral-200 w-full" autoComplete="current-password" onChange={handleInputChange} required />
                        <Button type="submit" className="bg-indigo-700 py-2.5 font-medium text-sm text-white rounded hover:bg-indigo-800">Submit</Button>
                    </form>
                </div>
                <div className="flex-1">
                    <img src={signinpic} alt="" />
                </div>
            </div>
        </div>
    )
}

export default SignIn
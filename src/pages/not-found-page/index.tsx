import { useNavigate } from "react-router-dom"
import Button from "../../components/button"

function NotFoundPage() {
    const navigate = useNavigate()
    return (
        <div className="bg-cover bg-center bg-no-repeat flex-1 h-screen" style={{ backgroundImage: `url('src/assets/404Image2.jpg')` }}>
            <div className="p-24 h-full flex">
                <div className="flex flex-col self-stretch gap-16 justify-center items-start">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-3">
                            <p className="text-base font-semibold text-indigo-700">Page Not Found</p>
                            <p className="text-neutral-900 text-4xl font-bold">Error 404</p>
                        </div>
                        <p className="text-xl text-neutral-600">Sorry, the page you are looking for does not exist or has been moved.</p>
                    </div>
                    <Button onClick={() => navigate("/")} className="bg-indigo-700 hover:bg-indigo-800 text-white font-medium px-6 py-4 rounded-[4px]">Back to Home</Button>
                </div>
            </div>
        </div>
    )
}

export default NotFoundPage
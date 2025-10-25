import { Link } from "react-router-dom"

const LoginForm = () => {
  return (
    <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <input type="email" id="email" placeholder="Email" className="p-2 rounded-md border border-gray-300" />
        </div>
        <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-medium">Password</label>
            <input type="password" id="password" placeholder="Password" className="p-2 rounded-md border border-gray-300" />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Sign in</button>
        <p className="text-sm text-center">Don't have an account? <Link to="/auth/signup" className="text-blue-500">Sign up</Link></p>
    </form>
  )
}

export default LoginForm
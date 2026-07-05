import { Link } from "react-router-dom";
import { Landmark, Mail, Lock, User } from "lucide-react";

export default function SignUp() {
  return (
    // <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
    //   <div className="w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-xl md:grid md:grid-cols-2">
    //     {/* Left Side */}
    //     <div className="hidden bg-emerald-600 text-white md:flex flex-col justify-center p-10">
    //       <div className="flex items-center gap-2">
    //         <Landmark className="h-8 w-8" />
    //         <h1 className="text-3xl font-bold">HassanEstate</h1>
    //       </div>

    //       <h2 className="mt-10 text-4xl font-bold leading-tight">
    //         Find the Home
    //         <br />
    //         You've Always Dreamed Of
    //       </h2>

    //       <p className="mt-6 text-emerald-100 leading-7">
    //         Join thousands of homeowners and investors discovering premium
    //         properties with HassanEstate.
    //       </p>
    //     </div>

    //     {/* Right Side */}
    //     <div className="p-8 md:p-12">
    //       <div className="mb-8 text-center">
    //         <h2 className="text-3xl font-bold text-gray-800">
    //           Create Account
    //         </h2>

    //         <p className="mt-2 text-gray-500">
    //           Sign up to start exploring properties.
    //         </p>
    //       </div>

    //       <form className="space-y-5">
    //         {/* Full Name */}
    //         <div>
    //           <label className="mb-2 block font-medium text-gray-700">
    //             User Name
    //           </label>

    //           <div className="relative">
    //             <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

    //             <input
    //               type="text"
    //               placeholder="John_Doe"
    //               className="w-full rounded-lg border border-gray-300 py-3 pl-12 pr-4 focus:border-emerald-500 focus:outline-none"
    //             />
    //           </div>
    //         </div>

    //         {/* Email */}
    //         <div>
    //           <label className="mb-2 block font-medium text-gray-700">
    //             Email
    //           </label>

    //           <div className="relative">
    //             <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

    //             <input
    //               type="email"
    //               placeholder="example@email.com"
    //               className="w-full rounded-lg border border-gray-300 py-3 pl-12 pr-4 focus:border-emerald-500 focus:outline-none"
    //             />
    //           </div>
    //         </div>

    //         {/* Password */}
    //         <div>
    //           <label className="mb-2 block font-medium text-gray-700">
    //             Password
    //           </label>

    //           <div className="relative">
    //             <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

    //             <input
    //               type="password"
    //               placeholder="********"
    //               className="w-full rounded-lg border border-gray-300 py-3 pl-12 pr-4 focus:border-emerald-500 focus:outline-none"
    //             />
    //           </div>
    //         </div>

    //         {/* Confirm Password */}
    //         <div>
    //           <label className="mb-2 block font-medium text-gray-700">
    //             Confirm Password
    //           </label>

    //           <div className="relative">
    //             <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

    //             <input
    //               type="password"
    //               placeholder="********"
    //               className="w-full rounded-lg border border-gray-300 py-3 pl-12 pr-4 focus:border-emerald-500 focus:outline-none"
    //             />
    //           </div>
    //         </div>

    //         <button
    //           className="w-full rounded-lg bg-emerald-600 py-3 font-semibold text-white transition hover:bg-emerald-700"
    //         >
    //           Create Account
    //         </button>
    //       </form>

    //       <p className="mt-6 text-center text-gray-600">
    //         Already have an account?{" "}
    //         <Link
    //           to="/sign-in"
    //           className="font-semibold text-emerald-600 hover:underline"
    //         >
    //           Sign In
    //         </Link>
    //       </p>
    //     </div>
    //   </div>
    // </div>
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-5">
        <input 
          className="border p-3 
          rounded-lg" type="text" 
          placeholder="username"
          id="username" 
        />
        <input 
          className="border p-3 
          rounded-lg" type="email" 
          placeholder="email"
          id="email" 
        />
        <input 
          className="border p-3 
          rounded-lg" type="password" 
          placeholder="password"
          id="password" 
        />
        <button disabled
        className="bg-slate-700
                   text-white p-3 
                      rounded-lg uppercase 
                      hover:opacity-95
                      disabled:opacity-80">
          Sign Up
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/sign-in" className="text-blue-700">Sign In</Link>
      </div>
    </div>
  );
}
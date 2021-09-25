import { LockClosedIcon } from "@heroicons/react/solid";
import React from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import * as authRepo from "../../repositories/authRepository";
import { useAuth } from "../../store/auth";

export type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginScreen() {
  const { state, dispatch } = useAuth();
  const { register, handleSubmit } = useForm<LoginFormValues>();

  async function login(e: LoginFormValues) {
    try {
      const employee = await authRepo.login(e);
      dispatch({
        type: "login",
        payload: employee,
      });
    } catch (error) {
      console.log(error);
      toast(
        <div className="cy-login-error">
          <div>Invalid Email</div>
          <div className="text-sm">Please Check if your email is correct.</div>
        </div>,
        {
          type: "error",
        }
      );
    }
  }

  if (state.isAuthed) {
    return <Redirect to="/" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://i0.wp.com/blog.paypay.ne.jp/wp-content/uploads/2019/03/cropped-logo_512_512.png?ssl=1"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(login)}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                // name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                {...register("email")}
                // placeholder="email"
                // required
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                // name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                {...register("password")}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

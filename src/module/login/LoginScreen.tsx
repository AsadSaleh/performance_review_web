import React from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import * as authRepo from "../../repositories/authRepository";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";

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
      toast("Error", {
        type: "error",
      });
    }
  }

  if (state.isAuthed) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <h1>LoginScreen</h1>

      <form onSubmit={handleSubmit(login)}>
        <input {...register("email")} placeholder="email" required />
        <input
          {...register("password")}
          placeholder="password"
          required
          type="password"
        />

        <input type="submit" />
      </form>
    </div>
  );
}

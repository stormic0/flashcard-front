import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./Login.module.css";
import axios from "axios";

const Login = ({ tokenHandler }) => {
  const { register, handleSubmit, reset } = useForm();
  const [errMessagem, setErrMessage] = useState("");

  const submitHandler = (data) => {
    handleLogin(data);
  };

  const handleLogin = async (data) => {
    try {
      const res = await axios.post(`http://flashcard-backend:8000/accounts/login/`, data);
      const { token } = res.data;
      tokenHandler(token);
      reset();
    } catch (err) {
      setErrMessage(err.response.data["non_field_errors"][0]);
    }
  };

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit(submitHandler)}>
      <h1>Login Form</h1>
      {errMessagem && <p>{errMessagem}</p>}
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        name="username"
        id="username"
        {...register("username", { required: { value: true, message: "This field is required!" } })}
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        name="password"
        id="password"
        {...register("password", { required: { value: true, message: "This field is required!" } })}
      />
      <button type="submit" className={styles.submitBtn}>
        Login
      </button>
    </form>
  );
};

export default Login;

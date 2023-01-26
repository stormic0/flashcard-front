import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./RegisterWordForm.module.css";

const RegisterWordForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const [resMessage, setResMessage] = useState({ msg: "", color: "success" });

  const requestHandler = async (data) => {
    const token = sessionStorage.getItem("token");

    try {
      await axios.post(`${process.env.REACT_APP_DOMAIN}words/register/`, data, {
        headers: { Authorization: `token ${token}` },
      });
      setResMessage({ msg: "Word Added Successfully!", color: "success" });
      setTimeout(() => {
        setResMessage("");
      }, 3000);
    } catch (err) {
      setResMessage({ msg: "You've been added this word already!", color: "failure" });
      setTimeout(() => {
        setResMessage("");
      }, 3000);
    }
  };

  const submitHandler = (data) => {
    requestHandler(data);
    reset();
  };

  return (
    <form className={styles.registerForm} onSubmit={handleSubmit(submitHandler)}>
      <h1>Register New Word</h1>
      <p className={resMessage.color === "success" ? styles.success : styles.failure}>{resMessage.msg}</p>
      <label htmlFor="word">New Word:</label>
      <input
        type="text"
        name="word"
        id="word"
        autoComplete="off"
        {...register("word", { required: { value: true, message: "This field is required!" } })}
      />
      <label htmlFor="translatation">Translation:</label>
      <input
        type="text"
        className={styles.rtlInput}
        name="translation"
        id="translation"
        autoComplete="off"
        {...register("translation", { required: { value: true, message: "This field is required!" } })}
      />
      <label htmlFor="description">Description:</label>
      <textarea
        className={styles.rtlInput}
        name="description"
        id="description"
        autoComplete="off"
        {...register("description")}
      ></textarea>
      <button type="submit" className={styles.submitBtn}>
        Add New Word
      </button>
    </form>
  );
};

export default RegisterWordForm;

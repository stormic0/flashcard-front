import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./UpdateForm.module.css";

const UpdateForm = ({ wordData, updateHandler }) => {
  const { register, handleSubmit } = useForm();
  const [resMessage, setResMessage] = useState({ msg: "", color: "success" });

  const requestHandler = async (data) => {
    const token = sessionStorage.getItem("token");

    try {
      await axios.patch(`${process.env.REACT_APP_DOMAIN}words/update/${wordData.id}/`, data, {
        headers: { Authorization: `token ${token}` },
      });
      setResMessage({ msg: "Word updated successfully!", color: "success" });
    } catch (err) {
      setResMessage({ msg: err.response.data, color: "failure" });
    }
  };

  const submitHandler = (data) => {
    requestHandler(data);
  };

  return (
    <form className={styles.updateForm} onSubmit={handleSubmit(submitHandler)}>
      <h1>Update Word</h1>
      <p className={resMessage.color === "success" ? styles.success : styles.failure}>{resMessage.msg}</p>
      <label htmlFor="word">Word:</label>
      <input
        type="text"
        name="word"
        id="word"
        autoComplete="off"
        {...register("word", { required: { value: true, message: "This field is required!" }, value: wordData.word })}
      />
      <label htmlFor="translatation">Translation:</label>
      <input
      className={styles.rtlInput}
        type="text"
        name="translation"
        id="translation"
        autoComplete="off"
        {...register("translation", {
          required: { value: true, message: "This field is required!" },
          value: wordData.translation,
        })}
      />
      <label htmlFor="description">Description:</label>
      <textarea
      className={styles.rtlInput}
        name="description"
        id="description"
        autoComplete="off"
        {...register("description", { value: wordData.description })}
      ></textarea>
      <div className={styles.btnContainer}>
        <button className={styles.submitBtn} type="button" onClick={() => updateHandler()}>
          Back
        </button>
        <button className={styles.submitBtn} type="submit">
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default UpdateForm;

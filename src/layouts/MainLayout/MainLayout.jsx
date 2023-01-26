import React, { useState } from "react";
import RegisterWordForm from "./../../components/Forms/RegisterWordForm/RegisterWordForm";
import StudyWordForm from "../../components/Forms/StudyWordForm/StudyWordForm";
import { useLoginContext } from "./../../context/LoginContext/LoginContext";
import LoginForm from "./../../components/Login/Login";
import styles from "./MainLayout.module.css";

const MainLayout = () => {
  const { token, tokenHandler } = useLoginContext();
  const [activeButton, setActiveButton] = useState("study");

  return (
    <>
      {token ? (
        <div className={styles.container}>
          <div className={styles.buttonContainer}>
            <button
              className={`${styles.mainBtn} ${activeButton === "study" && styles.activeBtn}`}
              onClick={() => setActiveButton("study")}
            >
              Study Words
            </button>
            <button
              className={`${styles.mainBtn} ${activeButton === "register" && styles.activeBtn}`}
              onClick={() => setActiveButton("register")}
            >
              Register New Word
            </button>
          </div>
          <div className={styles.mainForm}>
            {activeButton === "register" ? <RegisterWordForm /> : <StudyWordForm />}
          </div>
        </div>
      ) : (
        <div className={styles.container}>
          <LoginForm tokenHandler={tokenHandler} />
        </div>
      )}
    </>
  );
};

export default MainLayout;

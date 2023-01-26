import axios from "axios";
import React, { useEffect, useState } from "react";
import UpdateForm from "../UpdateForm/UpdateForm";
import FilterRepeatForm from "../FilterRepeatForm/FilterRepeatForm";
import styles from "./StudyWordForm.module.css";

const StudyWordForm = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [data, setData] = useState({
    word: "Hello",
    translation: "سلام",
    description: "!سلام دیگه",
    repeated: 0,
  });
  const [noWordAlert, setNoWordAlert] = useState("");
  const [hitUpdate, setHitUpdate] = useState(false);

  const getWord = async () => {
    setIsFlipped(false);
    const token = sessionStorage.getItem("token");
    const repeated = sessionStorage.getItem("filterNum");

    try {
      const res = await axios.get(`${process.env.REACT_APP_DOMAIN}words/retrieve/${repeated ? `?repeated=${repeated}` : ""}`, {
        headers: { Authorization: `token ${token}` },
      });

      if (typeof res.data === "object") setData(res.data);
    } catch (err) {
      setNoWordAlert("No Word Found!");
    }
  };

  const hitUpdateHandler = () => {
    setHitUpdate(false);
  };

  useEffect(() => {
    getWord();
  }, []);

  useEffect(() => {
    if (!hitUpdate) getWord();
  }, [hitUpdate]);

  return (
    <>
      {hitUpdate ? (
        <UpdateForm wordData={data} updateHandler={hitUpdateHandler} />
      ) : (
        <div className={styles.mainConytainer}>
          <FilterRepeatForm />
          {noWordAlert && <p>{noWordAlert}</p>}
          <div className={`${styles.flashcard} ${isFlipped && styles.flip}`}>
            <div className={styles.frontSide} onMouseEnter={() => setIsFlipped(true)}>
              {data.word}
            </div>
            <div className={styles.backSide} onMouseLeave={() => setIsFlipped(false)}>
              ترجمه:&nbsp;
              {data.translation}
              <br />
              توضیح:&nbsp;
              {data.description}
              <br />
              تعداد تکرار:&nbsp;
              {data.repeated}
            </div>
          </div>
          <div className={styles.btnContainer}>
            <button className={styles.btn} onClick={() => setHitUpdate(true)} disabled={data.repeated === 0}>
              Update Word
            </button>
            <button className={styles.btn} onClick={getWord} disabled={data.repeated === 0}>
              Next Word
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default StudyWordForm;

import React, { useState } from "react";
import styles from "./FilterRepeatForm.module.css";

const FilterRepeatForm = () => {
  const [checked, setChecked] = useState(false);
  const [filterNum, setFilterNum] = useState(sessionStorage.getItem("filterNum") || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (filterNum === "") {
      sessionStorage.removeItem("filterNum");
      setChecked(false);
    } else {
      sessionStorage.setItem("filterNum", Number(filterNum));
    }
  };

  const handleCheckBox = () => {
    if (checked) sessionStorage.removeItem("filterNum");
    setChecked(!checked);
  };

  return (
    <form className={styles.filterForm} onSubmit={handleSubmit}>
      <input type="checkbox" name="limit-check" id="limit-check" checked={checked} onChange={handleCheckBox} />
      <label htmlFor="limit-check">Limit result</label>
      <input
        className={styles.filterNumInput}
        type="number"
        name="filter-number"
        disabled={!checked}
        onChange={(e) => setFilterNum(e.target.value)}
        value={filterNum}
      />
      <button type="submit" disabled={!checked}>
        Filter
      </button>
    </form>
  );
};

export default FilterRepeatForm;

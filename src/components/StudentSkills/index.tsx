import styles from "./styles.module.css";
import { useState, useEffect } from "react";

type StudentSkills = {
  skillsProps: string[];
  title: string;
  type: string;
  changeSkills(skills: string[], type: string): any;
};

const StudentSkills = (props: StudentSkills) => {
  const { title, skillsProps, type } = props;
  const [skills, setSkills] = useState([...skillsProps, ""]);

  useEffect(() => {
    setSkills([...skillsProps]);
  }, [skillsProps]);

  // Edit array skill type of student by getting the index
  const handleArrayValues = (event: any) => {
    const { name, value } = event.target;

    // Get the index of the skill
    const index = name.split("_").pop();

    // Copy the main skill attribute to update it and update state
    const skillsCopy = Array.from(skills);
    skillsCopy[index] = value;
    setSkills([...skillsCopy]);
    props.changeSkills(skillsCopy, type);
  };

  // Add a new skill to students skills by adding a new empty field in the array
  const addArraySkill = (event: any) => {
    event.preventDefault();

    const { name, value } = event.target;
    const newSkillArray = [...skills, ""];
    setSkills([...newSkillArray]);
    props.changeSkills(newSkillArray, type);
  };

  return (
    <>
      <div className="field">
        <div className={styles.labelButton}>
          <div className="field-label is-normal">
            <label className="label">{title}</label>
          </div>
        </div>
        <div className={styles.labelButton}>
          <div className="field-body">
            <button
              className="button is-small is-rounded"
              onClick={addArraySkill}
            >
              <span className="icon is-small">
                <i className="fas fa-plus"></i>
              </span>
            </button>
          </div>
        </div>
      </div>

      {skills?.map((skill, index) => {
        return (
          <div className="field" key={index}>
            <input
              className="input"
              id={`${type}_${index}`}
              name={`${type}_${index}`}
              type="text"
              value={skill ?? ""}
              onChange={handleArrayValues}
            ></input>
          </div>
        );
      })}
    </>
  );
};

export default StudentSkills;

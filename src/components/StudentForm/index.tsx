import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Config from "../../config";
import FileUpload from "../FileUpload";
import StudentSkills from "../StudentSkills";
import { deleteEmptySpaces } from "../../../util/functions";

import styles from "./styles.module.css";

type StudentFormProp = {
  student?: any;
  isNew?: boolean;
};

const StudentForm = (props: StudentFormProp) => {
  const studentId = props?.student?.id;
  const [student, setStudent] = useState(props.student);
  const [isNew, setIsNew] = useState(props?.isNew ?? false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setStudent(props.student);
  }, [studentId]);

  const handleInputsValues = (event: any) => {
    const { name, value } = event.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSetMessage = (message: string) => {
    setMessage(message);
    const interval = setInterval(() => {
      setMessage("");
      clearInterval(interval);
    }, 3000);
  };

  const handleSetError = (message: string) => {
    setError(message);
    const interval = setInterval(() => {
      setError("");
      clearInterval(interval);
    }, 3000);
  };

  const handleSaveStudent = (event: any) => {
    event.preventDefault();
    setLoading(true);

    if (isNew) {
      console.log("Creating a new student...", student);
      axios
        .post(Config.studentsApi, student)
        .then((response) => {
          handleSetMessage("User created!");
          setStudent({
            id: "",
            first_name: "",
            last_name: "",
            description: "",
            age: "",
            work_experience: [""],
            years_experience: [""],
            tech_skills: [""],
            soft_skills: [""],
            observations: [""],
          });
          console.log("Create user response", response.data);
        })
        .catch((error) => {
          if (error.response && error.response.status == 409) {
            handleSetError(error.response.data);
          }

          console.error("There was an error creating a student.", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      console.log("Updating student info...", student);

      // Deleting empty spaces created when a user wanted to create a new skill and the input was empty
      const workExperience = deleteEmptySpaces(student.work_experience);
      const softSkills = deleteEmptySpaces(student.soft_skills);
      const techSkills = deleteEmptySpaces(student.tech_skills);
      console.log(student.tech_skills);
      console.log(techSkills);
      setStudent({
        ...student,
        ["work_experience"]: workExperience,
        ["soft_skills"]: softSkills,
        ["tech_skills"]: techSkills,
      });

      axios
        .put(`${Config.studentsApi}/${student.id}`, {
          ...student,
          ["work_experience"]: workExperience,
          ["soft_skills"]: softSkills,
          ["tech_skills"]: techSkills,
        })
        .then((response) => {
          handleSetMessage("User updated!");
          console.log("Create user response", response.data);
        })
        .catch((error) => {
          console.error("There was an error updating the student", error);
        })
        .finally(() => {
          setStudent({
            ...student,
            ["work_experience"]: workExperience,
            ["soft_skills"]: softSkills,
            ["tech_skills"]: techSkills,
          });
          setLoading(false);
        });
    }
  };

  // Function to change or add skills of the student
  const changeSkills = (skills: string[], type: string) => {
    setStudent({ ...student, [type]: [...skills] });
  };

  // Function to make soft delete of the student and change status to inactive
  const deleteStudent = async (event: any) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${Config.studentsApi}/${student.id}/delete-student`
      );

      if (response.status == 200) {
        window.location.assign("/");
      }
    } catch (error) {
      console.log("There was an error deleting the student", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to upload a new image in base64 to the student
  const onChangePicture64 = (picture: string) => {
    // If user isn't new, create a new property to handle before image url and new base64 image
    const propertyName = isNew ? "picture" : "picture_base64";
    setStudent({ ...student, [propertyName]: picture });
  };

  const renderForm = () => {
    return (
      <form className="box">
        <FileUpload
          picture={student?.picture}
          onChangePicture64={onChangePicture64}
        ></FileUpload>
        <br />
        {isNew && (
          <>
            <label className="label">Identification</label>
            <input
              className="input"
              type="text"
              id="id"
              name="id"
              placeholder="Identification"
              value={student?.id ?? ""}
              onChange={handleInputsValues}
              disabled={loading}
            />
            <br />
            <br />
          </>
        )}
        <label className="label">First name</label>
        <input
          className="input"
          type="text"
          id="first_name"
          name="first_name"
          placeholder="First name"
          value={student?.first_name ?? ""}
          onChange={handleInputsValues}
          disabled={loading}
        />
        <br />
        <br />
        <label className="label">Last name</label>
        <input
          className="input"
          type="text"
          id="last_name"
          name="last_name"
          value={student?.last_name ?? ""}
          onChange={handleInputsValues}
          placeholder="Last name"
          disabled={loading}
        />
        <br></br>
        <br></br>

        <label className="label">Age</label>
        <input
          className="input"
          type="number"
          id="age"
          name="age"
          value={student?.age ?? ""}
          onChange={handleInputsValues}
          placeholder="Age"
          disabled={loading}
        />
        <br></br>
        <br></br>

        <label className="label">Years of experience</label>
        <input
          className="input"
          type="number"
          id="years_experience"
          name="years_experience"
          value={student?.years_experience ?? ""}
          onChange={handleInputsValues}
          placeholder="Years of experience"
          disabled={loading}
        />
        <br></br>
        <br></br>

        <label className="label">Description</label>
        <textarea
          className="textarea"
          rows={3}
          id="description"
          name="description"
          value={student?.description ?? ""}
          onChange={handleInputsValues}
          placeholder="Description"
          disabled={loading}
        />
        <br></br>
        <label className="label">Observations</label>
        <textarea
          className="textarea"
          id="observations"
          name="observations"
          rows={3}
          value={student?.observations ?? ""}
          onChange={handleInputsValues}
          placeholder="Observations"
          disabled={loading}
        />
        <br />
        <StudentSkills
          key={"0"}
          skillsProps={student?.work_experience ?? ["", ""]}
          changeSkills={changeSkills}
          title={"Work experience"}
          type="work_experience"
        ></StudentSkills>
        <br />
        <StudentSkills
          key={"1"}
          skillsProps={student?.soft_skills ?? ["", ""]}
          changeSkills={changeSkills}
          title={"Soft skills"}
          type="soft_skills"
        ></StudentSkills>
        <br></br>
        <StudentSkills
          key={"2"}
          skillsProps={student?.tech_skills ?? ["", ""]}
          changeSkills={changeSkills}
          title={"Tech skills"}
          type="tech_skills"
        ></StudentSkills>
        <br></br>
        <br></br>
        <div className="" style={{ margin: "0.8rem" }}>
          <div className="columns">
            <input
              className={`button is-primary ${loading ? "is-loading" : ""}`}
              type="submit"
              value="Submit"
              disabled={loading}
              onClick={handleSaveStudent}
            />
            <Link href={"/"} passHref>
              <a className={`button`} style={{ marginLeft: "0.5rem" }}>
                Go to Students List
              </a>
            </Link>
            <div className="column">
              {!!error && <span className={styles.errorMessage}>{error}</span>}
              {!!message && (
                <span className={styles.successMessage}>{message}</span>
              )}
            </div>
            {!isNew && (
              <a className={`button is-danger `} onClick={deleteStudent}>
                Delete student
              </a>
            )}
          </div>
        </div>
      </form>
    );
  };

  return <>{renderForm()}</>;
};

export default StudentForm;

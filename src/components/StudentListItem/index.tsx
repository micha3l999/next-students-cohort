import Link from "next/link";
import styles from "./styles.module.css";
import Image from "next/image";

const StudentItem = (props: any) => {
  const student = props.student;
  return (
    <>
      <div className={styles.cardBulmaContainer}>
        <a href={`/student/${student.id}`}>
          <div className="card">
            <div className="card-image">
              <figure className="image is-2by1">
                <img src={student.picture} alt="Placeholder image" />
              </figure>
            </div>
            <div className="card-content">
              <div className="media">
                <div className="media-content">
                  <p className="title is-6" id={styles.studentName}>
                    {substringName(student.first_name, student.last_name)}
                  </p>

                  <p className="subtitle is-6">
                    {student.years_experience}{" "}
                    {student.years_experience == 1
                      ? "Año de experiencia"
                      : "Años de experiencia"}
                  </p>
                </div>
              </div>

              <div className="content">
                <div className={styles.studentDescription}>
                  {student.description}
                </div>
                <div className={styles.skillContainer}>
                  Soft Skills:
                  <ul className={styles.list}>
                    {student.soft_skills.map((skill: any) => (
                      <li>{skill}</li>
                    ))}
                  </ul>
                </div>

                <div className={styles.skillContainer}>
                  Tech Skills:
                  <ul className={styles.list}>
                    {student.tech_skills.map((skill: any) => (
                      <li>{skill}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
    </>
  );
};

const substringName = (first_name: String, last_name: String) => {
  return first_name.split(" ")[0] + " " + last_name.split(" ")[0];
};

export default StudentItem;

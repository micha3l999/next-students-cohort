import { useEffect, useRef, useState } from "react";
import axios from "axios";

import StudentListItem from "../StudentListItem";

import styles from "./styles.module.css";
import Config from "../../config";
import Pagination from "../pagination";

const StudentsList = () => {
  const [students, setStudents] = useState([{}]);
  const [lastEvaluatedKey, setLastEvaluatedKey] = useState();
  const [studentsCount, setStudentsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const totalStudents = useRef([]);
  const lastPageFetched = useRef(1);

  // Change to next page
  const onPageChangedNext = (
    totalPages: number,
    pageLimit: number,
    currentPage: number
  ) => {
    setLoading(true);

    // Fetch students from API if the last page fetched is less than the current page
    if (currentPage > lastPageFetched.current) {
      getData(lastEvaluatedKey)
        .then((response) => {
          const students: [] = response[0].data.items;
          setStudents(students);
          setLastEvaluatedKey(response[0].data.lastEvaluatedKey);
          setError("");
          totalStudents.current.push(...students);
          lastPageFetched.current = currentPage;
        })
        .catch((error) => {
          console.error("There was an error getting students from API", error);
          setStudents([]);
          setError(
            "Ups, there was an error getting students info! Please try it again later"
          );
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(true);
      const fromElement = currentPage * pageLimit - 12;
      console.log("from" + fromElement);

      const toElement = currentPage * pageLimit;
      console.log("to" + toElement);

      setStudents(totalStudents.current.slice(fromElement, toElement));
      console.log(totalStudents.current.slice(fromElement, toElement));

      setLoading(false);
    }
  };

  // Change to previous page
  const onPageChangedPrevious = (
    totalPages: number,
    pageLimit: number,
    currentPage: number
  ) => {
    // Change page students of the totalstudents saved
    setLoading(true);
    const fromElement = currentPage * pageLimit - 12;
    const toElement = currentPage * pageLimit;
    setStudents(totalStudents.current.slice(fromElement, toElement));
    setLoading(false);
  };

  useEffect(() => {
    // Fetch students from API
    setLoading(true);
    getData(lastEvaluatedKey)
      .then((response) => {
        const students: [] = response[0].data.items;
        const studentsCount = response[1].data.count;
        setStudents(students);
        setLastEvaluatedKey(response[0].data.lastEvaluatedKey);
        setStudentsCount(studentsCount);
        totalStudents.current.push(...students);

        setError("");
      })
      .catch((error) => {
        console.error("There was an error getting students from API", error);
        setStudents([]);
        setStudentsCount(0);
        setError(
          "Ups, there was an error getting students info! Please try it again later"
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className={styles.studentsListContainer}>
        {loading && (
          <progress className="progress is-small is-primary" max="100">
            15%
          </progress>
        )}
        {!loading && error && (
          <div className="container">
            <div className="notification">{error}</div>
          </div>
        )}
        {!loading &&
          students.map((student: any) => {
            return (
              <>
                <StudentListItem key={student.id} student={student} />
              </>
            );
          })}
      </div>
      <div className="block" />
      <div className={styles.navigation}>
        <a className="button is-link" href={"/student/new"}>
          Add
        </a>

        <Pagination
          totalRecords={studentsCount}
          pageLimit={12}
          pageNeighbours={1}
          onPageChangedNext={onPageChangedNext}
          onPageChangedPrevious={onPageChangedPrevious}
        ></Pagination>
      </div>
    </>
  );
};

const getData = async (lastEvaluatedKey: any) => {
  const results = await Promise.all([
    axios.get(Config.studentsApi, {
      params: {
        itemsLimit: 12,
        last: lastEvaluatedKey,
      },
    }),
    axios.get(Config.studentsApi + "/count"),
  ]);

  return results;
};

export default StudentsList;

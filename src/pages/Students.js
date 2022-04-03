import React, { useEffect, useState } from "react";
import Search from "./Search";
import Student from "./Student";
import "../assets/styles/styles.css";

const Students = ({ students }) => {
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInputByName, setSearchInputByName] = useState("");
  const [searchInputByTag, setSearchInputByTag] = useState("");
  const [originalStudents, setOriginalStudents] = useState(students);

  useEffect(() => {
    if (!searchInputByName && !searchInputByTag) return;

    if (searchInputByName && searchInputByTag) {
      const filteredData = originalStudents.filter((student) => {
        const name = student.firstName + " " + student.lastName;
        return (
          name.toLowerCase().includes(searchInputByName.toLowerCase()) &&
          student.tags?.some((tag) =>
            tag.toLowerCase().includes(searchInputByTag.toLowerCase())
          )
        );
      });
      setFilteredResults(filteredData);
    } else if (searchInputByName) {
      const filteredData = originalStudents.filter((student) => {
        const name = student.firstName + " " + student.lastName;
        return name.toLowerCase().includes(searchInputByName.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else if (searchInputByTag) {
      const filteredData = originalStudents.filter((student) =>
        student.tags?.some((tag) =>
          tag.toLowerCase().includes(searchInputByTag.toLowerCase())
        )
      );
      setFilteredResults(filteredData);
    }
  }, [searchInputByName, searchInputByTag, originalStudents]);

  const hasSearchInput =
    searchInputByName.length > 0 || searchInputByTag.length > 0;

  return (
    <div>
      <Search
        placeholder={"Search by name"}
        changeSearchInput={setSearchInputByName}
      ></Search>
      <Search
        placeholder={"Search by Tag"}
        changeSearchInput={setSearchInputByTag}
      ></Search>
      <Student
        studentArray={hasSearchInput ? filteredResults : originalStudents}
        setOriginalStudents={setOriginalStudents}
      ></Student>
    </div>
  );
};

export default Students;

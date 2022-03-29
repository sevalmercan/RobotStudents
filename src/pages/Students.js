import React, { useEffect, useState } from "react";
import fetchProducts from "../redux/fetchProducts";
import { useSelector, useDispatch } from "react-redux";
import { TailSpin } from "react-loader-spinner";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import Search from "./Search";
import Student from "./Student";
import "../assets/styles/styles.css";

const Students = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.productsReducer);
  const [filteredResults, setFilteredResults] = useState([]);
  const [robotStudents, setRobotStudents] = useState([]);
  const [searchInputByName, setSearchInputByName] = useState("");
  const [searchInputByTag, setSearchInputByTag] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (!store.pending && store.products.length > 0) {
      setRobotStudents(
        store.products.map((item) => ({ ...item, tags: [], open: false }))
      );
    }
  }, [store.pending, store.products]);

  useEffect(() => {
    if (!searchInputByName && !searchInputByTag) return;

    if (searchInputByName && searchInputByTag) {
      const filteredData = robotStudents.filter(
        (student) =>
          (student.firstName
            .toLowerCase()
            .includes(searchInputByName.toLowerCase()) ||
            student.lastName
              .toLowerCase()
              .includes(searchInputByName.toLowerCase())) &&
          student.tags?.some((tag) =>
            tag.toLowerCase().includes(searchInputByTag.toLowerCase())
          )
      );
      setFilteredResults(filteredData);
    } else if (searchInputByName) {
      const filteredData = robotStudents.filter(
        (student) =>
          student.firstName
            .toLowerCase()
            .includes(searchInputByName.toLowerCase()) ||
          student.lastName
            .toLowerCase()
            .includes(searchInputByName.toLowerCase())
      );
      setFilteredResults(filteredData);
    } else if (searchInputByTag) {
      const filteredData = robotStudents.filter((student) =>
        student.tags?.some((tag) =>
          tag.toLowerCase().includes(searchInputByTag.toLowerCase())
        )
      );
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(robotStudents);
    }
  }, [searchInputByName, searchInputByTag, robotStudents]);

  return (
    <div>
      {store.pending && <TailSpin height={180} width={180} />}
      <Search
        placeholder={"Search by name"}
        changeSearchInput={setSearchInputByName}
      ></Search>
      <Search
        placeholder={"Search by Tag"}
        changeSearchInput={setSearchInputByTag}
      ></Search>
      {searchInputByName.length > 0 || searchInputByTag.length > 0 ? (
        <Student
          studentArray={filteredResults}
          setRobotStudents={setRobotStudents}
        ></Student>
      ) : (
        <Student
          studentArray={robotStudents}
          setRobotStudents={setRobotStudents}
        ></Student>
      )}
    </div>
  );
};

export default Students;

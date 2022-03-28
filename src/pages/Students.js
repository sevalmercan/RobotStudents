import React, { useEffect, useState } from "react";
import fetchProducts from "../redux/fetchProducts";
import { useSelector, useDispatch } from "react-redux";
import { TailSpin } from "react-loader-spinner";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import Search from "./Search";
import "../assets/styles/styles.css";

const Students = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.productsReducer);
  const [deneme, setDeneme] = useState("");
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

  const Student = ({ studentArray }) => {
    const robotStudent = robotStudents;
    return (
      <div>
        {studentArray?.map((student) => (
          <div key={student.id} className="student-container">
            <div className="non-collapse">
              <img
                src={student.pic}
                className="student-avatar"
                alt="studentPic"
              ></img>
              <div className="information-container">
                <div className="name-surname">
                  {student.firstName} {student.lastName}
                </div>
                <div className="information-details">
                  <div> Email: {student.email}</div>
                  <div> Company: {student.company} </div>
                  <div> Skill: {student.skill} </div>
                  <div>Avarage: {calculateGrades(student.grades)}%</div>
                </div>
                <div className="collapse">
                  <Collapse
                    className="information-details"
                    in={
                      robotStudent?.find((item) => item.id === student.id)?.open
                    }
                    key={student.id}
                    timeout={5}
                  >
                    {student.grades?.map((grade, index) => (
                      <div key={index}>
                        Test {index + 1} :{grade}%
                      </div>
                    ))}
                  </Collapse>
                </div>
                <div className="tags">
                  {robotStudent
                    ?.find((item) => item.id === student.id)
                    ?.tags.map((tag) => (
                      <Button variant="contained" className="tag" key={tag}>
                        {tag}
                      </Button>
                    ))}
                </div>
                <input
                  className="tag-input"
                  placeholder="Add tag"
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      addTag(student.id, event.target.value);
                    }
                  }}
                />
              </div>
              <div
                className="icon"
                onClick={() => handleFilterOpening(student.id)}
              >
                {!robotStudent?.find((item) => item.id === student.id)?.open ? (
                  <AiOutlinePlus size={"45px"} />
                ) : (
                  <AiOutlineMinus size={"45px"} />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const handleFilterOpening = (id) => {
    setRobotStudents(
      robotStudents.map((item) =>
        item.id === id ? { ...item, open: !item.open } : item
      )
    );
  };

  const calculateGrades = (gradesArray) => {
    if (!gradesArray || gradesArray.length === 0) return 0;
    let sum = 0;

    for (var i = 0; i < gradesArray?.length; i++) {
      sum += parseInt(gradesArray[i], 10);
    }

    const avg = sum / gradesArray.length;
    return avg.toFixed(2);
  };
  const changeSearchInput = (event) => {
    setDeneme(event);
  };
  const addTag = (id, tagName) => {
    setRobotStudents(
      robotStudents.map((item) =>
        item.id === id ? { ...item, tags: [...item.tags, tagName] } : item
      )
    );
  };
  console.log(deneme);
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
        <Student studentArray={filteredResults}></Student>
      ) : (
        <Student studentArray={robotStudents}></Student>
      )}
    </div>
  );
};

export default Students;

import React from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { handleFilterOpening, calculateGrades } from "../helpers/helpers";
import CollapseMenu from "./CollapseMenu";
import Tags from "./Tags";

const Student = ({ studentArray, setOriginalStudents }) => {
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
              <CollapseMenu studentArray={studentArray} student={student} />
              <Tags
                studentArray={studentArray}
                student={student}
                setOriginalStudents={setOriginalStudents}
              />
            </div>
            <div
              className="icon"
              onClick={() =>
                setOriginalStudents(
                  handleFilterOpening(student.id, studentArray)
                )
              }
            >
              {!studentArray?.find((item) => item.id === student.id)?.open ? (
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

export default Student;

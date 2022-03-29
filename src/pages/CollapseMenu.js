import Collapse from "@mui/material/Collapse";

const CollapseMenu = ({ studentArray, student }) => {
  return (
    <div className="collapse">
      <Collapse
        className="information-details"
        in={studentArray?.find((item) => item.id === student.id)?.open}
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
  );
};

export default CollapseMenu;

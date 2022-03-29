import Button from "@mui/material/Button";
import { addTag } from "../helpers/helpers";
const Tags = ({ studentArray, student, setRobotStudents }) => {
  return (
    <div>
      <div className="tags">
        {studentArray
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
            setRobotStudents(
              addTag(student.id, event.target.value, studentArray)
            );
          }
        }}
      />
    </div>
  );
};

export default Tags;

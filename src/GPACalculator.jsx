import { useState } from "react";

const GPACalculator = () => {
  const [courses, setCourses] = useState([{ course: "", grade: "" }]);
  const [gpa, setGpa] = useState(null);
  const [error, setError] = useState("");

  const handleInputChange = (index, event) => {
    const values = [...courses];
    values[index][event.target.name] = event.target.value;
    setCourses(values);
    console.log(`Course ${index + 1} updated:`, values[index]);
  };

  const handleRemove = (index) => {
    const values = [...courses];
    values.splice(index, 1);
    setCourses(values);
    console.log(`Removed course ${index + 1}`);
  };

  const handleAddCourse = () => {
    setCourses([...courses, { course: "", grade: "" }]);
  };

  const calculateGPA = () => {
      let totalPoints = 0;
      let numberOfCourses = 0;
      let invalidGrade = false;
  
      courses.forEach(course => {
        const gradePoint = getGradePoint(course.grade);
        if (!isNaN(gradePoint)) {
          totalPoints += gradePoint;
          numberOfCourses += 1;
        } else {
          invalidGrade = true;
        }
      });
  
      if (invalidGrade) {
        setError('One or more grades are invalid.');
        console.error('Calculation error: One or more grades are invalid.');
      } else {
        setError('');
        if (numberOfCourses > 0) {
          setGpa(totalPoints / numberOfCourses);
          console.log('GPA calculated:', (totalPoints / numberOfCourses).toFixed(2));
        } else {
          setGpa(0);
          console.log('No valid grades entered.');
        }
      }
    };

    
  const getGradePoint = (grade) => {
    switch (grade.toUpperCase()) {
      case "A+":
        return 5.0;
      case "A":
        return 4.0;
      case "A-":
        return 3.5;
      case "B":
        return 3.0;
      case "C":
        return 2.0;
      case "D":
        return 1.0;
      case "F":
        return 0.0;
      default:
        return NaN;
    }
  };

  return (
    <div className=" flex pt-10 justify-center w-full h-screen">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4 text-center uppercase">
        GPA Calculator
        </h1>
        {courses.map((course, index) => (
          <div key={index} className="flex flex-col gap-3 md:gap-0 md:flex-row md:space-x-4 mb-4">
            <input
              type="text"
              value={course.course}
              onChange={(event) => handleInputChange(index, event)}
              name="course"
              placeholder="Course Name"
              className="p-2 border rounded w-full md:w-1/2"
            />
            <input
              type="text"
              name="grade"
              value={course.grade}
              onChange={(event) => handleInputChange(index, event)}
              placeholder="Grade"
              className="p-2 border rounded w-full md:w-1/2"
            />
            <button
              onClick={handleRemove}
              className="mx-auto bg-red-500 hover:bg-gradient-to-r from-red-500 to-blue-500 text-white font-bold w-fit  py-2 px-4 rounded transition-all duration-500 ease-in-out"
            >
              Remove
            </button>
          </div>
        ))}
        <div className=" flex  justify-center gap-4">
          <button
            onClick={handleAddCourse}
            className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-2 px-4 rounded transition-all duration-500 ease-in-out hover:bg-gradient-to-l"
          >
            Add Course
          </button>
          <button
            onClick={calculateGPA}
            className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-2 px-4 rounded transition-all duration-500 ease-in-out hover:bg-gradient-to-l"
          >
            Calculate GPA
          </button>
        </div>
       <div className="flex items-center justify-center">
       {gpa !== null && (
          <h2 className="text-2xl font-bold  mt-4">
            Your GPA is: {gpa.toFixed(2)}
          </h2>
        )}
       </div>
      </div>
    </div>
  );
};

export default GPACalculator;

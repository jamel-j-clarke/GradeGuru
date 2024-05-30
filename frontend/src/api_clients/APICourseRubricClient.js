import HTTPClient from './HTTPClient.js';

export default {
  createCourseRubric: (courseId, courseRubricBody) => {
    return HTTPClient.post(`/api/courses/${courseId}/rubrics`, courseRubricBody)
      .then((courseRubric) => {
        console.log(`Course Rubric: ${JSON.stringify(courseRubric)}`);
        return courseRubric;
      })
      .catch((err) => {
        throw new Error(`Here's what went wrong: ${JSON.stringify(err)}`);
      });
  },

  editCourseRubric: (courseId, courseRubricId, editedCourseRubricBody) => {
    return HTTPClient.put(
      `/api/courses/${courseId}/rubrics/${courseRubricId}`,
      editedCourseRubricBody,
    )
      .then((editedCourseRubric) => {
        console.log(
          `Edited Course Rubric: ${JSON.stringify(editedCourseRubric)}`,
        );
        return editedCourseRubric;
      })
      .catch((err) => {
        throw new Error(`Here's what went wrong: ${JSON.stringify(err)}`);
      });
  },

  getAllCourseRubrics: (courseId) => {
    return HTTPClient.get(`/api/courses/${courseId}/rubrics`)
      .then((courseRubrics) => {
        console.log(`Course Rubric List: ${JSON.stringify(courseRubrics)}`);
        return courseRubrics;
      })
      .catch((err) => {
        throw new Error(`Here's what went wrong: ${JSON.stringify(err)}`);
      });
  },

  getCourseRubric: (courseId, rubricId) => {
    return HTTPClient.get(`/api/courses/${courseId}/rubrics/${rubricId}`)
      .then((courseRubric) => {
        console.log(`Course Rubric: ${JSON.stringify(courseRubric)}`);
        return courseRubric;
      })
      .catch((err) => {
        throw new Error(`Here's what went wrong: ${JSON.stringify(err)}`);
      });
  },

  deleteCourseRubric: (rubricId) => {
    return HTTPClient.delete(
      `/api/courses/${courseId}/rubrics/${rubricId}`,
    ).then((deletedCourseRubric) => {
      console.log(
        `Deleted Course Rubric: ${JSON.stringify(deletedCourseRubric)}`,
      );
      return deletedCourseRubric;
    });
  },
};

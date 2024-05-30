import HTTPClient from './HTTPClient.js';

export default {
  createCourseAssignment: (courseId, courseAssignmentBody) => {
    return HTTPClient.post(
      `/api/courses/${courseId}/assignments`,
      courseAssignmentBody,
    )
      .then((courseAssignment) => {
        console.log(`Course Assignment: ${JSON.stringify(courseAssignment)}`);
        return courseAssignment;
      })
      .catch((err) => {
        throw new Error(`Here's what went wrong: ${JSON.stringify(err)}`);
      });
  },

  editCourseAssignment: (
    courseId,
    courseAssignmentId,
    courseAssignmentBody,
  ) => {
    return HTTPClient.put(
      `/api/courses/${courseId}/assignments/${courseAssignmentId}`,
      courseAssignmentBody,
    )
      .then((editedCourseAssignment) => {
        console.log(
          `Edited Course Assignment: ${JSON.stringify(editedCourseAssignment)}`,
        );
        return editedCourseAssignment;
      })
      .catch((err) => {
        throw new Error(`Here's what went wrong: ${JSON.stringify(err)}`);
      });
  },

  getAllCourseAssignments: (courseId) => {
    return HTTPClient.get(`/api/courses/${courseId}/assignments`)
      .then((courseAssignments) => {
        console.log(
          `Course Assignment List: ${JSON.stringify(courseAssignments)}`,
        );
        return courseAssignments;
      })
      .catch((err) => {
        throw new Error(`Here's what went wrong: ${JSON.stringify(err)}`);
      });
  },

  getCourseAssignment: (courseId, assignmentId) => {
    return HTTPClient.get(
      `/api/courses/${courseId}/assignments/${assignmentId}`,
    )
      .then((courseAssignment) => {
        console.log(`Course Assignment: ${JSON.stringify(courseAssignment)}`);
        return courseAssignment;
      })
      .catch((err) => {
        throw new Error(`Here's what went wrong: ${JSON.stringify(err)}`);
      });
  },

  deleteCourseAssignment: (courseId, assignmentId) => {
    return HTTPClient.get(
      `/api/courses/${courseId}/assignments/${assignmentId}`,
    ).then((deletedAssignment) => {
      console.log(
        `Deleted Course Assignment: ${JSON.stringify(deletedAssignment)}`,
      );
      return deletedAssignment;
    });
  },
};

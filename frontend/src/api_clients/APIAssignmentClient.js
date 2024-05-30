import HTTPClient from './HTTPClient.js';

export default {
  createAssignment: (assignmentBody) => {
    return HTTPClient.post(`/api/assignments`, assignmentBody)
      .then((assignment) => {
        console.log(`Assignment: ${JSON.stringify(assignment)}`);
        return assignment;
      })
      .catch((err) => {
        throw new Error(`Here's what went wrong: ${JSON.stringify(err)}`);
      });
  },

  editAssignment: (assignmentId, assignmentBody) => {
    return HTTPClient.put(`/api/assignments/${assignmentId}`, assignmentBody)
      .then((editedAssignment) => {
        console.log(`Edited Assignment: ${JSON.stringify(editedAssignment)}`);
        return editedAssignment;
      })
      .catch((err) => {
        throw new Error(`Here's what went wrong: ${JSON.stringify(err)}`);
      });
  },

  getAllAssignments: () => {
    return HTTPClient.get(`/api/assignments`)
      .then((assignments) => {
        console.log(`Assignment List: ${JSON.stringify(assignments)}`);
        return assignments;
      })
      .catch((err) => {
        throw new Error(`Here's what went wrong: ${JSON.stringify(err)}`);
      });
  },

  getAssignment: (assignmentId) => {
    return HTTPClient.get(`/api/assignments/${assignmentId}`)
      .then((assignment) => {
        console.log(`Assignment: ${JSON.stringify(assignment)}`);
        return assignment;
      })
      .catch((err) => {
        throw new Error(`Here's what went wrong: ${JSON.stringify(err)}`);
      });
  },

  deleteAssignment: (assignmentId) => {
    return HTTPClient.get(`/api/assignments/${assignmentId}`).then(
      (deletedAssignment) => {
        console.log(`Deleted Assignment: ${JSON.stringify(deletedAssignment)}`);
        return deletedAssignment;
      },
    );
  },
};

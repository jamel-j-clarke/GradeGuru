import HTTPClient from './HTTPClient.js';

// potentially, the route can be
//   /api/courses/${ courseId }/sections/${ sectionId }/assignments
// as opposed to
//   /api/sections/${sectionId}/assignments

export default {
  createSectionAssignment: (sectionId, sectionAssignmentBody) => {
    return HTTPClient.post(
      `/api/sections/${sectionId}/assignments`,
      sectionAssignmentBody,
    )
      .then((sectionAssignment) => {
        console.log(
          `Secction Assignment: ${JSON.stringify(sectionAssignment)}`,
        );
        return sectionAssignment;
      })
      .catch((err) => {
        throw new Error(`Here's what went wrong: ${JSON.stringify(err)}`);
      });
  },

  editSectionAssignment: (
    sectionId,
    sectionAssignmentId,
    sectionAssignmentBody,
  ) => {
    return HTTPClient.put(
      `/api/sections/${sectionId}/assignments/${sectionAssignmentId}`,
      sectionAssignmentBody,
    )
      .then((editedSectionAssignment) => {
        console.log(
          `Edited Section Assignment: ${JSON.stringify(
            editedSectionAssignment,
          )}`,
        );
        return editedSectionAssignment;
      })
      .catch((err) => {
        throw new Error(`Here's what went wrong: ${JSON.stringify(err)}`);
      });
  },

  getAllSectionAssignments: (sectionId) => {
    return HTTPClient.get(`/api/sections/${sectionId}/assignments`)
      .then((sectionAssignments) => {
        console.log(
          `Section Assignment List: ${JSON.stringify(sectionAssignments)}`,
        );
        return sectionAssignments;
      })
      .catch((err) => {
        throw new Error(`Here's what went wrong: ${JSON.stringify(err)}`);
      });
  },

  getSectionAssignment: (sectionId, sectionAssignmentId) => {
    return HTTPClient.get(
      `/api/sections/${sectionId}/assignments/${sectionAssignmentId}`,
    )
      .then((sectionAssignment) => {
        console.log(`Section Assignment: ${JSON.stringify(sectionAssignment)}`);
        return sectionAssignment;
      })
      .catch((err) => {
        throw new Error(`Here's what went wrong: ${JSON.stringify(err)}`);
      });
  },

  deleteSectionAssignment: (sectionId, sectionAssignmentId) => {
    return HTTPClient.get(
      `/api/sections/${sectionId}/assignments/${sectionAssignmentId}`,
    ).then((deletedSectionAssignment) => {
      console.log(
        `Deleted Section Assignment: ${JSON.stringify(
          deletedSectionAssignment,
        )}`,
      );
      return deletedSectionAssignment;
    });
  },
};

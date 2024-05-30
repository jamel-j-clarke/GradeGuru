import HTTPClient from './HTTPClient.js';

// potentially, the route can be
//   /api/courses/${ courseId }/sections/${ sectionId }/rubrics
// as opposed to
//   /api/sections/${sectionId}/rubrics

export default {
  createSectionRubric: (sectionId, sectionRubricBody) => {
    return HTTPClient.post(
      `/api/sections/${sectionId}/rubrics`,
      sectionRubricBody,
    )
      .then((sectionRubric) => {
        console.log(`Section Rubric: ${JSON.stringify(sectionRubric)}`);
        return sectionRubric;
      })
      .catch((err) => {
        throw new Error(`Here's what went wrong: ${JSON.stringify(err)}`);
      });
  },

  editSectionRubric: (sectionId, sectionRubricId, editedSectionRubricBody) => {
    return HTTPClient.put(
      `/api/sections/${sectionId}/rubrics/${sectionRubricId}`,
      editedSectionRubricBody,
    )
      .then((editedSectionRubric) => {
        console.log(
          `Edited Section Rubric: ${JSON.stringify(editedSectionRubric)}`,
        );
        return editedSectionRubric;
      })
      .catch((err) => {
        throw new Error(`Here's what went wrong: ${JSON.stringify(err)}`);
      });
  },

  getAllSectionRubrics: (sectionId) => {
    return HTTPClient.get(`/api/sections/${sectionId}/rubrics`)
      .then((sectionRubrics) => {
        console.log(`Section Rubric List: ${JSON.stringify(sectionRubrics)}`);
        return sectionRubrics;
      })
      .catch((err) => {
        throw new Error(`Here's what went wrong: ${JSON.stringify(err)}`);
      });
  },

  getSectionRubric: (sectionId, sectionRubricId) => {
    return HTTPClient.get(
      `/api/sections/${sectionId}/rubrics/${sectionRubricId}`,
    )
      .then((sectionRubric) => {
        console.log(`Section Rubric: ${JSON.stringify(sectionRubric)}`);
        return sectionRubric;
      })
      .catch((err) => {
        throw new Error(`Here's what went wrong: ${JSON.stringify(err)}`);
      });
  },

  deleteSectionRubric: (sectionRubricId) => {
    return HTTPClient.delete(`/api/sections/rubrics/${sectionRubricId}`).then(
      (deletedSectionRubric) => {
        console.log(
          `Deleted Section Rubric: ${JSON.stringify(deletedSectionRubric)}`,
        );
        return deletedSectionRubric;
      },
    );
  },
};

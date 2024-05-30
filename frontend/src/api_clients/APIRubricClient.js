import HTTPClient from './HTTPClient.js';

export default {
  createRubric: (rubricBody) => {
    console.log(`da body:${JSON.stringify(rubricBody)}`);
    return HTTPClient.post('/api/rubrics', rubricBody)
      .then((rubric) => {
        console.log(`Rubric: ${JSON.stringify(rubric)}`);
        return rubric;
      })
      .catch((err) => {
        throw new Error(`Here's what went wrong: ${JSON.stringify(err)}`);
      });
  },

  editRubric: (rubricId, editedRubricBody) => {
    return HTTPClient.patch(`/api/rubrics/${rubricId}`, editedRubricBody)
      .then((editedRubric) => {
        console.log(`Edited Rubric: ${JSON.stringify(editedRubric)}`);
        return editedRubric;
      })
      .catch((err) => {
        throw new Error(`Here's what went wrong: ${JSON.stringify(err)}`);
      });
  },

  getAllRubrics: () => {
    return HTTPClient.get(`/api/rubrics`)
      .then((rubrics) => {
        console.log(`Rubric List: ${JSON.stringify(rubrics)}`);
        return rubrics;
      })
      .catch((err) => {
        throw new Error(`Here's what went wrong: ${JSON.stringify(err)}`);
      });
  },

  getSectionRubrics: (sectionId) => {
    return HTTPClient.get(`/api/rubrics/sections/${sectionId}`)
      .then((sectionRubrics) => {
        console.log(`Section Rubrics: ${JSON.stringify(sectionRubrics)}`);
        return sectionRubrics;
      })
      .catch((err) => {
        throw new Error(`Here's what went wrong: ${JSON.stringify(err)}`);
      });
  },

  getCourseRubrics: (courseId) => {
    return HTTPClient.get(`/api/courses/${courseId}/rubrics`)
      .then((courseRubrics) => {
        console.log(`Course Rubrics: ${JSON.stringify(courseRubrics)}`);
        return courseRubrics;
      })
      .catch((err) => {
        throw new Error(`Here's what went wrong: ${JSON.stringify(err)}`);
      });
  },

  getRubric: (rubricId) => {
    return HTTPClient.get(`/api/rubrics/${rubricId}`)
      .then((rubric) => {
        console.log(`Rubric: ${JSON.stringify(rubric)}`);
        return rubric;
      })
      .catch((err) => {
        throw new Error(`Here's what went wrong: ${JSON.stringify(err)}`);
      });
  },

  deleteRubric: (rubricId) => {
    return HTTPClient.delete(`/api/rubrics/${rubricId}`).then(
      (deletedRubric) => {
        console.log(`Deleted Rubric: ${JSON.stringify(deletedRubric)}`);
        return deletedRubric;
      },
    );
  },
};

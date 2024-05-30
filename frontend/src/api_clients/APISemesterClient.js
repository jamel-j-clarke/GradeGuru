import HTTPClient from './HTTPClient';

export default {
  createSemester: (semesterBody) => {
    return HTTPClient.post(`/api/semesters`, semesterBody)
      .then((semester) => {
        console.log(`Semester: ${JSON.stringify(semester)}`);
        return semester;
      })
      .catch((err) => {
        // throw new Error(`Here's what went wrong: ${JSON.stringify(err)}`);
        throw new Error(`Here's what went wrong: ${err}`);
      });
  },

  editSemester: (semesterId, semesterBody) => {
    return HTTPClient.put(`/api/semesters/${semesterId}`, semesterBody)
      .then((editedSemester) => {
        console.log(`Edited Semester: ${JSON.stringify(editedSemester)}`);
        return editedSemester;
      })
      .catch((err) => {
        throw new Error(`Here's what went wrong: ${JSON.stringify(err)}`);
      });
  },

  getSemesters: () => {
    return HTTPClient.get(`/api/semesters`)
      .then((semesters) => {
        console.log(`Semester List: ${JSON.stringify(semesters)}`);
        return semesters;
      })
      .catch((err) => {
        throw new Error(`Here's what went wrong: ${JSON.stringify(err)}`);
      });
  },

  getActiveSemester: () => {
    return HTTPClient.get(`/api/semesters/active`)
      .then((activeSemester) => {
        return activeSemester;
      })
      .catch((err) => {
        throw new Error(`Here's what went wrong: ${JSON.stringify(err)}`);
      });
  },

  getSemester: (semesterId) => {
    return HTTPClient.get(`/api/semesters/${semesterId}`)
      .then((semester) => {
        console.log(`Semester: ${semester}`);
        return semester;
      })
      .catch((err) => {
        throw new Error(`Here's what went wrong: ${JSON.stringify(err)}`);
      });
  },

  getSemesterByName: (semesterSeason, semesterYear) => {
    return HTTPClient.get(`/api/semesters/${semesterYear}/${semesterSeason}`)
      .then((semester) => {
        return semester;
      })
      .catch((err) => {
        throw new Error(`Here's what went wrong: ${JSON.stringify(err)}`);
      });
  },

  deleteSemester: (semesterId) => {
    return HTTPClient.delete(`/api/semesters/${semesterId}`)
      .then((deletedSemester) => {
        console.log(`Deleted Semester: ${deletedSemester}`);
        return deletedSemester;
      })
      .catch((err) => {
        throw new Error(`Here's what went wrong: ${JSON.stringify(err)}`);
      });
  },
};

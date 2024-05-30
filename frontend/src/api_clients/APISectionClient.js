import HTTPClient from './HTTPClient';

export default {
  createSection: (sectionBody) => {
    return HTTPClient.post(`/api/sections`, sectionBody)
      .then((section) => {
        console.log(`Section: ${section}`);
        return section;
      })
      .catch((err) => {
        throw new Error(`Here's what went wrong: ${JSON.stringify(err)}`);
      });
  },

  editSection: (sectionId, sectionBody) => {
    return HTTPClient.put(`/api/sections/${sectionId}`, sectionBody)
      .then((editedSection) => {
        console.log(`Edited Section: ${editedSection}`);
        return editedSection;
      })
      .catch((err) => {
        throw new Error(`Here's what went wrong: ${JSON.stringify(err)}`);
      });
  },

  getCourseSections: (courseId) => {
    console.log(`courseId: ${courseId}`);
    return HTTPClient.get(`/api/sections/course/${courseId}`)
      .then((courseSections) => {
        console.log(`Course Sections: ${JSON.stringify(courseSections)}`);
        return courseSections;
      })
      .catch((err) => {
        throw new Error(`Here's what went wrong: ${err}`);
      });
  },

  getSection: (sectionId) => {
    return HTTPClient.get(`/api/sections/${sectionId}`)
      .then((section) => {
        console.log(`Section: ${section}`);
        return section;
      })
      .catch((err) => {
        throw new Error(`Here's what went wrong: ${JSON.stringify(err)}`);
      });
  },

  deleteSection: (sectionId) => {
    return HTTPClient.delete(`/api/sections/${sectionId}`)
      .then((deletedSection) => {
        console.log(`Deleted Section: ${deletedSection}`);
        return deletedSection;
      })
      .catch((err) => {
        throw new Error(`Here's what went wrong: ${JSON.stringify(err)}`);
      });
  },
};

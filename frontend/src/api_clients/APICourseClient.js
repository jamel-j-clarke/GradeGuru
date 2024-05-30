import HTTPClient from './HTTPClient';

export default {
  createCourse: (courseBody) => {
    return HTTPClient.post(`/api/courses`, courseBody)
      .then((course) => {
        console.log(`Course: ${JSON.stringify(course)}`);
        return course;
      })
      .catch((err) => {
        throw new Error(`Here's what went wrong: ${JSON.stringify(err)}`);
      });
  },

  editCourse: (courseId, editedCourseBody) => {
    return HTTPClient.put(`/api/courses/${courseId}`, editedCourseBody)
      .then((editedCourse) => {
        console.log(`Edited Course: ${JSON.stringify(editedCourse)}`);
        return editedCourse;
      })
      .catch((err) => {
        throw new Error(`Here's what went wrong: ${JSON.stringify(err)}`);
      });
  },

  getAllCourses: () => {
    return HTTPClient.get(`/api/courses`)
      .then((courses) => {
        console.log(`Course List: ${JSON.stringify(courses)}`);
        return courses;
      })
      .catch((err) => {
        throw new Error(`Here's what went wrong: ${JSON.stringify(err)}`);
      });
  },

  getSemesterCourses: (semesterId) => {
    return HTTPClient.get(`/api/semesters/${semesterId}/courses`)
      .then((semesterCourses) => {
        console.log(`Semester Courses: ${JSON.stringify(semesterCourses)}`);
        return semesterCourses;
      })
      .catch((err) => {
        throw new Error(`Here's what went wrong: ${err}`);
      });
  },

  getCourse: (courseId) => {
    return HTTPClient.get(`/api/courses/${courseId}`)
      .then((course) => {
        console.log(`Course: ${JSON.stringify(course)}`);
        return course;
      })
      .catch((err) => {
        throw new Error(`Here's what went wrong: ${JSON.stringify(err)}`);
      });
  },

  getCourseByName: (prefix, number) => {
    return HTTPClient.get(`/api/courses/${prefix}/${number}`)
      .then((course) => {
        console.log(`Course: ${JSON.stringify(course)}`);
        return course;
      })
      .catch((err) => {
        throw new Error(`Here's what went wrong: ${JSON.stringify(err)}`);
      });
  },

  getCourseSections: (courseId) => {
    console.log(`courseId: ${courseId}`);
    return HTTPClient.get(`/api/courses/${courseId}/sections`)
      .then((courseSections) => {
        console.log(`Course Sections: ${JSON.stringify(courseSections)}`);
        return courseSections;
      })
      .catch((err) => {
        throw new Error(`Here's what went wrong: ${err}`);
      });
  },

  getCourseSectionByNumber: (courseId, sectionNumber) => {
    return HTTPClient.get(`/api/courses/${courseId}/sections/${sectionNumber}`)
      .then((courseSection) => {
        console.log(`Course Section: ${JSON.stringify(courseSection)}`);
        return courseSection;
      })
      .catch((err) => {
        throw new Error(`Here's what went wrong: ${err}`);
      });
  },

  deleteCourse: (courseId) => {
    return HTTPClient.delete(`/api/courses/${courseId}`)
      .then((deletedCourse) => {
        console.log(`Deleted Course: ${JSON.stringify(deletedCourse)}`);
        return deletedCourse;
      })
      .catch((err) => {
        throw new Error(`Here's what went wrong: ${JSON.stringify(err)}`);
      });
  },
};

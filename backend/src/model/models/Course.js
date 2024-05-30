module.exports = class {
  id = null;
  subject = null;
  courseNumber = null;
  title = null;
  credits = null;

  constructor(data) {
    if (!data.crs_id) {
      //console.error("Course id null");
      throw Error('Course id null');
    }
    if (!data.crs_sbj) {
      //console.error("Course Subject null");
      throw Error('Course Subject null');
    }
    if (!data.crs_num) {
      //console.error("Course number null");
      throw Error('Course number null');
    }
    if (!data.crs_title) {
      //console.error("Course Title null");
      throw Error('Course Title null');
    }
    if (!data.num_credits) {
      //console.error("Course Credits null");
      throw Error('Course Credits null');
    }
    this.id = data.crs_id;
    this.subject = data.crs_sbj;
    this.courseNumber = data.crs_num;
    this.title = data.crs_title;
    this.credits = data.num_credits;
  }
};

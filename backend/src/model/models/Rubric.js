module.exports = class {
    
    id = null;
    name = null;
    courseId = null;
    type = null;
    sectionId = null;

    constructor(data) {

        if (!data.rub_id) {
            //console.error("Rubric ID null");
            throw Error("Rubric ID null");
        }
        if (!data.rub_name) {
            //console.error("Rubric name null");
            throw Error("Rubric name null");
        }
        if (!data.crs_id && !data.sec_id) {
            //console.error("Course ID and Section ID null");
            throw Error("Course ID and Section ID null");
        }
        if (!data.rub_type) {
            //console.error("Rubric type null");
            throw Error("Rubric type null");
        }
        this.id = data.rub_id;
        this.name = data.rub_name;
        this.courseId = data.crs_id;
        this.type = data.rub_type;
        this.sectionId = data.sec_id;

    }

}
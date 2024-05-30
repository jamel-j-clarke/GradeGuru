module.exports = class {
    
    id = null;
    number = null;
    courseId = null;
    status = 1;

    constructor(data) {

        if (!data.sec_id) {
            //console.error("Section ID null");
            throw Error("Section ID null");
        }
        if (!data.sec_number) {
            //console.error("Section number null");
            throw Error("Section number null");
        }
        if (!data.sec_crs_id) {
            //console.error("Course ID null");
            throw Error("Course ID null");
        }

        this.id = data.sec_id;
        this.number = data.sec_number;
        this.courseId = data.sec_crs_id;

    }

}
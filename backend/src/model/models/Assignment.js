module.exports = class {
    
    name = null;
    description = null;
    sectionId = null;
    rubricId = null;

    constructor(data) {
        if (!data.assign_name) {
            //console.error("Assignment name null");
            throw Error("Assignment name null");
        }
        if (!data.assign_desc) {
            //console.error("Assignment description null");
            throw Error("Assignment description null");
        }
        if (!data.sec_id) {
            //console.error("Assignment section id null");
            throw Error("Assignment section id null");
        }
        if (!data.rub_id) {
            //console.error("Assignment rubric id null");
            throw Error("Assignment rubric id null");
        }
        this.name = data.assign_name;
        this.description = data.assign_desc;
        this.sectionId = data.sec_id;
        this.rubricId = data.rub_id;
    }

}
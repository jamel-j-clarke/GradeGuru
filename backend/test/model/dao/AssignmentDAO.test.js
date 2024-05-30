const rubric = require('../../../src/model/models/Rubric');
const db = require( '../../../src/model/db/DBConnection' );
const courseDAO = require('../../../src/model/dao/CourseDAO');
const assignmentDAO = require('../../../src/model/dao/AssignmentDAO');
const rubricDAO = require('../../../src/model/dao/RubricDAO');
const sectionDAO = require('../../../src/model/dao/SectionDAO');
const semesterDAO = require('../../../src/model/dao/SemesterDAO');

let semesterid0;
let courseid0;
let sectionid0;
let rubricid0;
let assignmentid0;
let assignmentid1;

beforeAll(async () => {
    //creates the semester    
    await assignmentDAO.deleteAllAssignmentsT()//.then(() => console.log());    
    await rubricDAO.deleteAllRubricsT()//.then(() => console.log());
    await sectionDAO.deleteAllSectionsT();
    await courseDAO.deleteAllCoursesT()//.then(() => console.log());
    await semesterDAO.deleteAllSemestersT();  

}, 12500);

afterAll(async () => {
    //deletes the assignment    
    await assignmentDAO.deleteAllAssignmentsT()//.then(() => console.log());    
    await rubricDAO.deleteAllRubricsT()//.then(() => console.log());
    await sectionDAO.deleteAllSectionsT();
    await courseDAO.deleteAllCoursesT()//.then(() => console.log());
    await semesterDAO.deleteAllSemestersT();   
}, 12500);

beforeEach(async () => {
    //deletes the assignment    
    await semesterDAO.createSemester(2024, "winter", true)
    const semester = await semesterDAO.getAllSemesters();
    semesterid0 = semester[0].id; 

    await courseDAO.createCourse("MA", 305, "titles", 3, semesterid0)
    const course = await courseDAO.getAllCourses();
    courseid0 = course[0].id; 
    
    await sectionDAO.createSection(1, courseid0)
    const section = await sectionDAO.getAllSections();
    sectionid0 = section[0].sec_id;  

    await rubricDAO.createRubric("new", courseid0, "course", sectionid0);
    const rubric = await rubricDAO.getAllRubrics();
    rubricid0 = rubric[0].rub_id;  

    await assignmentDAO.createAssignment("quiz", "d", sectionid0, rubricid0)//.then(() => console.log());
    await assignmentDAO.createAssignment("quiz2", "d2", sectionid0, rubricid0)//.then(() => console.log());
    const assignment = await assignmentDAO.getAllAssignments();
    assignmentid0 = assignment[0].assign_id;
    assignmentid1 = assignment[1].assign_id;
}, 12500);
afterEach(async () => {
    //deletes the assignment    
    await assignmentDAO.deleteAllAssignmentsT()//.then(() => console.log());    
    await rubricDAO.deleteAllRubricsT()//.then(() => console.log());
    await sectionDAO.deleteAllSectionsT();
    await courseDAO.deleteAllCoursesT()//.then(() => console.log());
    await semesterDAO.deleteAllSemestersT();  
}, 12500);
test('getAssignment', async () => {
    //creates the semester    
    await assignmentDAO.getAllAssignments().then(assignment => {
        //console.log(semester)
        expect(assignment[0].assign_name).toBe("quiz")
        expect(assignment[0].assign_desc).toBe("d")
        expect(assignment[0].sec_id).toBe(sectionid0)
        expect(assignment[0].rub_id).toBe(rubricid0)

        expect(assignment[1].assign_name).toBe("quiz2")
        expect(assignment[1].assign_desc).toBe("d2")
        expect(assignment[1].sec_id).toBe(sectionid0)
        expect(assignment[1].rub_id).toBe(rubricid0)
    })
},12500);

test('getAssignmentbyid', async () => {
    //creates the semester    
    await assignmentDAO.getAssignmentById(assignmentid0).then(assignment => {
        //console.log(assignment)
        expect(assignment.name).toBe("quiz")
        expect(assignment.description).toBe("d")
        expect(assignment.sectionId).toBe(sectionid0)
        expect(assignment.rubricId).toBe(rubricid0)
    })
},12500);

test('updateAssignment', async () => {
    //creates the semester    
    await assignmentDAO.updateAssignment(assignmentid0, "quiz3", "d3", sectionid0, rubricid0)
    await assignmentDAO.getAllAssignments().then(assignment => {
        //console.log(assignment)
        expect(assignment.length).toBe(2)
        expect(assignment[0].assign_name).toBe("quiz3")
        expect(assignment[0].assign_desc).toBe("d3")
        expect(assignment[0].sec_id).toBe(sectionid0)
        expect(assignment[0].rub_id).toBe(rubricid0)

        expect(assignment[1].assign_name).toBe("quiz2")
        expect(assignment[1].assign_desc).toBe("d2")
        expect(assignment[1].sec_id).toBe(sectionid0)
        expect(assignment[1].rub_id).toBe(rubricid0)
    })

},12500);

test('deleteAssignment', async () => {
    //creates the semester    
    await assignmentDAO.deleteAssignment(assignmentid1)
    await assignmentDAO.getAllAssignments().then(assignment => {
        //console.log(assignment)
        expect(assignment.length).toBe(1)
        expect(assignment[0].assign_name).toBe("quiz")
        expect(assignment[0].assign_desc).toBe("d")
        expect(assignment[0].sec_id).toBe(sectionid0)
        expect(assignment[0].rub_id).toBe(rubricid0)
    })

},12500);

test('getAssignmentsBySection', async () => {
    //creates the semester    
    await assignmentDAO.getAssignmentsBySection(sectionid0).then(assignment => {
        //console.log(assignment)
        expect(assignment[0].name).toBe("quiz")
        expect(assignment[0].description).toBe("d")
        expect(assignment[0].sectionId).toBe(sectionid0)
        expect(assignment[0].rubricId).toBe(rubricid0)

        expect(assignment[1].name).toBe("quiz2")
        expect(assignment[1].description).toBe("d2")
        expect(assignment[1].sectionId).toBe(sectionid0)
        expect(assignment[1].rubricId).toBe(rubricid0)
    })
},12500);

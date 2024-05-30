const rubric = require('../../../src/model/models/Rubric');
const db = require( '../../../src/model/db/DBConnection' );
const courseDAO = require('../../../src/model/dao/CourseDAO');
const rubricDAO = require('../../../src/model/dao/RubricDAO');
const sectionDAO = require('../../../src/model/dao/SectionDAO');
const semesterDAO = require('../../../src/model/dao/SemesterDAO');

let semesterid0;
let courseid0;
let sectionid0;
let rubricid0;
let rubricid1;
beforeAll(async () => {
    //creates the courses   
    await rubricDAO.deleteAllRubricsT()//.then(() => console.log());
    await sectionDAO.deleteAllSectionsT();
    await courseDAO.deleteAllCoursesT()//.then(() => console.log());
    await semesterDAO.deleteAllSemestersT();  
}, 12500);

afterAll(async () => {
    //deletes the courses   
    await rubricDAO.deleteAllRubricsT()//.then(() => console.log());
    await sectionDAO.deleteAllSectionsT();
    await courseDAO.deleteAllCoursesT()//.then(() => console.log());
    await semesterDAO.deleteAllSemestersT();  
}, 12500);

beforeEach(async () => {
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
    await rubricDAO.createRubric("new2", courseid0, "section", sectionid0);
    const rubric = await rubricDAO.getAllRubrics();
    //console.log(rubric)
    rubricid0 = rubric[0].rub_id;  
    rubricid1 = rubric[1].rub_id; 
});

afterEach(async () => {
    await rubricDAO.deleteAllRubricsT()//.then(() => console.log());
    await sectionDAO.deleteAllSectionsT();
    await courseDAO.deleteAllCoursesT()//.then(() => console.log());
    await semesterDAO.deleteAllSemestersT();  
});

test("create rubric", async () => {
    //creates the rubric    
    await rubricDAO.getAllRubrics().then(rubrics => {
        // console.log(rubrics)
        expect(rubrics[0].rub_name).toBe("new");
        expect(rubrics[0].crs_id).toBe(courseid0);
        expect(rubrics[0].rub_type).toBe("course");
        expect(rubrics[0].sec_id).toBe(sectionid0);

        expect(rubrics[1].rub_name).toBe("new2");
        expect(rubrics[1].crs_id).toBe(courseid0);
        expect(rubrics[1].rub_type).toBe("section");
        expect(rubrics[1].sec_id).toBe(sectionid0);
    })
}, 12500);

test('getRubricbyid', async () => {
    //creates the semester    
    await rubricDAO.getRubricById(rubricid0).then(rubrics => {
        //console.log(rubrics)
        expect(rubrics.name).toBe("new");
        expect(rubrics.courseId).toBe(courseid0);
        expect(rubrics.type).toBe("course");
        expect(rubrics.sectionId).toBe(sectionid0);
    })
},12500);

test('rubric type error', async () => {
    const createRubricWithError = async () => {
        await rubricDAO.createRubric("new3", courseid0, "meow", sectionid0);
    };
    await expect(createRubricWithError).rejects.toThrow("Incorrect Rubric Type");
});

test("delete rubric", async () => {
    //creates the rubric    
    await rubricDAO.deleteRubric(rubricid1).then(() => {
        rubricDAO.getAllRubrics().then(rubrics => {
            //console.log(rubrics)
            expect(rubrics.length).toBe(1)
            expect(rubrics[0].rub_name).toBe("new");
            expect(rubrics[0].crs_id).toBe(courseid0);
            expect(rubrics[0].rub_type).toBe("course");
            expect(rubrics[0].sec_id).toBe(sectionid0);
    
        })
    })
}, 12500);

test("deleteAllRubrics", async () => {
    //creates the rubric    
    await rubricDAO.deleteAllRubrics()
    await rubricDAO.getAllRubrics().then(rubrics => {
        //console.log(rubrics)
        expect(rubrics.length).toBe(0)  
    })
    
}, 12500);

test("duplicate rubric", async () => {
    //creates the rubric    
    await rubricDAO.duplicateRubric(rubricid1)
    await rubricDAO.getAllRubrics().then(rubrics => {
        //console.log(rubrics)
        expect(rubrics.length).toBe(3)
        expect(rubrics[0].rub_name).toBe("new");
        expect(rubrics[0].crs_id).toBe(courseid0);
        expect(rubrics[0].rub_type).toBe("course");
        expect(rubrics[0].sec_id).toBe(sectionid0);

        expect(rubrics[1].rub_name).toBe("new2");
        expect(rubrics[1].crs_id).toBe(courseid0);
        expect(rubrics[1].rub_type).toBe("section");
        expect(rubrics[1].sec_id).toBe(sectionid0);

        expect(rubrics[2].rub_name).toBe("new2");
        expect(rubrics[2].crs_id).toBe(courseid0);
        expect(rubrics[2].rub_type).toBe("section");
        expect(rubrics[2].sec_id).toBe(sectionid0);

    })
}, 12500);

test('getAllRubricsByCourse', async () => {
    //creates the semester    
    await rubricDAO.getAllRubricsByCourse(courseid0).then(rubrics => {
        //console.log(rubrics)
        expect(rubrics[0].name).toBe("new");
        expect(rubrics[0].courseId).toBe(courseid0);
        expect(rubrics[0].type).toBe("course");
        expect(rubrics[0].sectionId).toBe(sectionid0);

        expect(rubrics[1].name).toBe("new2");
        expect(rubrics[1].courseId).toBe(courseid0);
        expect(rubrics[1].type).toBe("section");
        expect(rubrics[1].sectionId).toBe(sectionid0);
    })
},12500);

test('getAllRubricsBySection', async () => {
    //creates the semester    
    await rubricDAO.getAllRubricsBySection(sectionid0).then(rubrics => {
        //console.log(rubrics)
        expect(rubrics[0].name).toBe("new");
        expect(rubrics[0].courseId).toBe(courseid0);
        expect(rubrics[0].type).toBe("course");
        expect(rubrics[0].sectionId).toBe(sectionid0);

        expect(rubrics[1].name).toBe("new2");
        expect(rubrics[1].courseId).toBe(courseid0);
        expect(rubrics[1].type).toBe("section");
        expect(rubrics[1].sectionId).toBe(sectionid0);
    })
},12500);

test('getRubricByName', async () => {
    //creates the semester    
    await rubricDAO.getRubricByName("new").then(rubrics => {
        //console.log(rubrics)
        expect(rubrics[0].rub_name).toBe("new");
        expect(rubrics[0].crs_id).toBe(courseid0);
        expect(rubrics[0].rub_type).toBe("course");
        expect(rubrics[0].sec_id).toBe(sectionid0);
    })
},12500);
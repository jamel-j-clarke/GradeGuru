const rubric = require('../../../src/model/models/Rubric');
const db = require( '../../../src/model/db/DBConnection' );
const courseDAO = require('../../../src/model/dao/CourseDAO');
const rubricDAO = require('../../../src/model/dao/RubricDAO');
const sectionDAO = require('../../../src/model/dao/SectionDAO');
const semesterDAO = require('../../../src/model/dao/SemesterDAO');

let semesterid0;
let courseid0;
let sectionid0;
let sectionid1;
beforeAll(async () => {
    //creates the courses    
    await sectionDAO.deleteAllSectionsT();
    await courseDAO.deleteAllCoursesT()//.then(() => console.log());
    await semesterDAO.deleteAllSemestersT();  

}, 12500);

afterAll(async () => {
    //deletes the courses    
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
    await sectionDAO.createSection(2, courseid0)

    const section = await sectionDAO.getAllSections();
    sectionid0 = section[0].sec_id; 
    sectionid1 = section[1].sec_id; 
});

afterEach(async () => {
    await sectionDAO.deleteAllSectionsT();
    await courseDAO.deleteAllCoursesT()//.then(() => console.log());
    await semesterDAO.deleteAllSemestersT();   
});

test('getSections', async () => {
    //creates the courses        
    await sectionDAO.getAllSections().then(section => {
        expect(section[0].sec_number).toBe(1)
        expect(section[0].sec_crs_id).toBe(courseid0)

        expect(section[1].sec_number).toBe(2)
        expect(section[1].sec_crs_id).toBe(courseid0)
    })
},12500);

test('getSectionsbyid', async () => {
    //creates the semester    
    await sectionDAO.getSectionById(sectionid0).then(section => {
        //console.log(section)
        expect(section.id).toBe(sectionid0)
        expect(section.number).toBe(1)
        expect(section.courseId).toBe(courseid0)
    })
},12500);

test('getCourseSectionByNumber', async () => {
    //creates the semester    
    await courseDAO.getCourseSectionByNumber(courseid0, 1).then(section => {
        //console.log(section)
        expect(section.id).toBe(sectionid0)
        expect(section.number).toBe(1)
        expect(section.courseId).toBe(courseid0)
    })
},12500);

test('getSectionsbyCourse', async () => {
    //creates the semester    
    await sectionDAO.getSectionsByCourse(courseid0).then(section => {
        //console.log(section)
        expect(section[0].number).toBe(1)
        expect(section[0].courseId).toBe(courseid0)

        expect(section[1].number).toBe(2)
        expect(section[1].courseId).toBe(courseid0)
    })
},12500);

test('deleteSection', async () => {
    //creates the semester    
    await sectionDAO.deleteSection(sectionid1)
    await sectionDAO.getAllSections().then(section => {
        //console.log(section)
        expect(section.length).toBe(1)
        expect(section[0].sec_number).toBe(1)
        expect(section[0].sec_crs_id).toBe(courseid0)
    })
    

},12500); 

test('coursedao deleteCourse delete section', async () => {
    //creates the semester    
    await courseDAO.deleteCourse(courseid0)
    await sectionDAO.getAllSections().then(section => {
        //console.log(section)
        expect(section.length).toBe(0)
    })
    
},12500); 

test('deleteAllSections', async () => {
    //creates the semester    
    await sectionDAO.deleteAllSections()
    await sectionDAO.getAllSections().then(section => {
        //console.log(section)
        expect(section.length).toBe(0)
    })
    
},12500); 
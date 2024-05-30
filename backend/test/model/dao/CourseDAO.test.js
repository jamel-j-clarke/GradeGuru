const rubric = require('../../../src/model/models/Rubric');
const db = require( '../../../src/model/db/DBConnection' );
const courseDAO = require('../../../src/model/dao/CourseDAO');
const semesterDAO = require('../../../src/model/dao/SemesterDAO');

let semesterid0;
let courseid0;
let courseid1;
beforeAll(async () => {
    //creates the courses    
    await courseDAO.deleteAllCoursesT()//.then(() => console.log());
    await semesterDAO.deleteAllSemestersT();    
}, 12500);

afterAll(async () => {
    //deletes the courses    
    await courseDAO.deleteAllCoursesT();
    await semesterDAO.deleteAllSemestersT();
}, 12500);
beforeEach(async () => {
    //creates the courses    
    await semesterDAO.createSemester(2024, "winter", true)
    const semester = await semesterDAO.getAllSemesters();
    semesterid0 = semester[0].id; 
    await courseDAO.createCourse("MA", 305, "titles", 3, semesterid0)
    await courseDAO.createCourse("CSC", 216, "titles2", 5, semesterid0)
    const course = await courseDAO.getAllCourses();
    //console.log(course)
    courseid0 = course[0].id; 
    courseid1 = course[1].id;
    
}, 12500);

afterEach(async () => {
    //deletes the courses    
    await courseDAO.deleteAllCoursesT();
    await semesterDAO.deleteAllSemestersT();
}, 12500);
test('getCourse', async () => {
    //creates the courses    
    
    await courseDAO.getAllCourses().then(course => {
        //console.log(course)
        expect(course[0].subject).toBe("MA")
        expect(course[0].courseNumber).toBe(305)
        expect(course[0].title).toBe("titles")
        expect(course[0].credits).toBe(3)

        expect(course[1].subject).toBe("CSC")
        expect(course[1].courseNumber).toBe(216)
        expect(course[1].title).toBe("titles2")
        expect(course[1].credits).toBe(5)
    })
},12500);

test('getCoursebyid', async () => {
    //creates the semester    
    await courseDAO.getCourseById(courseid0).then(course => {
        //console.log(course)
        expect(course.subject).toBe("MA")
        expect(course.courseNumber).toBe(305)
        expect(course.title).toBe("titles")
        expect(course.credits).toBe(3)
    })
},12500);

test('getCourseByName', async () => {
    //creates the semester    
    await courseDAO.getCourseByName("MA", 305).then(course => {
        //console.log(course)
        expect(course.subject).toBe("MA")
        expect(course.courseNumber).toBe(305)
        expect(course.title).toBe("titles")
        expect(course.credits).toBe(3)
    })
},12500);

test('getCourse', async () => {
    //creates the semester    
    await courseDAO.getCourse("MA", 305).then(course => {
        //console.log(course)
        expect(course.crs_sbj).toBe("MA")
        expect(course.crs_num).toBe(305)
        expect(course.crs_title).toBe("titles")
        expect(course.num_credits).toBe(3)
    })
},12500);

test('deleteCourse', async () => {
    //creates the semester    
    await courseDAO.deleteCourse(courseid1)
    await courseDAO.getAllCourses().then(course => {
        //console.log(semester)
        expect(course.length).toBe(1)
        expect(course[0].subject).toBe("MA")
        expect(course[0].courseNumber).toBe(305)
        expect(course[0].title).toBe("titles")
        expect(course[0].credits).toBe(3)
    })

},12500);   

test('deleteAllCourses', async () => {
    //creates the semester    
    await courseDAO.deleteAllCourses()
    await courseDAO.getAllCourses().then(course => {
        //console.log(semester)
        expect(course.length).toBe(0)
    })

},12500);  

test('getSemesterCourses from semesterDAO', async () => {
    //creates the semester    
    await semesterDAO.getSemesterCourses(semesterid0).then(semester => {
        //console.log(semester)
        expect(semester.length).toBe(2)
        expect(semester[0].crs_sbj).toBe("MA")
        expect(semester[0].crs_num).toBe(305)
        expect(semester[0].crs_title).toBe("titles")
        expect(semester[0].num_credits).toBe(3)

        expect(semester[1].crs_sbj).toBe("CSC")
        expect(semester[1].crs_num).toBe(216)
        expect(semester[1].crs_title).toBe("titles2")
        expect(semester[1].num_credits).toBe(5)
    })

},12500);
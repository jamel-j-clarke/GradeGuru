const rubric = require('../../../src/model/models/Rubric');
const db = require( '../../../src/model/db/DBConnection' );
const courseDAO = require('../../../src/model/dao/CourseDAO');
const semesterDAO = require('../../../src/model/dao/SemesterDAO');
let semesterid0;
let semesterid1;
beforeAll(async () => {
    //creates the semester    
    await semesterDAO.deleteAllSemestersT()//.then(() => console.log());    
}, 12500);

afterAll(async () => {
    //deletes the semester    
    await semesterDAO.deleteAllSemestersT();
}, 12500);
beforeEach(async () => {
    //deletes the semester    
    await semesterDAO.createSemester(2024, "winter", true)//.then(() => console.log());
    await semesterDAO.createSemester(2025, "summer", false)//.then(() => console.log());
    const semester = await semesterDAO.getAllSemesters();
    semesterid0 = semester[0].id;
    semesterid1 = semester[1].id;
    //console.log(semester)
}, 12500);
afterEach(async () => {
    //deletes the semester    
    await semesterDAO.deleteAllSemestersT();
}, 12500);
test('getSemester', async () => {
    //creates the semester    
    await semesterDAO.getAllSemesters().then(semester => {
        //console.log(semester)
        expect(semester.length).toBe(2)
        expect(semester[0].year).toBe(2024)
        expect(semester[0].season).toBe("winter")
        expect(semester[0].active).toBe(1)

        expect(semester[1].year).toBe(2025)
        expect(semester[1].season).toBe("summer")
        expect(semester[1].active).toBe(0)
    })
},12500);

test('getSemesterbyid', async () => {
    //creates the semester    
    await semesterDAO.getSemesterById(semesterid0).then(semester => {
        expect(semester.year).toBe(2024)
        expect(semester.season).toBe("winter")
        expect(semester.active).toBe(1)
    })
},12500);

test('getActiveSemester', async () => {
    //creates the semester    
    await semesterDAO.getActiveSemester().then(semester => {
        expect(semester.year).toBe(2024)
        expect(semester.season).toBe("winter")
        expect(semester.active).toBe(1)
    })
},12500);

test('getSemesterByName', async () => {
    //creates the semester    
    await semesterDAO.getSemesterByName(2024, "winter").then(semester => {
        expect(semester.year).toBe(2024)
        expect(semester.season).toBe("winter")
        expect(semester.active).toBe(1)
    })
},12500);

test('updateSemester', async () => {
    //creates the semester    

    await semesterDAO.updateSemester(semesterid0, 2026, "spring", true)

    await semesterDAO.getAllSemesters().then(semester => {
        //console.log(semester)
        expect(semester.length).toBe(2)
        expect(semester[0].year).toBe(2026)
        expect(semester[0].season).toBe("spring")
        expect(semester[0].active).toBe(1)

        expect(semester[1].year).toBe(2025)
        expect(semester[1].season).toBe("summer")
        expect(semester[1].active).toBe(0)
    })
    

},12500);

test('deleteSemester', async () => {
    //creates the semester    
    await semesterDAO.deleteSemester(semesterid1)
    await semesterDAO.getAllSemesters().then(semester => {
        expect(semester.length).toBe(1)
        expect(semester[0].year).toBe(2024)
        expect(semester[0].season).toBe("winter")
        expect(semester[0].active).toBe(1)
    })


},12500);
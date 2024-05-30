const rubric = require('../../../src/model/models/Rubric');
const db = require( '../../../src/model/db/DBConnection' );
const courseDAO = require('../../../src/model/dao/CourseDAO');
const RubricItemDAO = require('../../../src/model/dao/RubricItemDAO');
const rubricDAO = require('../../../src/model/dao/RubricDAO');
const sectionDAO = require('../../../src/model/dao/SectionDAO');
const semesterDAO = require('../../../src/model/dao/SemesterDAO');

let semesterid0;
let courseid0;
let sectionid0;
let rubricid0;
let itemid0;
let itemid1;

beforeAll(async () => {
    //creates the semester    
    await RubricItemDAO.deleteAllItemsT()//.then(() => console.log());    
    await rubricDAO.deleteAllRubricsT()//.then(() => console.log());
    await sectionDAO.deleteAllSectionsT();
    await courseDAO.deleteAllCoursesT()//.then(() => console.log());
    await semesterDAO.deleteAllSemestersT();  

}, 12500);

afterAll(async () => {
    //deletes the assignment    
    await RubricItemDAO.deleteAllItemsT()//.then(() => console.log());    
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

    await RubricItemDAO.createRubricItem("name", "d", 25, 9, rubricid0, null)
    await RubricItemDAO.createRubricItem("name2", "d2", 26, 10, rubricid0, null)
    const items = await RubricItemDAO.getAllItems();
    //console.log(items)
    itemid0 = items[0].item_id;
    itemid1 = items[1].item_id;
}, 12500);

afterEach(async () => {
    //deletes the assignment    
    await RubricItemDAO.deleteAllItemsT()//.then(() => console.log());    
    await rubricDAO.deleteAllRubricsT()//.then(() => console.log());
    await sectionDAO.deleteAllSectionsT();
    await courseDAO.deleteAllCoursesT()//.then(() => console.log());
    await semesterDAO.deleteAllSemestersT();  
}, 12500);
test('getItem', async () => {
    //creates the semester    
    await RubricItemDAO.getAllItems().then(items => {
        //console.log(semester)
        expect(items[0].item_name).toBe("name")
        expect(items[0].item_desc).toBe("d")
        expect(items[0].item_wgt).toBe(25)
        expect(items[0].available_pts).toBe(9)
        expect(items[0].rub_id).toBe(rubricid0)
        expect(items[0].parent_id).toBe(null)

        expect(items[1].item_name).toBe("name2")
        expect(items[1].item_desc).toBe("d2")
        expect(items[1].item_wgt).toBe(26)
        expect(items[1].available_pts).toBe(10)
        expect(items[1].rub_id).toBe(rubricid0)
        expect(items[1].parent_id).toBe(null)
    })
},12500);

test('getItemById', async () => {
    //creates the semester    
    await RubricItemDAO.getRubricItemById(itemid0).then(items => {
        //console.log(semester)
        expect(items[0].item_name).toBe("name")
        expect(items[0].item_desc).toBe("d")
        expect(items[0].item_wgt).toBe(25)
        expect(items[0].available_pts).toBe(9)
        expect(items[0].rub_id).toBe(rubricid0)
        expect(items[0].parent_id).toBe(null)
    })
},12500);

test('updateItemWeight', async () => {
    //creates the semester    
    await RubricItemDAO.updateItemWeight(itemid0, 50)
    await RubricItemDAO.getAllItems().then(items => {
        //console.log(semester)
        expect(items[0].item_name).toBe("name")
        expect(items[0].item_desc).toBe("d")
        expect(items[0].item_wgt).toBe(50)
        expect(items[0].available_pts).toBe(9)
        expect(items[0].rub_id).toBe(rubricid0)
        expect(items[0].parent_id).toBe(null)

        expect(items[1].item_name).toBe("name2")
        expect(items[1].item_desc).toBe("d2")
        expect(items[1].item_wgt).toBe(26)
        expect(items[1].available_pts).toBe(10)
        expect(items[1].rub_id).toBe(rubricid0)
        expect(items[1].parent_id).toBe(null)
    })
},12500);

// test('updateItemParent', async () => {
//     //creates the semester    
//     await RubricItemDAO.updateItemParent(itemid1, itemid0)
//     await RubricItemDAO.getAllItems().then(items => {
//         //console.log(semester)
//         expect(items[0].item_name).toBe("name")
//         expect(items[0].item_desc).toBe("d")
//         expect(items[0].item_wgt).toBe(50)
//         expect(items[0].available_pts).toBe(9)
//         expect(items[0].rub_id).toBe(rubricid0)
//         expect(items[0].parent_id).toBe(null)

//         expect(items[1].item_name).toBe("name2")
//         expect(items[1].item_desc).toBe("d2")
//         expect(items[1].item_wgt).toBe(26)
//         expect(items[1].available_pts).toBe(10)
//         expect(items[1].rub_id).toBe(rubricid0)
//         expect(items[1].parent_id).toBe(itemid0)
//     })
// },12500);

test('editRubricItem', async () => {
    //creates the semester    
    //console.log(itemid0)
    await RubricItemDAO.editRubricItem(itemid0, "name3", "d3", 65, 14, rubricid0, -1)
    await RubricItemDAO.getAllItems().then(items => {
        //console.log(semester)
        expect(items.length).toBe(2)
        expect(items[0].item_name).toBe("name3")
        expect(items[0].item_desc).toBe("d3")
        expect(items[0].item_wgt).toBe(65)
        expect(items[0].available_pts).toBe(14)
        expect(items[0].rub_id).toBe(rubricid0)
        expect(items[0].parent_id).toBe(null)

        expect(items[1].item_name).toBe("name2")
        expect(items[1].item_desc).toBe("d2")
        expect(items[1].item_wgt).toBe(26)
        expect(items[1].available_pts).toBe(10)
        expect(items[1].rub_id).toBe(rubricid0)
        expect(items[1].parent_id).toBe(null )
    })

},12500);

test('deleteRubricItem', async () => {
    //creates the semester    
    await RubricItemDAO.deleteRubricItem(itemid1)
    await RubricItemDAO.getAllItems().then(items => {
        //console.log(items)
        expect(items.length).toBe(1)
        expect(items[0].item_name).toBe("name")
        expect(items[0].item_desc).toBe("d")
        expect(items[0].item_wgt).toBe(25)
        expect(items[0].available_pts).toBe(9)
        expect(items[0].rub_id).toBe(rubricid0)
        expect(items[0].parent_id).toBe(null)
    })

},12500);

test('getRubricItemsByRubric', async () => {
    //creates the semester    
    await RubricItemDAO.getRubricItemsByRubric(rubricid0).then(items => {
        //console.log(semester)
        expect(items.length).toBe(2)
        expect(items[0].item_name).toBe("name")
        expect(items[0].item_desc).toBe("d")
        expect(items[0].item_wgt).toBe(25)
        expect(items[0].available_pts).toBe(9)
        expect(items[0].rub_id).toBe(rubricid0)
        expect(items[0].parent_id).toBe(null)

        expect(items[1].item_name).toBe("name2")
        expect(items[1].item_desc).toBe("d2")
        expect(items[1].item_wgt).toBe(26)
        expect(items[1].available_pts).toBe(10)
        expect(items[1].rub_id).toBe(rubricid0)
        expect(items[1].parent_id).toBe(null)
    })
},12500);
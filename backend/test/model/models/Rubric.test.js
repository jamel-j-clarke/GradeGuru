const rubric = require('../../../src/model/models/Rubric');

test('rubric constructor', () => {
    // tests the rubric item with test data, should have no parent
    var itemdata = {};
    itemdata.rub_id = 1124
    itemdata.rub_name = "Rubric Name"
    itemdata.crs_id = 1324
    itemdata.rub_type = "course"
    itemdata.sec_id = 4252
    
    const item = new rubric(itemdata)
    expect(item.id).toBe(1124);
    expect(item.name).toBe("Rubric Name");
    expect(item.courseId).toBe(1324);
    expect(item.type).toBe("course");
    expect(item.sectionId).toBe(4252);
});

test('rubric constructor null rub_id', () => {
    // tests the rubric item with test data, should have no parent
    var itemdata = {};
    const f = () => {
        const item = new rubric(itemdata);
    }
    try{
        expect(f).toThrow(Error);
    }
    catch(Error){
        expect(e.message).toBe("Rubric ID null");
    }
});

test('rubric constructor null rub_name', () => {
    // tests the rubric item with test data, should have no parent
    var itemdata = {};
    itemdata.rub_id = 1124
    const f = () => {
        const item = new rubric(itemdata);
    }
    try{
        expect(f).toThrow(Error);
    }
    catch(Error){
        expect(e.message).toBe("Rubric name null");
    }
});

test('rubric constructor null crs_id', () => {
    // tests the rubric item with test data, should have no parent
    var itemdata = {};
    itemdata.rub_id = 1124
    itemdata.rub_name = "Rubric Name"
    const f = () => {
        const item = new rubric(itemdata);
    }
    try{
        expect(f).toThrow(Error);
        expect(f).toThrow("Course ID and Section ID null");
    }
    catch(Error){
        expect(e.message).toBe("Rubric type null");
    }
});

test('rubric constructor null rub_type', () => {
    // tests the rubric item with test data, should have no parent
    var itemdata = {};
    itemdata.rub_id = 1124
    itemdata.rub_name = "Rubric Name"
    itemdata.crs_id = 1324
    const f = () => {
        const item = new rubric(itemdata);
    }
    try{
        expect(f).toThrow(Error);
    }
    catch(Error){
        expect(e.message).toBe("Rubric type null");
    }
});

test('rubric constructor null sec_id', () => {
    // tests the rubric item with test data, should have no parent
    var itemdata = {};
    itemdata.rub_id = 1124
    itemdata.rub_name = "Rubric Name"
    //itemdata.crs_id = 1324
    itemdata.rub_type = "course"
    const f = () => {
        const item = new rubric(itemdata);
    }
    try{
        expect(f).toThrow(Error);
        
    }
    catch(e){
        expect(e.message).toBe("Course ID and Section ID null");
    }
});
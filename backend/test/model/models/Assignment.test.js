const assignment = require('../../../src/model/models/Assignment');

test('assignment constructor', () => {
    // tests the course 
    var itemdata = {};
    itemdata.assign_name = 3
    itemdata.assign_desc = 15
    itemdata.sec_id = 2
    itemdata.rub_id = 4
    
    const item = new assignment(itemdata)
    expect(item.name).toBe(3);
    expect(item.description).toBe(15);
    expect(item.sectionId).toBe(2);
    expect(item.rubricId).toBe(4);
});

test('assignment constructor null name', () => {
    // tests the course with null stuff
    var itemdata = {};
    //itemdata.assign_name = 3
    //itemdata.assign_desc = 15
    //itemdata.sec_id = 2
    //itemdata.rub_id = 4
    const f = () => {
        const item = new assignment(itemdata)
    }
    expect(f).toThrow(Error);
    expect(f).toThrow("Assignment name null");
});

test('assignment constructor null description', () => {
    // tests the course with null stuff
    var itemdata = {};
    itemdata.assign_name = 3
    //itemdata.assign_desc = 15
    //itemdata.sec_id = 2
    //itemdata.rub_id = 4
    const f = () => {
        const item = new assignment(itemdata)
    }
    expect(f).toThrow(Error);
    expect(f).toThrow("Assignment description null");
});

test('assignment constructor null section_id', () => {
    // tests the course with null stuff
    var itemdata = {};
    itemdata.assign_name = 3
    itemdata.assign_desc = 15
    //itemdata.sec_id = 2
    //itemdata.rub_id = 4
    const f = () => {
        const item = new assignment(itemdata)
    }
    expect(f).toThrow(Error);
    expect(f).toThrow("Assignment section id null");
});

test('assignment constructor null rubric_id', () => {
    // tests the course with null stuff
    var itemdata = {};
    itemdata.assign_name = 3
    itemdata.assign_desc = 15
    itemdata.sec_id = 2
    //itemdata.rub_id = 4
    const f = () => {
        const item = new assignment(itemdata)
    }
    expect(f).toThrow(Error);
    expect(f).toThrow("Assignment rubric id null");
});
const section = require('../../../src/model/models/Section');

test('course constructor', () => {
    // tests the course 
    var itemdata = {};
    itemdata.sec_id = 3
    itemdata.sec_number = 1
    itemdata.sec_crs_id = 2
    
    const item = new section(itemdata)
    expect(item.id).toBe(3);
    expect(item.number).toBe(1);
    expect(item.courseId).toBe(2);
});

test('course constructor null sec_id', () => {
    // tests the course with null stuff
    var itemdata = {};
    // itemdata.sec_id = 3
    // itemdata.sec_number = 1
    // itemdata.sec_crs_id = 2
    const f = () => {
        const item = new section(itemdata)
    }
    expect(f).toThrow(Error);
    expect(f).toThrow("Section ID null");
});

test('course constructor null sec_number', () => {
    // tests the course with null stuff
    var itemdata = {};
    itemdata.sec_id = 3
    // itemdata.sec_number = 1
    // itemdata.sec_crs_id = 2
    const f = () => {
        const item = new section(itemdata)
    }
    expect(f).toThrow(Error);
    expect(f).toThrow("Section number null");
});

test('course constructor null sec_crs_id', () => {
    // tests the course with null stuff
    var itemdata = {};
    itemdata.sec_id = 3
    itemdata.sec_number = 1
    // itemdata.sec_crs_id = 2
    const f = () => {
        const item = new section(itemdata)
    }
    expect(f).toThrow(Error);
    expect(f).toThrow("Course ID null");
});
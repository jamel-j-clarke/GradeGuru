const course = require('../../../src/model/models/Course');

test('course constructor', () => {
    // tests the course 
    var itemdata = {};
    itemdata.crs_id = 50
    itemdata.crs_sbj = "math"
    itemdata.crs_num = 45
    itemdata.crs_title = "csc50"
    itemdata.num_credits = 2
    
    const item = new course(itemdata)
    expect(item.id).toBe(50);
    expect(item.subject).toBe("math");
    expect(item.courseNumber).toBe(45);
    expect(item.title).toBe("csc50");
    expect(item.credits).toBe(2);
});
test('course constructor null crs_id', () => {
    // tests the course with null stuff
    var itemdata = {};
    //itemdata.crs_id = 50
    // itemdata.crs_sbj = "math"
    // itemdata.crs_num = 45
    // itemdata.crs_title = "csc50"
    // itemdata.num_credits = 2
    const f = () => {
        const item = new course(itemdata)
    }
    expect(f).toThrow(Error);
    expect(f).toThrow("Course id null");
});

test('course constructor null crs_sub', () => {
    // tests the course with null stuff
    var itemdata = {};
    itemdata.crs_id = 50
    // itemdata.crs_sbj = "math"
    // itemdata.crs_num = 45
    // itemdata.crs_title = "csc50"
    // itemdata.num_credits = 2
    const f = () => {
        const item = new course(itemdata)
    }
    expect(f).toThrow(Error);
    expect(f).toThrow("Course Subject null");
});

test('course constructor null crs_num', () => {
    // tests the course with null stuff
    var itemdata = {};
    itemdata.crs_id = 50
    itemdata.crs_sbj = "math"
    // itemdata.crs_num = 45
    // itemdata.crs_title = "csc50"
    // itemdata.num_credits = 2
    const f = () => {
        const item = new course(itemdata)
    }
    expect(f).toThrow(Error);
    expect(f).toThrow("Course number null");
});

test('course constructor null crs_title', () => {
    // tests the course with null stuff
    var itemdata = {};
    itemdata.crs_id = 50
    itemdata.crs_sbj = "math"
    itemdata.crs_num = 45
    // itemdata.crs_title = "csc50"
    // itemdata.num_credits = 2
    const f = () => {
        const item = new course(itemdata)
    }
    expect(f).toThrow(Error);
    expect(f).toThrow("Course Title null");
});

test('course constructor null num_credits', () => {
    // tests the course with null stuff
    var itemdata = {};
    itemdata.crs_id = 50
    itemdata.crs_sbj = "math"
    itemdata.crs_num = 45
    itemdata.crs_title = "csc50"
    // itemdata.num_credits = 2
    const f = () => {
        const item = new course(itemdata)
    }
    expect(f).toThrow(Error);
    expect(f).toThrow("Course Credits null");
});
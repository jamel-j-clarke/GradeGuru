const semester = require('../../../src/model/models/Semester');

test('semester constructor', () => {
    // tests the course 
    var itemdata = {};
    itemdata.sem_id = 3
    itemdata.sem_year = 15
    itemdata.sem_season = 2
    itemdata.sem_active = 4
    
    const item = new semester(itemdata)
    expect(item.id).toBe(3);
    expect(item.year).toBe(15);
    expect(item.season).toBe(2);
    expect(item.active).toBe(4);
});

test('semester constructor null sem_id', () => {
    // tests the course with null stuff
    var itemdata = {};
    // itemdata.sem_id = 3
    // itemdata.sem_year = 15
    // itemdata.sem_season = 2
    // itemdata.sem_active = 4
    const f = () => {
        const item = new semester(itemdata)
    }
    expect(f).toThrow(Error);
    expect(f).toThrow("Semester ID null");
});

test('semester constructor null sem_year', () => {
    // tests the course with null stuff
    var itemdata = {};
    itemdata.sem_id = 3
    // itemdata.sem_year = 15
    // itemdata.sem_season = 2
    // itemdata.sem_active = 4
    const f = () => {
        const item = new semester(itemdata)
    }
    expect(f).toThrow(Error);
    expect(f).toThrow("Semester year null");
});

test('semester constructor null sem_season', () => {
    // tests the course with null stuff
    var itemdata = {};
    itemdata.sem_id = 3
    itemdata.sem_year = 15
    // itemdata.sem_season = 2
    // itemdata.sem_active = 4
    const f = () => {
        const item = new semester(itemdata)
    }
    expect(f).toThrow(Error);
    expect(f).toThrow("Semester season null");
});

test('semester constructor null sem_active', () => {
    // tests the course with null stuff
    var itemdata = {};
    itemdata.sem_id = 3
    itemdata.sem_year = 15
    itemdata.sem_season = 2
    // itemdata.sem_active = 4
    const f = () => {
        const item = new semester(itemdata)
    }
    expect(f).toThrow(Error);
    expect(f).toThrow("Semester active null");
});
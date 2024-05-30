const rubricItem = require('../../../src/model/models/RubricItem');

test('rubric item constructor', () => {
    // tests the rubric item with test data, should have no parent
    var itemdata = {};
    itemdata.item_id = 1124
    itemdata.rub_id = 1224
    itemdata.item_name = "testing item name"
    itemdata.item_wgt = 50
    itemdata.available_pts = 75
    itemdata.item_desc = "testing item description"
    
    const item = new rubricItem(itemdata)
    expect(item.id).toBe(1124);
    expect(item.rubricId).toBe(1224);
    expect(item.itemName).toBe("testing item name");
    expect(item.weight).toBe(50);
    expect(item.points).toBe(75);
    expect(item.description).toBe("testing item description");
    expect(item.parentId).toBe(null);
});

test('rubric item constructor with parent', () => {
    //tests the item rubric with a parent constructed, should return correct parent id.
    var itemdata = {};
    itemdata.item_id = 1124
    itemdata.rub_id = 1224
    itemdata.item_name = "testing item name"
    itemdata.item_wgt = 50
    itemdata.available_pts = 75
    itemdata.item_desc = "testing item description"
    
    const itemParent = new rubricItem(itemdata)

    var itemdata2 = {};
    itemdata2.item_id = 11241
    itemdata2.rub_id = 12241
    itemdata2.item_name = "testing item name 2"
    itemdata2.item_wgt = 51
    itemdata2.available_pts = 751
    itemdata2.item_desc = "testing item description1"
    itemdata2.parent_id = 1124

    const item = new rubricItem(itemdata2)

    expect(item.id).toBe(11241);
    expect(item.rubricId).toBe(12241);
    expect(item.itemName).toBe("testing item name 2");
    expect(item.weight).toBe(51);
    expect(item.points).toBe(751);
    expect(item.description).toBe("testing item description1");
    expect(item.parentId).toBe(1124);
});

test('rubric item null item_id', () => {
    // tests the rubric item with test data, should have no parent
    var itemdata = {};
    // itemdata.item_id = 1124
    // itemdata.rub_id = 1224
    // itemdata.item_name = "testing item name"
    // itemdata.item_wgt = 50
    // itemdata.available_pts = 75
    // itemdata.item_desc = "testing item description"
    const f = () => {
        const item = new rubricItem(itemdata)
    }
    expect(f).toThrow(Error);
    expect(f).toThrow("Item ID null");
});

test('rubric item null rub_id', () => {
    // tests the rubric item with test data, should have no parent
    var itemdata = {};
    itemdata.item_id = 1124
    // itemdata.rub_id = 1224
    // itemdata.item_name = "testing item name"
    // itemdata.item_wgt = 50
    // itemdata.available_pts = 75
    // itemdata.item_desc = "testing item description"
    const f = () => {
        const item = new rubricItem(itemdata)
    }
    expect(f).toThrow(Error);
    expect(f).toThrow("Rubric ID null");
});

test('rubric item null item_name', () => {
    // tests the rubric item with test data, should have no parent
    var itemdata = {};
    itemdata.item_id = 1124
    itemdata.rub_id = 1224
    // itemdata.item_name = "testing item name"
    // itemdata.item_wgt = 50
    // itemdata.available_pts = 75
    // itemdata.item_desc = "testing item description"
    const f = () => {
        const item = new rubricItem(itemdata)
    }
    expect(f).toThrow(Error);
    expect(f).toThrow("Item name null");
});

test('rubric item null item_wgt', () => {
    // tests the rubric item with test data, should have no parent
    var itemdata = {};
    itemdata.item_id = 1124
    itemdata.rub_id = 1224
    itemdata.item_name = "testing item name"
    // itemdata.item_wgt = 50
    // itemdata.available_pts = 75
    // itemdata.item_desc = "testing item description"
    const f = () => {
        const item = new rubricItem(itemdata)
    }
    expect(f).toThrow(Error);
    expect(f).toThrow("Item weight null");
});

test('rubric item null available_pts', () => {
    // tests the rubric item with test data, should have no parent
    var itemdata = {};
    itemdata.item_id = 1124
    itemdata.rub_id = 1224
    itemdata.item_name = "testing item name"
    itemdata.item_wgt = 50
    // itemdata.available_pts = 75
    // itemdata.item_desc = "testing item description"
    const f = () => {
        const item = new rubricItem(itemdata)
    }
    expect(f).toThrow(Error);
    expect(f).toThrow("Available points null");
});

test('rubric item null item_desc', () => {
    // tests the rubric item with test data, should have no parent
    var itemdata = {};
    itemdata.item_id = 1124
    itemdata.rub_id = 1224
    itemdata.item_name = "testing item name"
    itemdata.item_wgt = 50
    itemdata.available_pts = 75
    // itemdata.item_desc = "testing item description"
    const f = () => {
        const item = new rubricItem(itemdata)
    }
    expect(f).toThrow(Error);
    expect(f).toThrow("Item description null");
});
module.exports = class {

    id = null;
    rubId = null;
    itemName = null;
    weight = null;
    points = null;
    description = null;
    parentId = null;

    constructor(data) {

        if (!data.item_id) {
            //console.error("Item ID null");
            throw Error("Item ID null");
        }
        if (!data.rub_id) {
            //console.error("Rubric ID null");
            throw Error("Rubric ID null");
        }
        if (!data.item_name) {
            //console.error("Item name null");
            throw Error("Item name null");
        }
        if (!data.item_wgt) {
            //console.error("Item weight null");
            throw Error("Item weight null");
        }
        if (!data.available_pts) {
            //console.error("Available points null");
            throw Error("Available points null");
        }
        if (!data.item_desc) {
            //console.error("Item description null");
            throw Error("Item description null");
        }
        if (!data.parent_id) {
            this.parentId = null;
        }
        else{
            this.parentId = data.parent_id;
        }
        this.id = data.item_id;
        this.rubricId = data.rub_id;
        this.itemName = data.item_name;
        this.weight = data.item_wgt;
        this.points = data.available_pts;
        this.description = data.item_desc;
        
    }

}
class BaseModel {
    constructor (context) {
        this.context = context;
        this.db = context.db;
    }
}

module.exports = BaseModel;
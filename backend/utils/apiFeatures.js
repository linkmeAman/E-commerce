class apiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword ? {
            $or: [
                { name: { $regex: this.queryStr.keyword, $options: "i" } },
                { description: { $regex: this.queryStr.keyword, $options: "i" } }
            ]
        } : {};

        console.log(keyword);

        // Call the find function on the query object passed to the constructor
        this.query = this.query.find({...keyword});
        return this;
    }

    filter(){
        const queryCopy = {...this.queryStr};
        // console.log(queryCopy);
        //removing some fields for category
        const removeFields = ["keyword","page","limit"];

        removeFields.forEach(key=> delete queryCopy[key]);
        // console.log(removeFields);

        this.query =this.query.find(queryCopy);
        return this;
    }
}

module.exports = apiFeatures;

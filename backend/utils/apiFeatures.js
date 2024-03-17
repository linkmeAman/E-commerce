class apiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          $or: [
            { name: { $regex: this.queryStr.keyword, $options: "i" } },
            { description: { $regex: this.queryStr.keyword, $options: "i" } },
          ],
        }
      : {};

    console.log(keyword);

    // Call the find function on the query object passed to the constructor
    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };
    // console.log(queryCopy);
    //removing some fields for category
    const removeFields = ["keyword", "page", "limit"];

    removeFields.forEach((key) => delete queryCopy[key]);
    // console.log(removeFields);

    // Adding range filter for price and ratings
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));
    console.log(queryStr);
    return this;
  }

  pagination(productsPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;

    const skip = productsPerPage * (currentPage - 1);

    this.query = this.query.limit(productsPerPage).skip(skip);

    return this;
  }
}

module.exports = apiFeatures;

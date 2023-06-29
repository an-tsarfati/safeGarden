class APIFeatures {
  constructor(query, queryString) {
    this.query = query; // The MongoDB query object
    this.queryString = queryString; // The query string parameters
  }

  filter() {
    const queryObj = { ...this.queryString }; // Create a shallow copy of the query string object
    const excludedFields = ['page', 'sort', 'limit', 'fields']; // Fields to exclude from the query

    // Remove excluded fields from the query object
    excludedFields.forEach((el) => delete queryObj[el]);

    // Convert the query object to a string and replace the MongoDB comparison operators
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // Update the query object with the filtered and parsed query string
    this.query = this.query.find(JSON.parse(queryStr));

    return this; // Return the updated APIFeatures object for method chaining
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' '); // Extract the sort fields from the query string
      this.query = this.query.sort(sortBy); // Sort the query results based on the extracted fields
    } else {
      this.query = this.query.sort('-createdAt'); // Default sorting by the 'createdAt' field in descending order
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' '); // Extract the fields to include from the query string
      this.query = this.query.select(fields); // Select only the specified fields in the query results
    } else {
      this.query = this.query.select('-__v'); // Exclude the '__v' field from the query results by default
    }

    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1; // Get the page number from the query string, defaulting to 1
    const limit = this.queryString.limit * 1 || 100; // Get the limit (number of documents per page) from the query string, defaulting to 100
    const skip = (page - 1) * limit; // Calculate the number of documents to skip

    this.query = this.query.skip(skip).limit(limit); // Skip the calculated number of documents and limit the results to the specified limit

    return this;
  }
}

module.exports = APIFeatures;

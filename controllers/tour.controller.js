const Tour = require("../models/Tour.model");

exports.getAllTour = async (req, res) => {
  try {
    // fields = fields.split(",").join(" ");
    let filters = { ...req.query };
    const excludeFields = ["sort", "page", "limit"];
    excludeFields.forEach((field) => delete filters[field]);

    let filtersString = JSON.stringify(filters);
    filtersString = filtersString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );

    filters = JSON.parse(filtersString);

    const queries = {};

    if (req.query.sort) {
      // price,qunatity   -> 'price quantity'
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
      console.log(sortBy);
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
      console.log(fields);
    }

    if (req.query.page) {
      const { page = 1, limit = 10 } = req.query; // "3" "10"
      const skip = (page - 1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = parseInt(limit);
    }

    const result = await Tour.find(filters)
      .skip(queries.skip)
      .limit(queries.limit)
      .select(queries.fields)
      .sort(queries.sortBy);
    res.status(200).json({ tours: result, total: result.length });
  } catch (error) {
    res.status(400).json({ status: "Failed to get tours", error });
  }
};
exports.createTour = async (req, res) => {
  try {
    const result = await Tour.create(req.body);
    res.status(200).json({ status: "success", result });
  } catch (error) {
    res.status(400).json({ status: "Failed to create tours", error });
  }
};
exports.insertMultiple = async (req, res) => {
  try {
    const result = await Tour.insertMany(req.body.tours);
    res.status(200).json({ status: "success", result });
  } catch (error) {
    res.status(400).json({ status: "Failed to create tours", error });
  }
};

exports.getSingleTour = async (req, res) => {
  try {
    const result = await Tour.findOne({ _id: req.params.id });
    let prev = result.visitCount;
    if (!prev) {
      result.visitCount = 1;
      result.save();
    } else {
      result.visitCount = prev + 1;
      result.save();
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ status: "failed", error });
  }
};

exports.updateTour = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await Tour.updateOne({ _id: id }, { $set: req.body });
    if (!result.acknowledged) {
      res.status(400).json({ message: "Update failed" });
    }
    res.status(200).json({ message: "Updated", result });
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.getCheapestTours = async (req, res, next) => {
  try {
    const result = await Tour.find({}).sort({ price: 1 }).limit(3);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.getTrendingTours = async (req, res, next) => {
  try {
    const result = await Tour.find({}).sort({ visitCount: -1 }).limit(3);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
};

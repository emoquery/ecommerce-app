import Category from "../models/category.js";
import Product from "../models/product.js";
import slugify from "slugify";

export const create = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name.trim()) {
      return res.json({ error: "name is required" });
    }

    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      return res.json({ error: "this category already exists" });
    }

    const category = await new Category({ name, slug: slugify(name) }).save();

    res.json(category);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

export const update = async (req, res) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params;

    const category = await Category.findOneAndUpdate(
      categoryId,
      {
        name,
        slug: slugify(name),
      },
      { new: true }
    );

    res.json(category);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

export const remove = async (req, res) => {
  try {
    const removed = await Category.findByIdAndDelete(req.params.categoryId);

    res.json(removed);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

export const list = async (req, res) => {
  try {
    const all = await Category.find({});

    res.json(all);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

export const read = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });

    res.json(category);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

export const productsByCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    const products = await Product.find({ category }).populate("category");

    res.json({
      category,
      products,
    });
  } catch (err) {
    console.log(err);
  }
};
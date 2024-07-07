const InventoryModel = require("../models/inventory-model")
const utilities = require(".")
  const { body, validationResult } = require("express-validator")
  const validate = {}
  validate.classificationRules = () => {
    return [
        body("classification_name")
        .trim() 
        .notEmpty().withMessage("Classification name cannot be empty.")
        .matches(/^[a-zA-Z0-9]+$/).withMessage("Classification name must not contain special characters or spaces.")
    ]
  }
  validate.checkClassificationData = async (req, res, next) => {
    const classification_name = req.body.classification_name
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
      let nav = await utilities.getNav()
      res.render("./inventory/add-classification", {
        errors,
        title: "Add Classification",
        nav,
        classification_name,
      })
      return
    }
    next()
  }

  validate.inventoryRules = () => {
    return [
      // Make, Model, Color validation
      body(['inv_make', 'inv_model', 'inv_color'])
        .trim()
        .notEmpty().withMessage((value, { path }) => `${path.replace('inv_', '').replace('_', ' ')} cannot be empty.`)
        .matches(/^[a-zA-Z0-9]+$/).withMessage((value, { path }) => `${path.replace('inv_', '').replace('_', ' ')} must not contain special characters or spaces.`),

      // Year validation
      body('inv_year')
        .trim()
        .notEmpty().withMessage('Year cannot be empty.')
        .isLength({ min: 4, max: 4 }).withMessage('Year must be exactly 4 digits.')
        .isNumeric().withMessage('Year must be a number.')
        .matches(/^\d{4}$/).withMessage('Year must be a 4-digit number.'),

      // Description validation
      body('inv_description')
        .trim()
        .notEmpty().withMessage('Description cannot be empty.'),

      // Image and Thumbnail validation
      body(['inv_image', 'inv_thumbnail'])
        .trim()
        .notEmpty().withMessage("Image / thumbnail cannot be empty."),

      // Price validation
      body('inv_price')
        .trim()
        .notEmpty().withMessage('Price cannot be empty.')
        .isNumeric().withMessage('Price must be a number.')
        .matches(/^\d+$/).withMessage('Price must not contain special characters or spaces.'),

      // Miles validation
      body('inv_miles')
        .trim()
        .notEmpty().withMessage('Miles cannot be empty.')
        .isNumeric().withMessage('Miles must be a number.')
        .matches(/^\d+$/).withMessage('Miles must not contain special characters or spaces.'),
    ];
  };
  validate.checkInventoryData = async (req, res, next) => {
    const { inv_make } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
      let nav = await utilities.getNav()
      let classificationList = await utilities.buildClassificationList()
      res.render("./inventory/add-inventory", {
        errors,
        title: "Add Inventory",
        nav,
        classificationList,
        inv_make,
        inv_model,
        inv_year,
        inv_description,
        inv_image,
        inv_thumbnail,
        inv_price,
        inv_miles,
        inv_color
      })
      return
    }
    next()
  }

  module.exports = validate
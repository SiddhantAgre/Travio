const joi = require("joi");

module.exports.listingSchema = joi.object({
  listing: joi
    .object({
      title: joi.string().required(),
      description: joi.string().required(),
      country: joi.string().required(),
      location: joi.string().required(),
      image: joi.object({
        filename: joi.string().optional(),
        url: joi.string(),
      }).optional(),
      price: joi.number().required(),
    })
    .required(),
});


module.exports.reviewSchema = joi.object({
  review: joi.object({
    comment: joi.string().required(),
    rating: joi.number().min(1).max(5).required(),
  }).required(),
})
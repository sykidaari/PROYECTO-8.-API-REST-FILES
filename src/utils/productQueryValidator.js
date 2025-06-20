const handleError = require('./errorHandler');

const validFields = {
  animalType: ['dog', 'cat', 'bird', 'fish', 'rodent', 'reptile'],
  weightClass: ['small', 'medium', 'large'],
  ageGroup: ['young', 'adult', 'senior'],
  category: ['dry-food', 'wet-food', 'snack', 'toy', 'util']
};

const validateProductQuery = ({
  query,
  allowedFields,
  res,
  controllerName,
  reqType
}) => {
  const filter = {};

  for (const key of allowedFields) {
    const value = query[key];

    if (value !== undefined) {
      if (validFields[key] && !validFields[key].includes(value)) {
        return handleError({
          res,
          error: new Error(`invalid ${key} in req.query`),
          reqType,
          controllerName,
          action: `validate ${key}`
        });
      }
      filter[key] = value;
    }
  }

  return { filter };
};

module.exports = validateProductQuery;

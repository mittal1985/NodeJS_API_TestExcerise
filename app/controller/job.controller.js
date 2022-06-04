const job = require("../models/job.model.js");


// Find a single job by Id
exports.findOne = (req, res) => {
  job.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found job with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving job with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Update a job identified by the id in the request
exports.updateById = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }


  job.updateById(
    req.params.id,
    new job(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found job with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating job with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};


// Sort jobs by Id in the request
exports.sortById = (req, res) => {
   
      job.sortbyProvidedInput( req.params.sortParam,req.params.sortOrder,(err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving job."
          });
        else res.send(data);
      });
  };


  // Retrieve all jobs from the database (with condition).
exports.findAll = (req, res) => {
  job.getAll ((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving jobs."
      });
    else res.send(data);
  });
};
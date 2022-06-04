module.exports = app => {
    const job = require("../controller/job.controller.js");
    var router = require("express").Router();
 

    // Retrive all jobs
    router.get("/", job.findAll);

    // Update a job with id for status change, inserting notes
    router.put("/:id", job.updateById);

     // Retrive jobs sorted by id/name/status
     router.get("/sort/:sortParam/:sortOrder", job.sortById);

     // Retrive jobs filter by id
     router.get("/:id", job.findOne);



    app.use('/api/jobs', router);
  };
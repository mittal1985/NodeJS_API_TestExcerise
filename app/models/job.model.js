const sql = require("./db.js");

// constructor
const job_desc = function(job) {
  this.job_id = job.job_id;
  this.description = job.description;
  this.status = job.status;
  this.created_at = job.created_at;
  this.notes = job.notes;
  this.sortParameter = job.sortParameter;
};

job_desc.create = (newTutorial, result) => {
  sql.query("INSERT INTO tutorials SET ?", newTutorial, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created tutorial: ", { id: res.insertId, ...newTutorial });
    result(null, { id: res.insertId, ...newTutorial });
  });
};

job_desc.findById = (id, result) => {
  sql.query(`SELECT * FROM jobs WHERE job_id = ${id}`, (err, res) => {
    if (err) {
      console.log("error" , err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found job" , res[0]);
      result(null, res[0]);
      return;
    }
     // not found Tutorial with the id
     result({ kind: "not_found" }, null);
  });
};
job_desc.getAll = result => {
  let query = "SELECT * FROM jobs";
  sql.query(query, (err, res) => {
    if (err) {
      console.log(error , err);
      result(null, err);
      return;
    }
    console.log("jobs" , res);
    result(null, res);
  });
};

job_desc.updateById = (id, job, result) => {
    
        sql.query(
            "UPDATE jobs SET notes = COALESCE(?, notes) , status = COALESCE(?, status) WHERE job_id = ?",
            [job.notes,job.status, id],
            (err, res) => {
              if (err) {
                console.log("error" , err);
                result(null, err);
                return;
              }
              if (res.affectedRows == 0) {
                  // not found Tutorial with the id
                  result({ kind: "not_found" }, null);
                return;
              }
              console.log("updated job" , { id :id, ...job });
              result(null, { id: id, ...job });
            }
          );
    
  
};

job_desc.sortbyProvidedInput = (sortParam,sortOrder,result) => {
    let query = "SELECT * FROM jobs order by  desc";
    sql.query(`SELECT * FROM jobs order by ${sortParam} ${sortOrder}`, (err, res) => {
      if (err) {
        console.log("error" , err);
        result(null, err);
        return;
      }
      console.log("jobs" , res);
      result(null, res);
    });
  };

module.exports = job_desc;
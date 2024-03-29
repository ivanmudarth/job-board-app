const express = require("express");
const app = express();
const db = require("./config/db");
const port = 3001;
const bodyParser = require("body-parser");

app.use(express.json());
app.use(bodyParser.text({ type: "text/plain" }));

// getJobs
app.get(
  "/api/getJobs/:title/:city/:state/:min_salary/:max_salary/:rating",
  (req, res) => {
    const title = req.params.title.replace("&", " ");
    const city = req.params.city.replace("&", " ");
    const state = req.params.state.replace("&", " ");
    const min_salary = req.params.min_salary;
    const max_salary = req.params.max_salary;
    const rating = req.params.rating;

    const isTitle = title !== "null";
    const isLocation = city !== "null" && state !== "null";
    const isSalary = min_salary !== "null" && max_salary !== "null";
    const isRating = rating !== "null";

    db.query(
      `SELECT * \
    FROM JobPosting \
    WHERE IF (${isTitle}, UPPER(title) LIKE UPPER('%${title}%'), True) AND \
        IF (${isLocation}, UPPER(city) = UPPER('${city}') AND \
                  UPPER(state) = UPPER('${state}'), True) AND \
        IF (${isSalary}, avg_salary BETWEEN ${min_salary} AND ${max_salary}, True) AND \
        IF (${isRating}, rating >= ${rating}, True)`,
      (err, result) => {
        if (err) {
          console.log(err);
        }
        res.send(result);
      }
    );
  }
);

// getJob
app.get("/api/getJob/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    `SELECT * \
    FROM JobPosting \
    WHERE id = ${id}`,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

// getEmployer
app.get("/api/getEmployer/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    `SELECT * \
    FROM Employer \
    WHERE id = ${id}`,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

// getReplies
app.get("/api/getReplies/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    `SELECT * \
    FROM Reply \
    WHERE job_posting_id = ${id}`,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

// getReviews
app.get("/api/getReviews/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    `SELECT * \
    FROM Review \
    WHERE employer_id = ${id}`,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

// Sign In
app.get("/api/signIn/:username/:password", (req, res) => {
  const username = req.params.username;
  const password = req.params.password;

  db.query(
    `SELECT ID \
    FROM User \
    WHERE 
    username = '${username}' AND 
    password = '${password}'`,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

// postReply
app.post("/api/postReply/:user_id/:job_id", (req, res) => {
  const user_id = req.params.user_id;
  const job_id = req.params.job_id;
  const text = req.body;
  const timestamp = 0;

  db.query(
    `INSERT INTO Reply \
    VALUES (${job_id}, ${user_id}, '${text}', NOW())`,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

// postReview
app.post("/api/postReview/:user_id/:job_id/:review", (req, res) => {
  const user_id = req.params.user_id;
  const job_id = req.params.job_id;
  const review = req.params.review;
  const text = req.body;
  const timestamp = 0;

  db.query(
    `INSERT INTO Review \
    VALUES (${job_id}, ${user_id}, '${text}','${review}',  NOW())`,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

// Sign Up
app.get("/api/signUp/:name/:username/:password", (req, res) => {
  const name = req.params.name;
  const username = req.params.username;
  const password = req.params.password;

  db.query(
    `INSERT INTO User \
    (username, password, name) VALUES \ 
    ('${username}', '${password}', '${name}')`,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

// getUserInfo
app.get("/api/getUserInfo/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    `SELECT * \
    FROM User \
    WHERE id = ${id}`,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

// postShortlist
app.post("/api/postShortlist/:user_id/:job_id", (req, res) => {
  const user_id = req.params.user_id;
  const job_id = req.params.job_id;

  db.query(
    `INSERT INTO Shortlist \
    VALUES (${user_id}, ${job_id})`,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

// getShortlist
app.get("/api/getShortlist/:user_id", (req, res) => {
  const id = req.params.user_id;

  db.query(
    `SELECT * \
    FROM JobPosting, Shortlist  \
    WHERE user_id = ${id}
    AND JobPosting.id = Shortlist.job_posting_id`,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

// removeShortlist
app.post("/api/removeShortlist/:user_id/:job_id", (req, res) => {
  const user_id = req.params.user_id;
  const job_id = req.params.job_id;

  db.query(
    `DELETE FROM Shortlist \
    WHERE user_id = ${user_id} AND job_posting_id = ${job_id}`,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

// isShortlisted
app.get("/api/isShortlisted/:user_id/:job_id", (req, res) => {
  const user_id = req.params.user_id;
  const job_id = req.params.job_id;

  db.query(
    `SELECT * \
    FROM Shortlist  \
    WHERE user_id = ${user_id} AND job_posting_id = ${job_id}`,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

// createEmployer
app.post("/api/createEmployer", (req, res) => {
  const { employerDetails } = req.body;

  db.query(
    `INSERT INTO Employer (name, employee_count, revenue, ownership_type, city, state) \
    VALUES ('${employerDetails.employerName}', \
      ${employerDetails.employeeCount}, \
      ${employerDetails.revenue}, \
      '${employerDetails.ownershipType}', \
      '${employerDetails.city}', \
      '${employerDetails.state}')`,
    (err, result) => {
      if (err) {
        console.log(err);
      }
    }
  );

  db.query(
    `SELECT * \
    FROM Employer  \
    WHERE id = LAST_INSERT_ID()`,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

// createEmployer
app.post("/api/createJobPosting", (req, res) => {
  const { formData } = req.body;

  db.query(
    `INSERT INTO JobPosting (title, employer_id, description, min_salary, \
      max_salary, avg_salary, city, state) \
    VALUES ('${formData.jobTitle}', \
      ${formData.employerId}, \
      '${formData.jobDescription}', \
      ${formData.minSalary}, \
      ${formData.maxSalary}, \
      ${formData.avgSalary}, \
      '${formData.city}', \
      '${formData.state}')`,
    (err, result) => {
      if (err) {
        console.log(err);
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

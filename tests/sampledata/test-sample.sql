-- Feature 1
INSERT INTO User (username, password, name) VALUES ('user1', 'abcabc', 'John Doe')
SELECT * FROM User

SELECT ID FROM User WHERE username = 'user1' AND password = 'acbabc'

-- Feature 2
INSERT INTO Shortlist VALUES (1, 2)
SELECT * FROM Shortlist

SELECT DISTINCT job_posting_id FROM Shortlist WHERE user_id = 1

DELETE FROM Shortlist WHERE job_posting_id = 2
SELECT DISTINCT job_posting_id FROM Shortlist WHERE user_id = 1

-- Feature 3
INSERT INTO Reply VALUES (2, 1, 'this is my first reply', '2023-3-5 14:56:59')
INSERT INTO Reply VALUES (2, 1, 'this is my second reply', '2023-3-5 14:58:00')

SELECT user_id, reply_text 
FROM Reply 
WHERE job_posting_id = 2 
ORDER BY date_posted DESC;

-- Feature 4
FROM JobPosting 
WHERE IF (True, UPPER(title) LIKE UPPER('%Sr%'), True) AND 
	  IF (True, UPPER(city) = UPPER('new york') 
		AND UPPER(state) = UPPER('ny'), True) AND
	  IF (True, avg_salary BETWEEN 100 AND 200, True) AND 
	  IF (True, rating >= 3.0, True)

SELECT * 
FROM JobPosting 
WHERE IF (False, UPPER(title) LIKE UPPER('%%'), True) AND 
	  IF (True, UPPER(city) = UPPER('New York') AND UPPER(state) = UPPER('NY'), True) AND
	  IF (False, avg_salary BETWEEN 0 AND 0, True) AND
	  IF (False, rating >= 0, True)


-- Feature 5 

-- Insert new employer
INSERT INTO Employer (name, employee_count, revenue, ownership_type, city, state)
VALUES ('New Employer', 100, 1000000, 'Private', 'New York', 'NY');

-- Insert new job posting
INSERT INTO JobPosting (title, employer_id, description, min_salary, 
												max_salary, avg_salary, city, state, rating)
VALUES ('New Job Posting', LAST_INSERT_ID(), 
				'Description of new job posting', 
				50000, 70000, 60000, 'New York', 'NY', 4.5);

SELECT * FROM Employer ORDER BY id DESC LIMIT 2;
SELECT * FROM JobPosting ORDER BY id DESC LIMIT 2;


-- Existing employer adding job (id = 8)
INSERT INTO JobPosting (title, employer_id, description, min_salary, 
												max_salary, avg_salary, city, state, rating)
VALUES ('New Job Posting 2', 8, 
				'Description of new job posting', 
				70000, 90000, 80000, 'New York', 'NY', 4.5);
				
SELECT * FROM JobPosting WHERE employer_id=8

-- Feature 6
INSERT INTO Review VALUES (2, 1, 'this is my first review', 3, '2023-3-12 12:23:34')
INSERT INTO Review VALUES (2, 1, 'this is my second review', 4, '2023-3-13 1:20:30')

SELECT user_id, review_text, employer_rating, timestamp
FROM Review 
WHERE employer_id = 2
ORDER BY timestamp DESC

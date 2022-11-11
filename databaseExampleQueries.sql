-- We are not running the queries but only writing the querries in this page


--Create a table
CREATE TABLE jobs(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	company varchar(50) NOT NULL,
	title varchar(50),
	type varchar(50),
  location varchar(50),
	salary integer,
	description varchar(500)
 );

--Insert a table
INSERT INTO jobs
  (company, title, type, location, salary, description)
VALUES
  ('UpLeveled', 'Web Developer', 'Full-time', 'Vienna', 40000, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Etiam erat velit scelerisque in dictum non. Pellentesque massa placerat duis ultricies lacus. At tempor commodo ullamcorper a lacus vestibulum sed arcu non. Purus semper eget duis at. Et ligula ullamcorper malesuada proin libero. Varius sit amet mattis vulputate enim nulla. Nunc sed id semper risus in hendrerit gravida. A diam sollicitudin tempor id.');


SELECT * FROM jobs

const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'exerciseTwo',
    port: 3306,
});

const execQuery = (connection, query) => {
    connection.query(query, (error, results) => {
        if (error) {
            throw error;
        }
        console.log(results);
    });
};

connection.connect();

// Write a query that prints names of all authors and their corresponding mentors.
const queryOne = `SELECT  A.author_no AS 'Author ID',
                          A.author_name AS 'Author Name',
                          B.author_name AS 'Mentor Name'
                  FROM authors A
                  JOIN authors B
                          ON A.mentor = B.author_no;`;
execQuery(connection, queryOne);

// Write a query that prints all columns of authors and their published paper_title.
// If there is an author without any research_Papers, print the information of that author too.
const queryTwo = `SELECT authors.*, paper_title
                  FROM authors 
                  LEFT JOIN authors_papers ON (authors.author_no = authors_papers.author_no)
                  LEFT JOIN research_Papers ON (research_Papers.paper_id = authors_papers.paper_id);`;
execQuery(connection, queryTwo);

connection.end();
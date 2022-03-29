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

// All research papers and the number of authors that wrote that paper.
const queryOne = `SELECT paper_title AS 'Paper Title',
                    COUNT(research_Papers.paper_title) AS 'Number of Authors' 
                  FROM authors 
                  JOIN authors_papers ON (authors.author_no = authors_papers.author_no)
                  JOIN research_Papers ON (research_Papers.paper_id = authors_papers.paper_id)
                  GROUP BY research_Papers.paper_title;`;
execQuery(connection, queryOne);

// Sum of the research papers published by all female authors.
const queryTwo = `SELECT COUNT(DISTINCT(research_Papers.paper_title)) AS 'Sum of Papers by Female'
                  FROM authors
                  JOIN authors_papers ON (authors.author_no = authors_papers.author_no)
                  JOIN research_Papers ON (research_Papers.paper_id = authors_papers.paper_id)
                  GROUP BY authors.gender
                  HAVING gender = 'Female';`;
execQuery(connection, queryTwo);

// Average of the h-index of all authors per university.
const queryThree = `SELECT authors.university AS University,
                      ROUND(AVG(authors.h_index), 2) AS 'Average of H-Index'
                    FROM authors 
                    GROUP BY authors.university;`;
execQuery(connection, queryThree);

// Sum of the research papers of the authors per university.
const queryFour = `SELECT authors.university AS University, COUNT(authors.author_name) AS 'Sum of Research Papers'
                   FROM authors 
                   JOIN authors_papers ON (authors.author_no = authors_papers.author_no)
                   JOIN research_Papers ON (research_Papers.paper_id = authors_papers.paper_id)
                   GROUP BY authors.university
                   ORDER BY authors.university;`;
execQuery(connection, queryFour);

// Minimum and maximum of the h-index of all authors per university.
const queryFive = `SELECT university AS University, MIN(h_index) AS 'Min H-Index', MAX(h_index) AS 'Max H-Index'
                   FROM authors
                   GROUP BY university
                   ORDER BY university;`;
execQuery(connection, queryFive);

connection.end();
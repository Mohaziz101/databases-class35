const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'userdb',
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
    const insertIntoAccount = `
  INSERT INTO account (accountNumber, balance) VALUES ? ;`;
    const accountValues = [
        [101, 7000],
        [102, 3000],
        [103, 9000],
        [104, 1000],
        [105, 5000],
    ];

    const insertIntoAccountChanges = `
  INSERT INTO accountChanges (changeNumber, accountNumber, amount, changedDate, remark) VALUES ? ;`;
    const accountChangesValues = [
        [1, 103, 2000, '2015-10-05 14:29:36', 'Received'],
        [2, 101, 1000, '2016-07-19 15:29:36', 'Sent'],
        [3, 104, 3000, '2014-01-25 11:29:36', 'Sent'],
        [4, 105, 1000, '2017-12-30 12:29:36', 'Received'],
        [5, 102, 4000, '2019-03-14 16:29:36', 'Received'],
    ];

    connection.connect();

    try {
        await execQuery('START TRANSACTION');

        await execQuery(insertIntoAccount, [accountValues]);
        await execQuery(insertIntoAccountChanges, [accountChangesValues]);

        await execQuery('COMMIT');
    } catch (error) {
        console.error(error);
        await execQuery('ROLLBACK');
    }

    connection.end();
}

seedDatabase();
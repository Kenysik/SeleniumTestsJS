Connection = require('tedious').Connection;
config = {
    server: '',  //update me
    authentication: {
        type: 'default',
        options: {
            userName: '', //update me
            password: ''  //update me
        }
    },
    options: {
        // If you are on Microsoft Azure, you need encryption:
        encrypt: true,
        database: ''  //update me
    }
};

function establishConnection() {
    let connection = new Connection(config);
    return new Promise((resolve, reject) => {
        connection.on('connect', function (err) {
            if (err) {
                console.log(err.toString());
                return reject(err);
            }
            // If no error, then good to proceed.
            console.log("Connected");
            resolve(connection);
        });
    });
}

Request = require('tedious').Request;

module.exports.getCodeByPhone = async function getCodeSentToPhone(phoneNumber) {
    let connection = await establishConnection()
                            .then(
                                (result) => {console.log("Connected successfully"); return result;},
                                (error) => {console.log("Not connected");}
                                );

    if (connection) {
        let sqlQuery = "SELECT TOP (1) Code FROM Wave.dbo.ConfirmationCodeMessages WHERE PhoneNumber = '" + phoneNumber + "' order by Id desc;";

        return new Promise((resolve, reject) => {
            let request = new Request(sqlQuery, function (err, rowCount) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Total rows ' + rowCount);
                }
            });
            let result = "";

            request.on('row', function (columns) {
                columns.forEach(function (column) {
                    if (column.value === null) {
                        console.log('NULL');
                    } else {
                        result += column.value + " ";
                    }
                });
                console.log(result);
            });

            request.on('done', function (rowCount, more) {
                console.log(rowCount + ' rows returned ' + more.toString());
            });

            request.on('requestCompleted', function () {
                console.log('requestCompleted');
                connection.close();
                resolve(result);
            });

            connection.execSqlBatch(request);
        });
    } else return new Error("Connection to DB wasn't established");
};
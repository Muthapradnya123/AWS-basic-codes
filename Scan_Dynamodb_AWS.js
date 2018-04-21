console.log('starting function');
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'us-west-2'});
exports.handler = (e, context, callback) => {

    //var email=e.email_id;
    var n=e.book_id;
    var params = {
    TableName: "Upload_Book",
    ProjectionExpression: "name",
};
    console.log("Scanning Upload_Books table.");
docClient.scan(params, onScan);
var count = 0;

        function onScan(err, data) {
    if (err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        // print all the movies
        console.log("Scan succeeded.");
        data.Items.forEach(function(Search_Book) {
           console.log("Item :", ++count,JSON.stringify(Search_Book));
        });

        // continue scanning if we have more movies
        if (typeof data.LastEvaluatedKey != "undefined") {
            console.log("Scanning for more...");
            params.ExclusiveStartKey = data.LastEvaluatedKey;
            docClient.scan(params, onScan);
        }
    }
}  
};

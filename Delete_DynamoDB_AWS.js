var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2"
});

var docClient = new AWS.DynamoDB.DocumentClient()

exports.handler = function(e, ctx, callback) {

var email=e.email_id;
// Update the item, unconditionally,

var params = {
    TableName:"Reg",
    Key:{
        "email_id": email
    }
};

console.log("Delelting user...");
docClient.delete(params, function(err, data) {
    if (err) {
        console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Deleted user succesfully ", JSON.stringify(data, null, 2));
    }
});
};

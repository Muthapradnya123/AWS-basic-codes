var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-west-2",
});

var docClient = new AWS.DynamoDB.DocumentClient();
exports.handler = (e, context, callback) => {
var params=  {
    TableName:'Upload_Book',
    ProjectionExpression:'book_name,author,edition,copies,book_id',
    FilterExpression:'author = :author OR book_name = :book_name  ',
    ExpressionAttributeValues:{ ":author" : e.author, ":book_name": e.book_name  }
};


console.log("Scanning Upload_Books table.");

docClient.scan(params, function(err, data){
    if(err){
        callback(err, null);
    }else{
        callback(null, data);
   }
});
};

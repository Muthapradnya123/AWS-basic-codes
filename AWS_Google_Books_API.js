var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-west-2",
});

var docClient = new AWS.DynamoDB.DocumentClient();
exports.handler = (e, context, callback) => {

var https = require('https');
var http = require('http');

var GOOGLE_BOOKS_API_BASE = 'www.googleapis.com';
var GOOGLE_BOOKS_API_BOOK = '/books/v1/volumes';

var isbn=e.isbn;

var requestOptions = {
    host: GOOGLE_BOOKS_API_BASE,
    path: GOOGLE_BOOKS_API_BOOK + '?q=isbn:' + isbn
  };

var request = https.request(requestOptions, function(response) {
    if (response.statusCode == 200) {
        console.log("connected "+response.statusCode);
      //return callback(new Error('wrong response code: ' + response.statusCode));
    }

    var body = '';
    response.on('data', function(chunk) {
      body += chunk;
      //console.log(body);
    });
    
    response.on('end', function() {
      var books = JSON.parse(body);
      
    var a = books.items[0].volumeInfo.authors[0];
    var bn=books.items[0].volumeInfo.title;
    var publisher=books.items[0].volumeInfo.publisher;
    var cat=books.items[0].volumeInfo.categories;
    var img=books.items[0].volumeInfo.imageLinks.smallThumbnail;
    
    
    var cop=e.copies;
    var ed=e.edition;
    
    console.log(publisher);
    console.log(bn);
    console.log(a);
    console.log(cat);
    console.log(img);
    
    var min=1;
    var max=9999;
    var genrandom;
    
    genrandom=Math.floor(Math.random()*max)+min;
    
    var params = {
        Item: {
            book_id:genrandom,
            author:a,
            copies:cop,
            edition:ed,
            book_name:bn,
            b_date:Date.now(),
            publisher:publisher,
            category:cat,
            imagelink:img
    
        },
        TableName: 'Upload_Book'
    };
    
    docClient.put(params, function(err,data){
        if(err){
            callback(err, null);
        }else{
            callback(null, "Book added Successfully !!");
        }
    });    
    
      if (!books.totalItems) {
        return callback(new Error('no books found with isbn: ' + isbn));
      }  


      return callback(null, books);
    });
  });

  request.on('error', function(err) {
    return callback(err);
  });

  request.end();

               
};

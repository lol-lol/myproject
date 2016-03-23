var express = require('express'),
	app = express(),
	cors = require('cors'),
	bodyParser = require('body-parser'),
	mysql = require('mysql');


var port = process.env.PORT || 9000;

app.use(cors());
app.use(bodyParser.urlencoded({
        extended: true
    }));
app.use(bodyParser.json());

/*function getBooks(){

    		return [
    		    {
    		       bookID: 9809,
    		      author: 'Davy Mitchel',
    		      title: 'Functional JavaScript',
    		      description: 'Functional programming in JavaScript',
    		      price: 29.99,
    		      category: 'Programming language',
    		      cover: 'images/javascript.jpg'
    		    },
    		    {
    		      bookID: 9100,
    		      author: 'Max Mitchel',
    		      title: 'AngularJS: Up and Running',
    		      description: 'Enhanced Productivity with Structured Web Apps',
    		      price: 19.99,
    		      category: 'Web Frameworks',
    		      cover: 'images/angularjs.jpg'
    		    },
    		    {
    		      bookID: 9353,
    		      author: 'Jesse Cravens, Thomas Q Brady',
    		      title: 'Introduction to IOT Programming with JavaScript',
    		      description: "In this book you will build robot, connected apps and devices applications.",
    		      price: 18.99,
    		      category: 'Web Frameworks',
    		      cover: 'images/iot.jpg'
    		    },
    		    {
    		      bookID: 9300,
    		      author: 'Jesse Cravens, Thomas Q Brady',
    		      title: 'Data visualisation in JavaScript',
    		      description:'Building data visualisation apps using JavaScript',
    		      price: 20.99,
    		      category: 'Web Frameworks',
    		      cover: 'images/datavis.jpg'
    		    },
    		    {
    		      bookID: 9657,
    		      author: 'Jesse Cravens, Thomas Q Brady',
    		      title: 'ES6: JavaScript Next',
    		      description: "This book will cover ES6 entirely and will show you how to use ES6 today.",
    		      price: 9.99,
    		      category: 'Web Frameworks',
    		      cover: 'images/es6.jpg'
    		    },
    		    {
    		      bookID: 9887,
    		      author: 'Jesse Cravens, Thomas Q Brady',
    		      title: 'Ionic Framework: Building hybrid app',
    		      description: "Build Hybrid apps using Angular, Ionic and deliver fast.",
    		      price: 9.99,
    		      category: 'Web Frameworks',
    		      cover: 'images/ionic.jpg'
    		    },
    		    {
    		      bookID: 9546,
    		      author: 'Backstop Media, Rick Waldron',
    		      title: 'Make: JavaScript Robotics',
    		      description: 'Building NodeBots with Raspberry Pi, Arduino, and BeagleBone',
    		      price: 10.99,
    		      category: 'Robotic & Programming',
    		      cover: 'images/robot.jpg'
    		    }
    		  ];}

function getBooks(){

	return [
		{
			bookID: 9809,
			bookAuthor: 'Davy Mitchel',
			bookName: 'Functional JavaScript',
			bookDescription: 'Functional programming in JavaScript',
			bookPrice: 29.99,
			bookCategory: 'Programming language',
			bookCover: 'images/javascript.jpg'
		},
		{
			bookID: 9100,
			bookAuthor: 'Max Mitchel',
			bookName: 'AngularJS: Up and Running',
			bookDescription: 'Enhanced Productivity with Structured Web Apps',
			bookPrice: 19.99,
			bookCategory: 'Web Frameworks',
			bookCover: 'images/angularjs.jpg'
		},
		{
			bookID: 9353,
			bookAuthor: 'Jesse Cravens, Thomas Q Brady',
			bookName: 'Introduction to IOT Programming with JavaScript',
			bookDescription: "In this book you will build robot, connected apps and devices applications.",
			bookPrice: 18.99,
			bookCategory: 'Web Frameworks',
			bookCover: 'images/iot.jpg'
		},
		{
			bookID: 9300,
			bookAuthor: 'Jesse Cravens, Thomas Q Brady',
			bookName: 'Data visualisation in JavaScript',
			bookDescription:'Building data visualisation apps using JavaScript',
			bookPrice: 20.99,
			bookCategory: 'Web Frameworks',
			bookCover: 'images/datavis.jpg'
		},
		{
			bookID: 9657,
			bookAuthor: 'Jesse Cravens, Thomas Q Brady',
			bookName: 'ES6: JavaScript Next',
			bookDescription: "This book will cover ES6 entirely and will show you how to use ES6 today.",
			bookPrice: 9.99,
			bookCategory: 'Web Frameworks',
			bookCover: 'images/es6.jpg'
		},
		{
			bookID: 9887,
			bookAuthor: 'Jesse Cravens, Thomas Q Brady',
			bookName: 'Ionic Framework: Building hybrid app',
			bookDescription: "Build Hybrid apps using Angular, Ionic and deliver fast.",
			bookPrice: 9.99,
			bookCategory: 'Web Frameworks',
			bookCover: 'images/ionic.jpg'
		},
		{
			bookID: 9546,
			bookAuthor: 'Backstop Media, Rick Waldron',
			bookName: 'Make: JavaScript Robotics',
			bookDescription: 'Building NodeBots with Raspberry Pi, Arduino, and BeagleBone',
			bookPrice: 10.99,
			bookCategory: 'Robotic & Programming',
			bookCover: 'images/robot.jpg'
		}
	];}
 */

function getBooks(fn){
	var conn = mysql.createConnection({
		host:'localhost',
		user:'root',
		password:'root',
		database:'test'
	});

	conn.query(
		'select * from book',
		function(err,rows,field){
			if(err){
				fn(err);
				console.log(err);
			}else{
				fn(null,rows);
				//console.log(rows);
			}
			conn.end();
		}
	);

}
function getBookTypes(fn){
    var conn = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'root',
        database:'test'
    });

    conn.query(
        'select distinct bookType from book',
        function(err,rows,field){
            if(err){
                fn(err);
                //console.log(err);
            }else{
                fn(null,rows);
                //console.log(rows);
            }
            conn.end();
        }
    );

}

function bookCodeByType(type,fn){
    var conn = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'root',
        database:'test'
    });
    var sql = "select bookCode from code where code.bookType="+"'"+type+"'";
    console.log(sql);
    conn.query(
        sql,
        function(err,rows,field){
            if(err){
                fn(err);
                //console.log(err);
            }else{
                fn(null,rows);
                //console.log(rows);
            }
            conn.end();
        }
    );
}

function preserveBook(book,fn){
    var conn = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'root',
        database:'test'
    });
    var sql = "insert into book values('"+book.bookId+"','"+book.bookName+"','"+book.bookAuthor+"','"+book.bookPrice+"','"+book.bookDescription+"','"
        +book.bookType +"','"+book.bookCover+"')";
    console.log(sql);
    conn.query(
        sql,
        function(err,rows,field){
            if(err){
                fn(err);
            }else{
                fn(null,rows);
                console.log("rows:"+rows[0]);
            }
            conn.end();
        }
    );
}

function bookDetailById(bookId,fn){
    var conn = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'root',
        database:'test'
    });
    var sql = "select * from book where book.bookId="+"'"+bookId+"'";
    console.log(sql);
    conn.query(
        sql,
        function(err,rows,field){
            if(err){
                fn(err);
            }else{
                fn(null,rows);
            }
            conn.end();
        }
    );
}


app.get('/api/bookDetail/:bookId',function(req,res){
    var bookId=req.params.bookId;
    bookDetailById(bookId,function(err,rows){
        res.json(rows[0]);
    });
});


app.post('/api/bookPreserve',function(req,res){
    var book = {
        bookId:req.body.bookId,
        bookName:req.body.bookName,
        bookAuthor:req.body.bookAuthor,
        bookPrice:req.body.bookPrice,
        bookDescription:req.body.bookDescription,
        bookType:req.body.bookType,
        bookCover:req.body.bookCover
    };
    preserveBook(book,function(err,rows){
        if(err) {
            console.log(err);
            res.send("1");
        }
        else{
            res.send("0");
        }
    });
});

app.get('/api/bookCodeByType/:bookType', function(req, res){
    var type = req.params.bookType;
    bookCodeByType(type,function(err,rows){
        res.json(rows);
    })
});

function getBooksByTypeCode(type,fn){
    var conn = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'root',
        database:'test'
    });
    var sql = "select * from book inner join code on book.bookType=code.bookType where code.bookCode="+"'"+type+"'";
    //console.log(sql);
    conn.query(
        sql,
        function(err,rows,field){
            if(err){
                fn(err);
                //console.log(err);
            }else{
                fn(null,rows);
                //console.log(rows);
            }
            conn.end();
        }
    );
}

app.get('/api/check/:email&:password', function(req, res){
    //var arg = url.parse(req.url,true).query;

    var user = req.params.email;
    var psw = req.params.password;
    //console.log("xiongtest"+user+":"+psw);
    if('xiongmama@126.com' == user && 'ff1'==psw){
        res.send("0");
    }else{
        res.send("1");
    }
});
app.get('/api/bookTypes', function(req, res){
    getBookTypes(function(err,rows){
        res.json(rows);
    })
});

app.get('/api/books/:bookType', function(req, res){
    var type = req.params.bookType;
    if(0==type){
        getBooks(function(err,rows){
            res.json(rows);
        });
    }else{
        getBooksByTypeCode(type,function(err,rows){
            res.json(rows);
        });
    }
});

app.get('/api/books/:bookID', function(req, res){
    var bookID = Number(req.params.bookID);
    var book = getBooks().filter(function(book){
        return book.bookID === bookID;
    })[0];

    if (book) {
        res.json(book)
    }else{
        res.status(404).send({message:'sorry No book found with ID: '+bookID});
    }
});

app.post('/api/books/addbook', function(req, res){
	var books = getBooks();
	books.push(req.body);
	res.json(books);
});

app.put('/api/books/:bookID', function(req, res){
    
    var bookID = Number(req.params.bookID), updatedBook = req.body, found = false;

    var books = getBooks();

    books.forEach(function(book, index){
        if(book.bookID === bookID){
            books[index] = updatedBook;
            found = true;
            res.json(books);
        }
    });


    if(!found){
        res.status(500).send({message: 'Update failed!'});
    }
    
});

app.listen(port, function(){
	console.log('app is running on port: '+port);
});
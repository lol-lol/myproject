create table book(bookId varchar(10) not null primary key,
bookName varchar(20) not null,
bookPub varchar(30) not null,
bookAuthor varchar(6) not null,
bookPrice int not null,
bookDescription varchar(50) not null,
bookType varchar(30) not null,
bookCover varchar(20));


insert into book values('9809','Functional JavaScript','Davy Mitchel',29.99,'Functional programming in JavaScript','Programming language','images/javascript.jpg');
insert into book values('9100','AngularJS: Up and Running','DMax Mitchel',19.99,
'Enhanced Productivity with Structured Web Apps','Web Frameworks','images/angularjs.jpg');
insert into book values('9353','Introduction to IOT Programming with JavaScript','Jesse Cravens, Thomas Q Brady',18.99,
'In this book you will build robot, connected apps and devices applications.','Web Frameworks','images/iot.jpg');
insert into book values('9300','Data visualisation in JavaScript','Jesse Cravens, Thomas Q Brady',20.99,
'Building data visualisation apps using JavaScript','Web Frameworks','images/datavis.jpg');
insert into book values('9657','ES6: JavaScript Next','Jesse Cravens, Thomas Q Brady',9.99,
'This book will cover ES6 entirely and will show you how to use ES6 today.','Web Frameworks','images/es6.jpg');
insert into book values('9887','Ionic Framework: Building hybrid app','Jesse Cravens, Thomas Q Brady',9.99,
'Build Hybrid apps using Angular, Ionic and deliver fast.','Web Frameworks','images/ionic.jpg');
insert into book values('9546','Make: JavaScript Robotics','Backstop Media, Rick Waldron',10.99,
'Building NodeBots with Raspberry Pi, Arduino, and BeagleBone','Robotic & Programming','images/robot.jpg');

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session=require('express-session');
var connection  = require('./database.js');
var multer = require('multer');


var indexRouter = require('./routes/index');
var homeRouter=require('./routes/home');
var usersRouter = require('./routes/users');  
var productRouter=require('./routes/product');
var productdescRouter=require('./routes/prodesc');
var stayRouter=require('./routes/stay');
var staydescRouter=require('./routes/staydesc');
var educationRouter=require('./routes/education');
var educationdescRouter=require('./routes/educationdesc');
var foodRouter=require('./routes/food');
var fooddescRouter=require('./routes/fooddesc');
var shoppingRouter=require('./routes/shopping');
var shoppingdescRouter=require('./routes/shoppingdesc');
var placesRouter=require('./routes/places');
var placesdescRouter=require('./routes/placesdesc');
var travelRouter=require('./routes/travel');
var traveldescRouter=require('./routes/traveldesc');
var contactRouter=require('./routes/contact');
var aboutRouter=require('./routes/about');
var payment=require('./routes/payment');
var userfunctRouter=require('./routes/userfunction');
var deleteuserfunction=require('./routes/deleteuserfunction');
var additemsRouter=require('./routes/additems');
var updatepasswordRouter=require('./routes/updatepassword');
var updateitemRouter=require('./routes/updateitem');
var roomateRouter=require('./routes/roomate.js');
var roomdescRouter=require('./routes/roomdesc.js');
var contactsellerRouter=require('./routes/contactseller');
var contactseller1Router=require('./routes/contactseller1');
var userpaymentRouter=require('./routes/userpayment');
var forgotRouter=require('./routes/forgot');
var profile=require('./routes/userprofile');

var delstayadRouter=require('./routes/delstayad');
var delfoodadRouter=require('./routes/delfoodad');
var delshoppingadRouter=require('./routes/delshoppingad');
var delplacesadRouter=require('./routes/delplacesad');
var deltraveladRouter=require('./routes/deltravelad');
var adminfunctRouter=require('./routes/adminfunction');
var delproductad=require('./routes/delproductad');
var deleteusersadRouter=require('./routes/deleteusersad');
var deleducationadRouter=require('./routes/deleducationad');
var delpaymentadRouter = require('./routes/delpaymentad');
const { sendEmail } = require('./routes/sendemail.js');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req,res,next)=>{
  console.log(req.path);
  next()
})
app.use(session({
  secret:'secret',
  resave: true,
	saveUninitialized: true
}))
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(productRouter);
app.use(productdescRouter);
app.use(stayRouter);
app.use(profile);
app.use(staydescRouter);
app.use(educationRouter);
app.use(educationdescRouter);
app.use(foodRouter);
app.use(fooddescRouter);
app.use(shoppingRouter);
app.use(shoppingdescRouter);
app.use(placesRouter);
app.use(placesdescRouter);
app.use(travelRouter);
app.use(traveldescRouter);
app.use(contactRouter);
app.use(aboutRouter);
app.use(payment);
app.use(homeRouter);
app.use(userfunctRouter);
app.use(deleteuserfunction);
app.use(additemsRouter);
app.use(updatepasswordRouter);
app.use(updateitemRouter);
app.use(roomateRouter);
app.use(roomdescRouter);
app.use(contactsellerRouter);
app.use(contactseller1Router);
app.use(userpaymentRouter);
app.use(forgotRouter);
app.use(delstayadRouter);
app.use(delfoodadRouter);
app.use(delshoppingadRouter);
app.use(delplacesadRouter);
app.use(deltraveladRouter);
app.use(adminfunctRouter);
app.use(delproductad);
app.use(deleteusersadRouter);
app.use(deleducationadRouter);
app.use(delpaymentadRouter);
// app.use(submitr);
app.use(express.static(__dirname+"/images"));
app.use(express.static(__dirname+"/images/users"));
app.use(express.static(__dirname+"/views"));

const storageuser = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'images/users')
  },
  filename:(req,file,cb)=>
  {
    cb(null,Date.now() + path.extname(file.originalname));
  }
});
const uploaduser=multer({storage:storageuser})
//signup module
app.post('/submit',uploaduser.single('pic'), function(req, res, next) {
  console.log("hello");
var name = req.body.name;
var phone = req.body.phno;
var email = req.body.email1;
var password = req.body.psw1;
var type=req.body.type;
var adhaar_no=req.body.adhar;
var photos=req.file.filename;
var rm=req.body.rm;
var address=req.body.add;

var sql = `INSERT INTO users (name,phone, email, password,type,adhaar_no,photos,address,roomate) VALUES ("${name}", "${phone}", "${email}", MD5("${password}"),"${type}","${adhaar_no}","${photos}","${address}","${rm}");`
connection.query(sql, function(err, result) {
  if (err) throw err;
  console.log('record inserted');
  //req.flash('success', 'Data added successfully!');
  res.redirect('/#signup=true');
});
});

//login module
app.post('/login',(req,res)=>
    {
        console.log("Entered the login module");
        var e = req.body.email;
        var ps = req.body.pass;
        var query=connection.query('SELECT * FROM users WHERE email = ? AND password = MD5(?)', [e, ps], function(err, results, fields) {
            if(err) throw error;
            if (results.length > 0) {
				// Authenticate the user
        var user=results[0];
        console.log("Logged in successfully!!");
        req.session.type=user.type;
        req.session.usrid=user.u_id;
        req.session.loggedin=true;
        req.session.e=e;
        req.session.save();
	if(user.type=="a")
        {
	res.redirect('/#login=admin');
        }else if(user.type=="u"){
        res.redirect('/#login=true');
	} else {
        res.redirect('/#login=false');
			}			
    }
        });
    })

//Logout function
    app.get('/logout',function(req,res)
    {
        console.log("Logout accessed");
      req.session.destroy();
      res.redirect('/');
    });

//multer 
    const storage = multer.diskStorage({
      destination:(req,file,cb)=>{
        cb(null,'images')
      },
      filename:(req,file,cb)=>
      {
        cb(null,Date.now() + path.extname(file.originalname));
      }
    });
    const upload=multer({storage:storage})
//itemform module
app.post('/itemform',upload.single('photos'),function(req, res, next) {
console.log("hello");
var name = req.body.name;
var desc = req.body.desc;
var photo = req.file.filename;
console.log(req.file);
var contact = req.body.contact;
var price=req.body.price;
var review=req.body.review;
var location=req.body.location;
var usr_id=req.body.usr_id;
var status="nb";
var sql = `INSERT INTO product (name,description,photos,contact,prices,reviews,location,usr_id,status) VALUES ("${name}", "${desc}", "${photo}", "${contact}","${price}","${review}","${location}","${usr_id}","${status}");`
connection.query(sql, function(err, result) {
  if (err) throw err;
  console.log('record inserted');
  res.redirect('/#recordinserted=true');

});
});

//multer 
const storage3 = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'images')
  },
  filename:(req,file,cb)=>
  {
    cb(null,Date.now() + path.extname(file.originalname));
  }
});
const upload3=multer({storage:storage3})
//addto
app.post('/addto',upload3.single('photos'),function(req, res, next) {
  console.log("hello");
  var name = req.body.name;
  var desc = req.body.desc;
  var cat=req.body.category;
  var photo = req.file.filename;
  var contact = req.body.contact;
  var price=req.body.price;
  var review=req.body.review;
  var timings=req.body.timings;
  var location=req.body.location;
  var usr_id=req.body.usr_id;
  var sql = `INSERT INTO `+ cat +` (name,description,photos,contact,prices,reviews,timings,location,usr_id) VALUES ("${name}", "${desc}", "${photo}", "${contact}","${price}","${review}","${timings}","${location}","${usr_id}");`
  connection.query(sql, function(err, result) {
    if (err) throw err;
    console.log('record inserted');
    res.redirect('/#recordinserted=true');
  
  });
  });

//deletefrom
app.post('/deletefrom',function(req, res, next) {
  console.log("hello");
var category = req.body.category;
var usr_id=req.body.usr_id;
req.session.cat=category;
console.log(req.session.cat);
var sql = `SELECT * FROM ` + category + ` where usr_id=`+usr_id;
connection.query(sql, function(err,data, result) {
  if (err) throw err;
  res.render('deleteitem', { title: 'list', listDesc: data,loggedin:req.session.loggedin,category:req.session.cat});
});
});

//deleteitem
app.post('/deleteditem',function(req, res, next) {
  console.log("hello");
var item = req.body.item;
var item1=item.split(" ").join("");
console.log(item1);
var cat=req.body.cat;
var usr_id=req.session.usrid;
var sql = `DELETE FROM ` + cat + ` where name= ` + ` '`+ item1 +`'` +  ` AND usr_id= ` + usr_id;
connection.query(sql, function(err,data, result) {
  if (err) throw err;
  res.redirect('/userfunction#deleteditem=true');
});
});

//paymentinsert
app.post('/paymentinsert', function(req, res, next) {
  console.log("hello");
var trans_id = req.body.pay_id;
var u_id = req.body.usr_id;
var status="incomplete";
var p_id=req.body.p_id;
var prices=req.body.price;
console.log(trans_id);
console.log(u_id);
console.log(p_id);
console.log(prices);

var sql = `INSERT INTO payments (trans_id,date,amt,usr_id,status,p_id) VALUES ("${trans_id}",NOW(), "${prices}", "${u_id}","${status}","${p_id}");`
connection.query(sql, function(err, result) {
  if (err) throw err;
  console.log('record inserted');
  //req.flash('success', 'Data added successfully!');
  res.redirect('/#payment=true');
});
});

//updatepass
app.post('/updatepass', function(req, res, next) {
var pass = req.body.password;
var u_id = req.body.usr_id;
console.log(pass);
console.log(u_id);

var sql = `UPDATE users set password = ` + ` MD5('`+ pass +`')` +  `  where u_id=`+u_id;

connection.query(sql, function(err, result) {
  if (err) throw err;
  console.log('record inserted');
  //req.flash('success', 'Data added successfully!');
  res.redirect('/userfunction#updatedpass');
});
});

//updatefrom
app.post('/updatefrom',function(req, res, next) {
  console.log("hello");
var category = req.body.category;
var usr_id=req.body.usr_id;
req.session.cat=category;
console.log(req.session.cat);
var sql = `SELECT * FROM ` + category + ` where usr_id=`+usr_id;
connection.query(sql, function(err,data, result) {
  if (err) throw err;
  res.render('itemupdate', { title: 'list', listDesc: data,loggedin:req.session.loggedin,category:req.session.cat});
});
});

 //finalupdate
app.post('/finalupdate',function(req, res, next) {
  console.log("hello");
var category = req.body.category;
var u_id=req.session.usrid;
var item=req.body.item;
var name= req.body.name;
var desc=req.body.desc;
var contact=req.body.contact;
var prices=req.body.price;
var review=req.body.review;
var location=req.body.location;
var timings=req.body.timings;
console.log(category);
// update category set name='name',desc='desc',contact='contact',prices='prices',review='review',location='location',timings='timings where name='item' and u_id=u_id';
var sql = `update `+category+` set name=`+`'`+name+`'`+`,description=`+`'`+desc+`'`+`,contact=`+`'`+contact+`'`+`,prices=`+`'`+prices+`'`+`,reviews=`+`'`+review+`'`+`,location=`+`'`+location+`'`+`,timings=`+`'`+timings+`'`+` where name=`+`'`+item+`'`+`and usr_id= `+u_id;
console.log(sql);
connection.query(sql, function(err,data, result) {
  if (err) throw err;
  res.redirect('/#updateditem=true');
});
});

 //updatedform
 app.post('/updateform',function(req, res, next) {
  console.log("hello");
var category = req.body.cat;
var usr_id=req.session.usrid;
var item=req.body.item;
req.session.item=item;
console.log(category);
var sql =`Select * from `+category+` where name=`+`'`+item+`'`+`and usr_id= `+usr_id;
connection.query(sql, function(err,data, result) {
  if (err) throw err;
  res.render('updateform',{ title: 'list', listDesc: data,loggedin:req.session.loggedin,category:req.session.cat,item:req.session.item,usr_id:req.session.usrid});
});
});

//otp generation
app.post('/otp',function(req, res, next) {
  console.log("hello");
  if (req.body.email) {
    //   create new otp
    var otp = Math.floor(100000 + Math.random() * 900000);
    // save otp in database
    var query = `INSERT INTO otp(email,otp,date) VALUES ('${req.body.email}',${otp},NOW());`;
    connection.query(query, function (err, data, result) {
      if (err) throw err;
     sendEmail(req.body.email,"OTP","Generated Otp is:-"+otp,null,null);
     res.render('otppage',{email:req.body.email});
    });
  }
});
//newpass
app.post('/newpass',function(req, res, next) {
  console.log("hello");
  if (req.body.otp && req.body.email && req.body.pass) {
    //select current otp from database
    connection.query(
      "SELECT otp FROM otp WHERE email=? ORDER BY date DESC",
      [req.body.email],
      (err, rows, fields) => {
        console.log(rows);
        //compare current otp with provided otp
        if (rows[0].otp == req.body.otp) {
          connection.query(
            `UPDATE users set password = ` + ` MD5('`+ req.body.pass +`')` +  `  where email=`+`'`+req.body.email+`'`,
            function(err,data, result) {
              if (err) throw err;
              res.redirect('/#changedpass=true');
            })
          }}
    )}
});

//profileform
app.post('/profileform',function(req, res, next) {
  console.log("hello");
var name = req.body.name;
var phone=req.body.phone;
var email=req.body.email;
var address= req.body.address;
var rm=req.body.rm;
var usr_id=req.body.usr_id;
var sql = `update users set name =`+`"`+name+`"`+`,phone=`+phone+`,email =`+`"`+email+`"`+`,address=`+`"`+address+`"`+',roomate='+`"`+rm+`"`+`where u_id=`+usr_id;
console.log(sql);
connection.query(sql, function(err,data, result) {
  if (err) throw err;
  res.redirect('/#updateditem=true');
});
});
// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals = err;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // // render the error page
  // res.status(err.status || 500);
  // res.render('error');
});
app.listen('3001', () => {
  console.log('Server started on port 3001');
});
module.exports = app;

var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose  = require('mongoose');
var querystring = require('querystring');

//클라이언트 입력값(기준값,변동값)
var eval1,eval2,eval3,eval4,eval5;
var range1,range2,range3,range4,range5;


// TCP
var net = require('net');
var discon = 0;

var server = net.createServer(function (socket) {
  console.log(socket.address().address+"connected");
  //client로 부터 오는 data 출력
  socket.on('data',function (data) {
    //문자열 추출
    //console.log(data);
    var a= ""+data;
    var datanumber1 = a.indexOf(",");
    //console.log(datanumber);
    var c = a.substring(0,datanumber1);// 1번째 data
    var d = a.substring(datanumber1+1);
    var datanumber2 = d.indexOf(",");
    var d1 = d.substring(0,datanumber2);// 2번째 data
    var e = d.substring(datanumber2+1);
    var datanumber3 = e.indexOf(",");
    var e1 = e.substring(0,datanumber3);// 3번째 data
    var f = e.substring(datanumber3+1);
    var datanumber4 = f.indexOf(",");
    var f1 = f.substring(0,datanumber4);// 4번째 data
    var g = f.substring(datanumber4+1);// 5번째 data

/*
    console.log(c);
    console.log(d);
    console.log(d1);
    console.log(e);
    console.log(e1);
    console.log(f);
    console.log(f1);
    console.log(g);
*/

    var data2 = c-0;
    var data3 = d1-0;
    var data4 = e1-0;
    var data5 = f1-0;
    var data6 = g-0;


      data_1= data2;
      data_2= data3;
      data_3= data4;
      data_4= data5;
      data_5= data6;
 	//console.log("연결이 끊긴 횟수: "+discon);
    console.log("Data1: "+data_1+", Data2: "+data_2+", Data3: "+data_3+", Data4: "+data_4+", Data5: "+data_5);


    //console.log(data3);
    io.emit('chat message',data_1,data_2,data_3,data_4,data_5,discon,eval1,eval2,eval3,eval4,eval5,range1,range2,range3,range4,range5);

  });





  //client와 접속이 끊겻을때
  socket.on('close',function () {

    discon+=1;
   // console.log("연결이 끊긴 횟수: "+discon);
    console.log('client disconnected');
  });
  //client 가 접속 했을때
  socket.write('welcome to TCP server');

});

// 에러처리
server.on('error',function (err) {
  console.log('err'+err);
});

//port 11111로 연결 대기
server.listen(11111,function () {
  console.log('TCP listening on 11111');
});



//http server
var http = require('http').Server(app);
var io = require('socket.io')(http);

// 클라이언트로부터 받아온 정보




io.on('connection',function (socket) {
  socket.on('log1',function (accdata1,status) {
    var log1 = new Push1({
      bnum:1,
      gnum:1,
      status:status,
      beacon:accdata1

    });
    console.log("1번 비콘 경고 받음");
    console.log(accdata1,status);
  log1.save(function (err,log1) {
      console.log(log1);
  });
  });
  socket.on('log2',function (accdata2,status) {
    var log2 = new Push2({
      bnum:2,
      gnum:1,
      status:status,
      beacon:accdata2

    });
    console.log("2번 비콘 경고 받음");
    console.log(accdata2,status);
    log2.save(function (err,log2) {
        console.log(log2);
    });
  });
  socket.on('log3',function (accdata3,status) {
    var log3 = new Push3({
      bnum:3,
      gnum:1,
      status:status,
      beacon:accdata3

    });
    console.log("3번 비콘 경고 받음");
    console.log(accdata3,status);
    log3.save(function (err,log3) {
        console.log(log3);
    });
  });
  socket.on('log4',function (accdata4,status) {
    var log4 = new Push4({
      bnum:4,
      gnum:1,
      status:status,
      beacon:accdata4

    });
    console.log("4번 비콘 경고 받음");
    console.log(accdata4,status);
    log4.save(function (err,log4) {
        console.log(log4);
    });
  });
  socket.on('log5',function (accdata5,status) {
    var log5 = new Push5({
      bnum:5,
      gnum:1,
      status:status,
      beacon:accdata5

    });
    console.log("5번 비콘 경고 받음");
    console.log(accdata5,status);
    log5.save(function (err,log5) {
        console.log(log5);
    });
  });

});


mongoose.connect("mongodb://test:test@ds023664.mlab.com:23664/roadtest");
var db = mongoose.connection;
db.once("open",function () {
  console.log("DB connected");
});
db.on("error",function (err) {
  console.log("DB ERROR: ",err);
});

//model setting
var dataSchema1 = mongoose.Schema({
  gnum:{type:String},
  bnum:{type:String},
  beacon:{type:String},
  status:{type:String},
  createdAt:{type:Date,default:Date.now},
});
var dataSchema2 = mongoose.Schema({
  gnum:{type:String},
  bnum:{type:String},
  beacon:{type:String},
  status:{type:String},
  createdAt:{type:Date,default:Date.now},
});
var dataSchema3 = mongoose.Schema({
  gnum:{type:String},
  bnum:{type:String},
  beacon:{type:String},
  status:{type:String},
  createdAt:{type:Date,default:Date.now},
});
var dataSchema4 = mongoose.Schema({
  gnum:{type:String},
  bnum:{type:String},
  beacon:{type:String},
  status:{type:String},
  createdAt:{type:Date,default:Date.now},
});
var dataSchema5 = mongoose.Schema({
  gnum:{type:String},
  bnum:{type:String},
  beacon:{type:String},
  status:{type:String},
  createdAt:{type:Date,default:Date.now},
});
var Push1 = mongoose.model('push1',dataSchema1);
var Push2 = mongoose.model('push2',dataSchema2);
var Push3 = mongoose.model('push3',dataSchema3);
var Push4 = mongoose.model('push4',dataSchema4);
var Push5 = mongoose.model('push5',dataSchema5);



//var pushdata = [];

// view engine setup
app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/*
app.get('/',function(req,res){
    res.sendFile(__dirname +'/index.html');
});
*/





app.get('/',function (req,res) {
  res.render('index');
});
app.get('/realtimechart-1',function (req,res) {
  Push1.find({}).sort('-createdAt').exec(function (err, push1) {
        if (err) return res.json({success: false, message: err});
        res.render("realtimechart-1", {data: push1});
    });
});
app.get('/realtimechart-2',function (req,res) {
  Push2.find({}).sort('-createdAt').exec(function (err, push2) {
        if (err) return res.json({success: false, message: err});
        res.render("realtimechart-2", {data: push2});
    });
});
app.get('/realtimechart-3',function (req,res) {
  Push3.find({}).sort('-createdAt').exec(function (err, push3) {
        if (err) return res.json({success: false, message: err});
        res.render("realtimechart-3", {data: push3});
    });
});
app.get('/realtimechart-4',function (req,res) {
  Push4.find({}).sort('-createdAt').exec(function (err, push4) {
        if (err) return res.json({success: false, message: err});
        res.render("realtimechart-4", {data: push4});
    });
});
app.get('/realtimechart-5',function (req,res) {
  Push5.find({}).sort('-createdAt').exec(function (err, push5) {
        if (err) return res.json({success: false, message: err});
        res.render("realtimechart-5", {data: push5});
    });
});
app.post('/realtimechart-1',function (req,res) {
    eval1=req.body.ruleid;
    range1=req.body.rangeid;
    console.log("1번기준: "+eval1);
    console.log("1번범위: "+range1);
});
app.post('/realtimechart-2',function (req,res) {
    eval2=req.body.ruleid;
    range2=req.body.rangeid;
    console.log("2번기준: "+eval2);
    console.log("2번범위: "+range2);

});
app.post('/realtimechart-3',function (req,res) {
    eval3=req.body.ruleid;
    range3=req.body.rangeid;
    console.log("3번기준: "+eval3);
    console.log("3번범위: "+range3);

});
app.post('/realtimechart-4',function (req,res) {
    eval4=req.body.ruleid;
    range4=req.body.rangeid;
    console.log("4번기준: "+eval4);
    console.log("4번범위: "+range4);

});
app.post('/realtimechart-5',function (req,res) {
    eval5=req.body.ruleid;
    range5=req.body.rangeid;
    console.log("5번기준: "+eval5);
    console.log("5번범위: "+range5);

});
app.get('/datatable',function (req,res) {
  res.render('datatable');
});
app.get('/manual',function (req,res) {
  res.render('manual');
});

/*
app.post('/realtimechart',function (req,res) {
  var data2 = req.body.data2;
  console.log(data2);
  Push.create(req.body.push,function (err,data) {
    console.log(req.body.push);
    io.emit('chat message',data2);
    res.json({success:true,data:data2});
  });

});
*/

http.listen(80,function(){
    console.log('listening at 80');
});

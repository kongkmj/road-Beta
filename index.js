var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose  = require('mongoose');
var querystring = require('querystring');


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
    var datanumber = a.indexOf(",");
    //console.log(datanumber);
    var c = a.substring(0,datanumber);
    var b = a.substring(datanumber+1);
    //console.log(c);
   // console.log(b);
    var data2 = c-0;
    var data3 = b-0;


      data4= data2;
      data5= data3;
 	console.log("연결이 끊긴 횟수: "+discon);
    console.log("Data1: "+data4+", Data2: "+data5);
    //console.log(data3);
    io.emit('chat message',data4,data5,discon);
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

mongoose.connect("mongodb://172.31.4.15:27017");
var db = mongoose.connection;
db.once("open",function () {
  console.log("DB connected");
});
db.on("error",function (err) {
  console.log("DB ERROR: ",err);
});

//model setting
var dataSchema = mongoose.Schema({
  data:{type:String},
  createdAt:{type:Date,default:Date.now},
});
var Push = mongoose.model('push',dataSchema);

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
app.get('/realtimechart',function (req,res) {
  res.render('realtimechart');
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

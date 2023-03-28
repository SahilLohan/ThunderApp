const express=require("express");
const app=express();
app.set('view engine', 'ejs');
const http=require("http");
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res){
  var city = req.body.CityName;
  var url = "http://api.openweathermap.org/data/2.5/weather?q="+city+"&APPID=73deb23c69a25cdec616e4ddca85a483";
  http.get(url,function(ApiResponse){
    ApiResponse.on("data",function(data){
      console.log(JSON.parse(data));
      var mainData=JSON.parse(data);
      if(mainData.cod==200)
      {
        res.render('success.ejs',{
          mainData:mainData,
          City:mainData.name,
          longitude:mainData.coord.lon,
          latitude:mainData.coord.lat,
          desc:mainData.weather[0].description,
          temperature:mainData.main.temp+ " kelvin",
          humi:mainData.main.humidity,
          press:mainData.main.pressure
        });
      }
      else{
        image = "https://httpstatusdogs.com/img/"+mainData.cod+".jpg";
        res.render('success.ejs',{
          mainData:mainData,
          source: image
        });
      }
    })
  })
})

app.listen(3000,function(){
  console.log("Server started ... Listening to 3000 port");
})

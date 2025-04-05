const express=require("express");
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const cors=require("cors");
dotenv.config();
const admin=require("firebase-admin");
const serviceAccount=require("./pathTo/final-capstone-62f76-firebase-adminsdk-6nkks-2e9668331b.json");

admin.initializeApp(
  {
    credential:admin.credential.cert(serviceAccount),
    databaseURL:process.env.FIREBASE_DATABASEURL
  }
)
const db=admin.database();
const ref=db.ref("sensors");


const port=process.env.PORT;
const DB_STRING=process.env.DB_STRING;
const DB_USER=process.env.DB_USER;
const DB_PASSWORD=process.env.DB_PASSWORD;

mongoose.connect(DB_STRING.replace("<user>",DB_USER).replace("<password>",DB_PASSWORD))
.then(()=>{
    console.log("connected to database");
}).catch((err)=>{
    console.log(`connection to database failed ${err}`);
});



const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
  origin:process.env.CORS_ORIGIN
}))

const co2_sensor_model=require("./models/co2_sensor_model");
const dht_humidity_sensor_model=require("./models/dht_humidity_sensor_model");
const dht_temp_sensor_model=require("./models/dht_temp_sensor_model");
const ec_sensor_model=require("./models/ec_sensor_model");
const h2o_temp_sensor_model=require("./models/h2o_temp_sensor_model");
const ldr_analog_sensor_model=require("./models/ldr_analog_model");
const light_intensity_bh1750_sensor_model=require("./models/light_intensity_bh1750_model");
const light_intensity_tsl2591_sensor_model=require("./models/light_intensity_tsl2591_model");
const o2_sensor_model=require("./models/o2_sensor_model");
const ph_sensor_model=require("./models/ph_sensor_model");
const pressure_sensor_model=require("./models/pressure_sensor_model");
const tds_sensor_model=require("./models/tds_sensor_model");
 

const saveDataToMongoDB=async function(model,firebaseRTDBPath,time)
{
  // if(firebaseRTDBPath==="ph_sensor"){
  //   console.log(`starts at ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`);
  // }
  const sensorRef=ref.child(firebaseRTDBPath);
  const snapshot=await sensorRef.once('value');
  const dataObj=await snapshot.val();
  const newValue=dataObj.value;
  if(newValue)
  {
    const doc=new model({
      value:newValue,
      current_time:time
    });
    await doc.save();
    // if(firebaseRTDBPath==="ph_sensor"){
    //   time=new Date();
    //   console.log(`ends at ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`);
    // }
  }
}
const sensors=['ph_sensor',"tds_sensor","h2o_temp_sensor","ec_sensor","ldr_analog","light_intensity_bh1750","light_intensity_tsl2591",
    "co2_sensor","o2_sensor","pressure_sensor","dht_temp_sensor","dht_humidity_sensor"
  ];
const sensorModelMap = new Map([
    ['ph_sensor', ph_sensor_model],
    ['tds_sensor', tds_sensor_model],
    ['h2o_temp_sensor', h2o_temp_sensor_model],
    ['ec_sensor', ec_sensor_model],
    ['ldr_analog', ldr_analog_sensor_model],
    ['light_intensity_bh1750', light_intensity_bh1750_sensor_model],
    ['light_intensity_tsl2591', light_intensity_tsl2591_sensor_model],
    ['co2_sensor', co2_sensor_model],
    ['o2_sensor', o2_sensor_model],
    ['pressure_sensor', pressure_sensor_model],
    ['dht_temp_sensor', dht_temp_sensor_model],
    ['dht_humidity_sensor', dht_humidity_sensor_model]
  ]);
  

setInterval(async function() {
  let time=new Date();
  sensors.forEach((sensor) => {saveDataToMongoDB(sensorModelMap.get(sensor), sensor,time);});
}, process.env.TIME_INTERVAL_FOR_SAVE);
app.get("/test",(req,res)=>{
  res.status(200).json(
    {
      "msg":"working fine",
      "status":"success"
    }
  );
});
// app.get()//get models
app.post("/:sensor/gethistoricaldata",async function(req,res)
{
  const {startDate,endDate}=req.body;
  const {sensor}=req.params;
  const start = new Date(startDate);
  const end = new Date(endDate);
  // startDate = new Date(startDate.toISOString());
  // endDate = new Date(endDate.toISOString());
  if(!sensorModelMap.has(sensor)){
    res.status(401).json({
      "msg":"failed: Model corresponding to sensor not found",
      "obj":[]
    })
  }
  const arrObj=await sensorModelMap.get(sensor).find({current_time:{$gte:start,$lte:end}}).sort({current_time:-1});
  res.status(200).json({
    "msg":"successful",
    "obj":arrObj
  })
  // try{
  //   let ct=0;
  //   const data=await sensorModelMap.get(sensor).find().sort({"current_time":-1});
  //   console.log(data.length);
  //   const tempArr = [];
  //   for(let idx = 0; idx < data.length; idx++)
  //   {
  //     const obj = data[idx];
  //     const current = new Date(obj.current_time);
  //     const epochStart = start.getTime();
  //     const epochEnd = end.getTime();
  //     const epochCurrent = current.getTime();
  //     if(idx === 2819 || idx === 2820){
  //       console.log("-----------------------------------------",idx);
  //       console.log("epochStart : ",epochStart);
  //       console.log("epochEnd : ",epochEnd);
  //       console.log("epochCurrent : ",epochCurrent);
  //     }
      
  //     if(epochCurrent >= epochStart && epochCurrent <= epochEnd) 
  //     {
  //       console.log("Condition truth for idx : ",idx);
  //       tempArr.push(obj);
  //     }
  //   }
  //   // const arrObj = data.filter((obj, idx) => {
  //   //   const current = new Date(obj.current_time);
  //   //   if (idx < 5) {
  //   //     tempArr.push(obj)
  //   //     console.log("Start:", start, "End:", end, "Current:", current);
  //   //   }
  //   //   return current >= start && current <= end;
  //   // });
  //   console.log("tempArr : ",tempArr.length)
  //   res.status(200).json({
  //     msg: "successful",
  //     obj: tempArr
  //   })

  // }
  // catch(err)
  // {
  //   console.log("mongo error",err);
  //   res.status(500).json({
  //     "msg":"db fail"
  //   });
  // }



})


app.listen(port,()=>{
  console.log("storage-server started");
})
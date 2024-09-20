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
    databaseURL:"https://final-capstone-62f76-default-rtdb.asia-southeast1.firebasedatabase.app/"
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
  origin:"*"
}))

const Phmodel=require("./models/phmodel");
const Barometermodel=require('./models/barometricmodel');
const Tdsmodel=require('./models/tdsmodel');
const Temperaturemodel=require('./models/temperaturemodel');
const Oxygenmodel=require('./models/oxygenmodel');
const Co2model=require('./models/co2model');
const Ultrasonicmodel = require('./models/ultrasonicmodel');
const Ldrmodel=require('./models/ldrmodel');

const saveDataToMongoDB=async function(model,firebaseRTDBPath)
{
  const sensorRef=ref.child(firebaseRTDBPath);
  const snapshot=await sensorRef.once('value');
  const dataObj=await snapshot.val();
  const newValue=dataObj.value;
  if(newValue)
  {
    const doc=new model({
      value:newValue
    });
    await doc.save();
    //console.log(doc,"saved");
  }
}
const sensors=['ph-sensor','temperature-sensor','tds-sensor','ultrasonic-sensor'];
setInterval(async function() {
  sensors.forEach((sensor) => {
    switch (sensor) {
      case "ph-sensor":
        saveDataToMongoDB(Phmodel, sensor);
        break;
      case "temperature-sensor":
        saveDataToMongoDB(Temperaturemodel, sensor);
        break;
      case "tds-sensor":
        saveDataToMongoDB(Tdsmodel, sensor);
        break;
      case "ultrasonic-sensor":
        saveDataToMongoDB(Ultrasonicmodel, sensor);
        break;
      default:
        break;
    }
  });
}, 1000000);

//past data 
//from body read startDate and enddate and sensor-name
app.post("/:sensor/gethistoricaldata",async function(req,res)
{
  let{startDate,endDate}=req.body;
  startDate=new Date(startDate);
  endDate=new Date(endDate);
  const arrObj=await Phmodel.find({current_time:{$gte:startDate,$lte:endDate}}).sort({current_time:-1});
  res.status(200).json({
    "msg":"successful",
    "obj":arrObj
  })
})


app.listen(port,()=>{
  console.log("storage-server started");
})
import express from "express";
var app = express();


import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
import cors from "cors";
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date?", function (req, res) {
  const new_date = req.params.date;
  const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const days = ["Sun", "Mon", "Tues", "Wed", "Thr", "Fri", "Sat"];
  let dt = null;

  if(new_date){
    if(!isNaN(Date.parse(new_date))){
      dt = new Date(new_date)
    } else {
      if(!isNaN(new Date(Number(new_date)))){
        dt = new Date(Number(new_date));
      } else {
        res.json({error : "Invalid Date"});
        return;
      }
    }
  } else {
    dt = new Date();
  }
  const uxitTs = dt.getTime();
  const utcString = `${days[dt.getDay()]}, ${dt.getDate()} ${month[dt.getMonth()]} ${dt.getFullYear()} ${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()} GMT`;
  const data = {
    unix : uxitTs,
    utc : utcString
  };
  res.json(data);
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, () =>  {
  console.log('Your app is listening on port ' + listener.address().port);
});

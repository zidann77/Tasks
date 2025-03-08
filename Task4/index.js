const Express = require(express);
const app = express();

const {urlencoded , json} = require("body-parser");

const Port = 3000;
//app,use(express.urlencoded({extended : true}));
app,use(json());


let missions = [
    {
      id: 1,
      name: "Mission Alpha",
      astronauts: ["Astronaut 1", "Astronaut 2", "Astronaut 3"]
    },
    {
      id: 2,
      name: "Mission Beta",
      astronauts: ["Astronaut A", "Astronaut B"]
    },
    {
      id: 3,
      name: "Mission Gamma",
      astronauts: ["Astronaut X", "Astronaut Y", "Astronaut Z"]
    }
  ];


app.post("/mission" , (req,res) =>
    {
       console.log(req.body);
       const data = req.body;
       data.astronauts  = JSON.parse(data.astronauts);

       missions.push(data);
        res.send("Create Mission");
    }
    )

    
    app.get("/missions" , (req,res) =>
        {
            res.send(missions);
        }
        )

        
        app.get("/mission/id", (req , res) =>
            {

                const paramsID = req.params.id;

              for(let i =0 ; i<missions.length ; i++)
              {
                if(missions[i].id.toString() === paramsID)
                  res.send(missions[i]);
              }

                res.send("Mission Not Founded");
            }
            )

           


            app.put("/mission" , (req,res) =>
                {
                  const data = req.body;
                  data.astronauts  = JSON.parse(data.astronauts);


                  console.log(data);

                  for (let i = 0; i < missions.length; i++) {
                  if(missions[i].id === data.id)
                    res.send("Update the Mission")
                    
                  }
                  res.send("Mission is Not Found");
                }
                )

            app.delete("/mission/id" , (req,res) =>
                {
                  const paramsID=req.params.id;
                  for(let i =0 ; i<missions.length ; i++)
                    {
                      if(missions[i].id === paramsID)
                   missions  =  missions.filter((i) => i.id !== paramsID); // missions.splice(i,1);
                      res.send("Mission is Deleted");
                    }
                   res.send("Mission is Not Found");
                }
                )
                


app.listen(Port , () =>
{
    console.log("Server Running on Port"+Port );
}
)

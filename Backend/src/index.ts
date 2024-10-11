import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import morgan from "morgan";
import { countriesRouter } from "./Routes/countriesRoutes";
dotenv.config();
import cors from "cors";

const port: number = process.env.PORT ? parseInt(process.env.PORT) : 0;
const server = express();

//Middlewares
server.use(morgan("dev"));
server.use(cors()); //I will allow any to use the endpoint

//Ping, it works so i can now if the server is up.
server.get("/ping", (_req: Request, res: Response) => {
  res.send("Server pinged!");
});

//Redirect the routes in /countries
server.use("/countries", countriesRouter);

const start = (): void => {
  try {
    server.listen(port, () =>
      console.log(
        "----------------SERVER IS UP AT PORT " + port + "----------------"
      )
    );
  } catch (error) {
    console.log("An error had happen trying to connect the Server: ", error);
  }
};

start();

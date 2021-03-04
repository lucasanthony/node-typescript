import * as express from "express";
import * as cors from "cors";
import * as mongoose from "mongoose";
import "dotenv/config";

import routes from "./routes/routes";

class App {
  public express: express.Application;

  public constructor() {
    this.express = express();

    this.middlewares();
    this.database();
    this.routes();
  }

  private middlewares(): void {
    this.express.use(express.json());
    this.express.use(cors());
  }

  private database(): void {
    mongoose.set("useFindAndModify", false);
    mongoose.connection.on("connected", () => {
      console.log("Conectado com o banco de dados!");
    });

    mongoose.connection.on("error", (err) => {
      console.log("Erro na conexão com o banco de dados: " + err);
    });

    mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      poolSize: 5,
      useUnifiedTopology: true
    });

    mongoose;
  }

  private routes(): void {
    this.express.use(routes);
  }
}

export default new App().express;

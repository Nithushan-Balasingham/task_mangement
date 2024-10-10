import {Sequelize} from "sequelize"
import { createUserModel } from "../model/userSchema.js";
import { createTaskModel } from "../model/taskSchema.js";
import dotenv from 'dotenv';
  dotenv.config();

  const db = process.env.DB_NAME
  const dbUser = process.env.DB_USER
  const dbPassword = process.env.DB_PASSWORD

  console.log(db, dbUser, dbPassword)

const sequelize = new Sequelize(db, dbUser, dbPassword, {
    host: 'localhost',
    dialect: 'postgres'
  });


  let UserModel=null;
  let TaskModel=null;

  const connection = async()=>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        UserModel = await createUserModel(sequelize);
        TaskModel = await createTaskModel(sequelize);

        UserModel.hasMany(TaskModel, {
          foreignKey: 'userId',
          as: 'tasks' 
      });

      TaskModel.belongsTo(UserModel, {
          foreignKey: 'userId',
          as: 'user' 
      });
        await sequelize.sync();
        console.log("Synced")
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
  }


  export {
    connection,
    UserModel,
    TaskModel
  }
import { CustomRequestHandler } from "../db/customRequestHandler";
import * as model from '../model/users';
import uuid = require("uuid");
import * as bcrypt from "bcrypt-nodejs";
import { db, pgp } from '../db/conf';
import { setPassword } from "./setPassword";

export const apiRegisterUser: CustomRequestHandler = (req, res, next) => {
    const newUser: model.users = {
        id: uuid(),
        username: req.body.username,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password
    }
   newUser.password = setPassword(newUser.password);
   db.none(pgp.helpers.insert(newUser, undefined, "users")).then(() => {
       req.users = newUser;
       res.json("User " + newUser.username + " was registered!");
   })
};
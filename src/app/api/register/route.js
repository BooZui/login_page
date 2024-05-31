import { User } from "../../../models/User";
import bcrypt from "bcrypt";
import { initMongoose } from "../../../libs/mongoose";

export async function POST(req) {
  initMongoose();
  const body = await req.json();
  const password = body.password;


  if(!password?.length || password.length < 5) {
    new Error("password must be at least 5 characters")
  }

  const noHashedPassword = password;
  const salt = bcrypt.genSaltSync(10);
  body.password = bcrypt.hashSync(noHashedPassword, salt);
  
  const createdUser = await User.create({
    name: body.name,
    email: body.email,
    password: body.password,
  });
  
  return Response.json(createdUser);
}
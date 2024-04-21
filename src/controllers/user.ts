import { Request, Response } from "express"
import bcrypt from "bcrypt"
import { successResponse, errorResponse, handleError } from "../utilites/utils/responses"
import models from "../model"
import { validateSignIn, validateSignUp } from "../utilites/validations/user"
import jwtHelper from "../utilites/utils/jwt"

const { generateToken } = jwtHelper;

export const createUser = async (req: Request, res: Response) => {
    try {
      const {value,error} = validateSignUp(req.body);
      if (error) {
        return errorResponse(res, 400, error.message);
      }
      const {email,password} = value;
      const existingEmail = await models.User.findOne({where: {email }});
      if (existingEmail) {
        return errorResponse(res, 409, "This email has been registered by another user.");
      }
      const passwordHash = await bcrypt.hash(password, 10);
      const user = await models.User.create({
        email, password: passwordHash
      });
      return successResponse(res, 201, "User created successfully!", user);
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error.");
    }
  };
  export const login = async(req: Request, res: Response) =>{
    try {
      const {value, error} = validateSignIn(req.body);
      if (error) {
        return errorResponse(res, 400, error.message);
      }
      const { email, password} = value;
      const user = await models.User.findOne({where: {email} });
      if (!user) return errorResponse(res, 404, "email not found");
      const validpass = await bcrypt.compare(password, user.password);
      if (!validpass) return errorResponse(res, 404, "Password is not correct!.");
      const token = await generateToken({ id: user.id, email });
      const userDetails = {
        id: user.id, email
      };
      return successResponse(res, 200, "Logged in successfully", { userDetails, token});
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error.");
    }
  }
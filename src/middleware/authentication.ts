import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import models from "../model";
import config from "../config";
import { errorResponse, handleError } from "../utilites/utils/responses";

const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.headers && req.headers.authorization) {
      const parts = req.headers.authorization.split(" ");
      if (parts.length === 2) {
        const scheme = parts[0];
        const credentials = parts[1];
        if (/^Bearer$/i.test(scheme)) {
          const decodeToken = jwt.verify(credentials, config.JWT_SECRET) as { id: string };
          const user = await models.User.findOne({where: {id: decodeToken.id}});
          if (!user) return errorResponse(res, 404, "User account not found");
          req.user = user;
          return next();
        }
      } else {
        return errorResponse(res, 401, "Invalid Authorization format");
      }
    } else {
      return errorResponse(res, 401, "Authorization not found");
    }
  } catch (error) {
    handleError(error, req);
    return errorResponse(res, 500, (error as Error).message);
  }
};

export  default verifyUser

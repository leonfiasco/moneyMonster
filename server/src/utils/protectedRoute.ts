// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";
// import CustomError from "../errors/CustomError";

// const authorize = (roles: string[]) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     const token = req.header("Authorization")?.replace("Bearer ", "");
//     if (!token) {
//       throw new CustomError("No token provided.", 401);
//     }

//     try {
//       const decoded = jwt.verify(token, process.env.JWT_KEY) as {
//         id: string;
//         role: string;
//       };
//       if (!roles.includes(decoded.role)) {
//         throw new CustomError("Forbidden", 403);
//       }
//       req.user = decoded;
//       next();
//     } catch (err) {
//       throw new CustomError("Invalid token.", 401);
//     }
//   };
// };

// export default authorize;

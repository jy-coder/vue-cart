import { Request, Response, NextFunction } from "express";

type AsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

// const asyncHandler =
//   (fn: AsyncHandler) => (req: Request, res: Response, next: NextFunction) => {
//     fn(req, res, next).catch(next);
//   };
const asyncHandler =
  (fn: AsyncHandler) => (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((error) => {
      console.error("Error in async route handler:", error);
      next(error);
    });
  };
export default asyncHandler;

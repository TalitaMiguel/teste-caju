import { Request, Response } from "express";

const connectionTest = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).send({ message: "Successfully connected" });
  } catch (error: any) {
    console.log(error.message);
    res.status(res.statusCode || 500).send("Unexpected error");
  }
};

export default connectionTest;

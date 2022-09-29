import { Request, Response } from "express";
import CreateCourseServer from "./CreateCourseServer";

interface CourseProps {
  name: string;
  duration?: number;
  educator: string;
}

export function createCourse(req: Request<CourseProps>, res: Response) {
  const { name, duration, educator } = req.body;

  CreateCourseServer.execute({ name, duration, educator });
}

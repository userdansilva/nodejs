interface CourseProps {
  name: string;
  duration?: number;
  educator: string;
}

class CreateCourseServer {
  execute({ name, duration = 4, educator }: CourseProps) {
    console.log(name, duration, educator);
  }
}

export default new CreateCourseServer();

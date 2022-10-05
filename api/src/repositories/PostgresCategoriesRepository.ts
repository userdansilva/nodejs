import { Category } from "../model/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "./ICategoriesRepository";

class PostgresCategoryRepository implements ICategoriesRepository {
  create(data: ICreateCategoryDTO): void {
    console.log(data);
    return null;
  }

  list(): Category[] {
    return null;
  }

  findByName(name: string): Category {
    console.log(name);
    return null;
  }
}

export { PostgresCategoryRepository };

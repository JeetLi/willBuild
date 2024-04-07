import { ROUTES } from "../models/constant";
import { CategoryState, CategoryTypes } from "../models/types";
import { findCategoryById } from "./category";
type Bradscub = {
  id: number;
  link?: string;
  name: string;
  active?: boolean;
};

export const generateBradscubs = (
  state: CategoryState,
  categoryId: number,
  productName?: string
): Bradscub[] => {
  const bradscubs: Bradscub[] = [
    {
      id: 1,
      link: ROUTES.main,
      name: "Главная страница",
    },
    {
      id: 2,
      link: ROUTES.catalog,
      name: "Каталог стройматериалов",
    },
  ];
  const getParentCategories = (
    categories: CategoryTypes[],
    currentCategoryId: number
  ): CategoryTypes[] => {
    const parentCategories: CategoryTypes[] = [];
    const findParentCategory = (
      categories: CategoryTypes[],
      categoryId: number
    ): CategoryTypes | undefined => {
      for (const category of categories) {
        if (category.subCategories?.some((sub) => sub.id === categoryId)) {
          return category;
        }
        const found = findParentCategory(
          category.subCategories || [],
          categoryId
        );
        if (found) {
          return found;
        }
      }
      return undefined;
    };

    let currentCategory = findCategoryById(categories, currentCategoryId);
    while (currentCategory) {
      parentCategories.unshift(currentCategory);
      const parent = findParentCategory(categories, currentCategory.id);
      currentCategory = parent;
    }

    return parentCategories;
  };
  const parentCategories = getParentCategories(state.categories, categoryId);
  parentCategories.forEach((category, index) => {
    bradscubs.push({
      id: category.id,
      link: `${ROUTES.catalog}/${category.id}`,
      name: category.name,
      active: index === parentCategories.length - 1,
    });
  });

  const currentCategory = findCategoryById(state.categories, categoryId);
  if (
    currentCategory &&
    parentCategories.length > 0 &&
    currentCategory.id !== parentCategories[parentCategories.length - 1].id
  ) {
    bradscubs.push({
      id: currentCategory.id,
      name: currentCategory.name,
      active: true,
    });
  }
  if (productName) {
    bradscubs.push({
      id: bradscubs.length + 1,
      name: productName,
      active: true,
    });
  }
  return bradscubs;
};

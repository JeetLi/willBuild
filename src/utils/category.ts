interface Category {
  id: number;
  name: string;
  subCategories?: Category[];
}

interface CategoryPathItem {
  id: number;
  name: string;
}

export function findCategoryById(
  root: Category[],
  id: number
): Category | undefined {
  const queue: Category[] = [];

  queue.push(...root);

  while (queue.length > 0) {
    const node = queue.shift();
    if (node && node.id === id) return node;

    if (node && node.subCategories && node.subCategories.length > 0) {
      queue.push(...node.subCategories);
    }
  }

  return undefined;
}



export function findCategoryIdWithPath(
  tree: Category,
  id: number,
  path: CategoryPathItem[] = []
): CategoryPathItem[] | null {
  if (tree.id && tree.name) {
    path.push({ id: tree.id, name: tree.name });
  }

  if (tree.id === id) return path;

  if (tree.subCategories) {
    for (let i = 0; i < tree.subCategories.length; i++) {
      const child = tree.subCategories[i];
      const result = findCategoryIdWithPath(child, id, [...path]);

      if (result) return result;
    }
  }

  path.pop();

  return null;
}

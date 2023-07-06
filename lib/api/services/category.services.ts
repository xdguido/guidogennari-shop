import type { CategoryNode } from '@lib/types';
import { categoryProvider } from '../providers';

const getOne = async (categorySlug: string): Promise<CategoryNode> => {
    return await categoryProvider.getOne(categorySlug);
};

const getBranch = async (node: CategoryNode): Promise<CategoryNode[]> => {
    const childCategories: CategoryNode[] = [node];

    const getChilds = async (node: CategoryNode): Promise<void> => {
        if (node.children.length > 0) {
            for (const child of node.children) {
                const childNode = await categoryProvider.getOne(child.slug);
                childCategories.push(childNode);
                await getChilds(childNode);
            }
        }
    };

    await getChilds(node);
    return childCategories;
};

const getTree = async (): Promise<CategoryNode[]> => {
    const root = await categoryProvider.getRoot();
    const primaryNodesPromises = root.children.map((category) => getOne(category.slug));
    const primaryNodes = await Promise.all(primaryNodesPromises);
    // const treePromises = primaryNodes.map((category) => getBranch(category));
    // const tree = await Promise.all(treePromises);
    return primaryNodes;
};

const categoryServices = { getOne, getBranch, getTree };
export default categoryServices;

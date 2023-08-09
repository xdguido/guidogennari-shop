/* eslint-disable react/prop-types */
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
// import { SWRConfig, unstable_serialize } from 'swr';
import Layout from '~/components/Layout';
import Products from '~/components/Products';
import CategoryProvider from '~/lib/store/CategoryContext';
import { CategoryNode, SortOption } from '~/types';
import { productServices, categoryServices } from '~/lib/api/services';

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
    // `getStaticProps` is executed on the server side.
    const page = Number(params?.page) || 1;
    const sort = params?.sort || SortOption.CreatedAtDesc;
    const category = params?.category || 'all-products';
    let parentCategory: CategoryNode;

    if (page === 1) {
        return {
            redirect: {
                destination: `/products/${category}/${sort}`,
                permanent: false
            }
        };
    }
    if (!Object.values(SortOption).includes(sort as SortOption)) {
        return {
            notFound: true
        };
    }

    const takeNumber = 12;

    const data = await productServices.getFiltered(
        takeNumber,
        page,
        sort as SortOption,
        category as string
    );

    if (data?.count === 0) {
        return {
            notFound: true
        };
    }

    if (data?.categoryNode.children.length === 0) {
        parentCategory = await categoryServices.getOne(data.categoryNode.parent.slug);
    }

    const categoryTree = await categoryServices.getTree();

    return {
        props: {
            data: JSON.parse(JSON.stringify(data)),
            sort,
            page,
            category,
            parentCategory: parentCategory ? JSON.parse(JSON.stringify(parentCategory)) : null,
            categoryData: JSON.parse(JSON.stringify(categoryTree))
        },
        revalidate: 60 * 60 * 24
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        // Other pages will be prerendered at runtime.
        paths: Array.from({ length: 2 }).map((_, i) => ({
            params: {
                category: 'all-products',
                sort: SortOption.CreatedAtDesc,
                page: '' + (i + 2)
            }
        })),
        // Block the request for non-generated pages and cache them in the background
        fallback: 'blocking'
    };
};

export default function Page({ data, sort, page, category, parentCategory, categoryData }) {
    return (
        <CategoryProvider data={categoryData}>
            <Layout>
                <Products
                    data={data}
                    page={page}
                    sort={sort}
                    parentCategory={parentCategory}
                    categorySlug={category}
                />
            </Layout>
        </CategoryProvider>
    );
}

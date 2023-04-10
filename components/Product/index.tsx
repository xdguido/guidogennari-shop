/* eslint-disable react/prop-types */
import useSwr from 'swr';
import fetcher from '@lib/fetcher';
import Button from '@ui/Button';
import Link from 'next/link';
import {
    ShareIcon,
    HeartIcon,
    InformationCircleIcon,
    CheckIcon,
    TruckIcon
} from '@heroicons/react/24/outline';
import Tabs from './Tabs';
import RecomendedProductsList from './RecomendedProductsList';
import Carousel from './Carousel';

type Prop = { productSlug: string; categorySlug: string };
export default function Index({ productSlug, categorySlug }: Prop) {
    const { data: product } = useSwr(`/api/product/${productSlug}`, fetcher);
    const {
        data: { products, categoryNode }
    } = useSwr(() => `/api/products/${categorySlug}/newest/1`, fetcher);

    return (
        <div className="mx-auto max-w-5xl 2xl:max-w-7xl min-h-screen px-4 py-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                <div className="w-full">
                    <Carousel />
                    <div className="hidden md:block">
                        <Tabs />
                    </div>
                </div>
                <div>
                    <div className="grid grid-cols-1 gap-4 px-6">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight leading-9">
                                {product.name}
                            </h1>
                            <div className="max-w-xs sm:max-w-none text-sm breadcrumbs">
                                <ul>
                                    {categoryNode.parent && (
                                        <li>
                                            <Link href={`/products/${categoryNode.parent.slug}`}>
                                                {categoryNode.parent.name}
                                            </Link>
                                        </li>
                                    )}
                                    <li>
                                        <Link href={`/products/${categoryNode.slug}`}>
                                            {categoryNode.name}
                                        </Link>
                                    </li>
                                    <li>{product.name}</li>
                                </ul>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">
                                    $ {product.price.toLocaleString('es')}
                                </span>
                                <div
                                    className="tooltip tooltip-info"
                                    data-tip="Special price paying with cash or bank deposit"
                                >
                                    <InformationCircleIcon className="text-info h-5 w-5" />
                                </div>
                            </div>
                            <span className="text-sm text-info">See all payment methods</span>
                        </div>
                        <p className="">{product.description}</p>

                        <div className="form-control">
                            <div className="input-group">
                                <select className="select select-bordered ">
                                    <option selected>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                                <span>5 left</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="flex gap-2 text-sm text-success">
                                <CheckIcon className=" h-5 w-5" /> Stock available
                            </span>
                            <span className="flex gap-2 text-sm text-success">
                                <TruckIcon className=" h-5 w-5" /> Shipping to Argentina
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <Button className="btn-primary btn-block">Buy now</Button>
                            <Button className="btn-outline btn-block">Add to cart</Button>
                        </div>

                        <div className="">
                            <Button className="btn-ghost gap-2 mr-2">
                                <HeartIcon className="h-6 w-6" aria-hidden="true" /> Add to
                                favourites
                            </Button>
                            <Button className="btn-ghost gap-2">
                                <ShareIcon className="h-6 w-6" aria-hidden="true" /> Share
                            </Button>
                        </div>

                        <h3 className=" font-semibold">Details</h3>
                        <ul className="text-sm ml-5">
                            <li className="mb-1 list-disc">
                                Material: Genuine Leather, Solid Wood Frame
                            </li>
                            <li className="mb-1 list-disc">Assembly Required: Yes</li>
                            <li className="mb-1 list-disc">
                                Assembly Time: Approximately 30 minutes
                            </li>
                            <li className="mb-1 list-disc">Warranty: 1 year</li>
                        </ul>

                        <h3 className=" font-semibold">Dimensions</h3>
                        <div className="overflow-x-auto">
                            <table className="table w-full text-sm">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Height</th>
                                        <th>Width</th>
                                        <th>Length</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row 1 */}
                                    <tr>
                                        <th>Main desk</th>
                                        <td>83 cm</td>
                                        <td>100 cm</td>
                                        <td>50 cm</td>
                                    </tr>
                                </tbody>
                                <tbody>
                                    {/* row 1 */}
                                    <tr>
                                        <th>Secondary desk</th>
                                        <td>83 cm</td>
                                        <td>100 cm</td>
                                        <td>50 cm</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="md:hidden">
                <Tabs />
            </div>
            <div className="divider"></div>
            <RecomendedProductsList products={products} currentProduct={productSlug} />
        </div>
    );
}

import { EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { FaFacebook, FaTwitter, FaInstagram, FaCopyright } from 'react-icons/fa';
import Logo from '@ui/Logo';
import Button from '@ui/Button';
import type { CategoryWithChildren } from '@lib/getProducts';

type Props = { categoryTree: CategoryWithChildren[] };

export default function Footer({ categoryTree }: Props) {
    return (
        <footer className="bg-base-100 text-center text-base-content  lg:text-left border-t-2 border-base-200">
            <div className="mx-6 py-10 text-center md:text-left">
                <div className="grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    <div className="flex flex-col items-center  ">
                        <Logo />
                        <p className="my-2 text-sm text-center font-medium">
                            Here you can use rows and columns to organize your footer content.
                        </p>
                        <div className="flex gap-3 items-center">
                            <Button href="#!" className="btn-circle btn-sm btn-ghost ">
                                <FaFacebook className="h-4 w-4" />
                            </Button>
                            <Button href="#!" className="btn-circle btn-sm btn-ghost ">
                                <FaTwitter className="h-4 w-4" />
                            </Button>
                            <Button href="#!" className="btn-circle btn-sm btn-ghost ">
                                <FaInstagram className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 lg:col-start-3 items-center lg:items-start">
                        <h6 className="lg:ml-3 flex justify-center font-semibold uppercase md:justify-start">
                            Products
                        </h6>
                        <ul>
                            <li className="flex items-center ">
                                <Button
                                    href={`/products/all-products`}
                                    className="btn-link btn-sm normal-case no-underline  text-base-content"
                                >
                                    View all
                                </Button>
                            </li>
                            {categoryTree.map((product) => (
                                <li key={product.name} className="flex items-center ">
                                    <Button
                                        href={`/products/${product.slug}`}
                                        className="btn-link btn-sm normal-case no-underline  text-base-content"
                                    >
                                        {product.name}
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex flex-col gap-2  lg:col-start-4 items-center lg:items-start">
                        <h6 className="lg:ml-3 flex justify-center font-semibold uppercase md:justify-start">
                            Useful links
                        </h6>
                        <ul>
                            <li className="flex items-center ">
                                <Button className="btn-link btn-sm normal-case no-underline  text-base-content">
                                    Frequent questions
                                </Button>
                            </li>
                            <li className="flex items-center ">
                                <Button className="btn-link btn-sm normal-case no-underline  text-base-content">
                                    Settings
                                </Button>
                            </li>
                            <li className="flex items-center ">
                                <Button className="btn-link btn-sm normal-case no-underline  text-base-content">
                                    Orders
                                </Button>
                            </li>
                            <li className="flex items-center ">
                                <Button className="btn-link btn-sm normal-case no-underline  text-base-content">
                                    Help
                                </Button>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-2  lg:col-start-5 items-center lg:items-start">
                        <h6 className="lg:ml-3 font-semibold uppercase md:justify-start">
                            Contact
                        </h6>
                        <ul>
                            <li className="ml-2  flex items-center justify-center md:justify-start">
                                <MapPinIcon
                                    className="hidden sm:block h-5 w-5"
                                    aria-hidden="true"
                                />
                                <Button className="btn-link btn-sm normal-case no-underline text-base-content">
                                    <span className="sr-only">location:</span> Neuquen Capital,
                                    Argentina
                                </Button>
                            </li>
                            <li className="ml-2  flex items-center justify-center md:justify-start">
                                <EnvelopeIcon
                                    className="hidden sm:block h-5 w-5"
                                    aria-hidden="true"
                                />
                                <Button className="btn-link btn-sm normal-case no-underline  text-base-content">
                                    <span className="sr-only">email address:</span> info@example.com
                                </Button>
                            </li>
                            <li className="ml-2 flex items-center justify-center md:justify-start">
                                <PhoneIcon className="hidden sm:block h-5 w-5" aria-hidden="true" />
                                <Button className="btn-link btn-sm normal-case no-underline  text-base-content">
                                    <span className="sr-only">phone number:</span> 299-999-9999
                                </Button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center bg-primary text-primary-content p-6 text-center text-sm">
                <FaCopyright className="mr-2" />
                <span>2023 COPYRIGHT</span>
                <Button
                    className="ml-2 btn-ghost btn-sm font-normal"
                    target="_blank"
                    href="https://guidogennari.vercel.app/"
                    rel="noreferrer"
                >
                    <span className="font-bold">Guido</span>Gennari
                </Button>
            </div>
        </footer>
    );
}

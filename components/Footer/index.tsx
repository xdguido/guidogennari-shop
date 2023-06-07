import { EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { FaFacebook, FaTwitter, FaInstagram, FaCopyright } from 'react-icons/fa';
import Logo from '@ui/Logo';
import Button from '@ui/Button';
import { useCategory } from '@lib/store/CategoryContext';

export default function Footer() {
    const { categories } = useCategory();
    return (
        <footer className="bg-base-100 text-center text-base-content  lg:text-left border-t-2 border-base-200">
            <div className="grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-5 mx-6 lg:mx-20 py-10 text-center md:text-left">
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
                <ul className="flex flex-col gap-1 lg:col-start-3 items-start">
                    <h6 className="ml-3 flex justify-center font-semibold md:justify-start">
                        Products
                    </h6>

                    <li className="flex items-center ">
                        <Button
                            href={`/products/all-products`}
                            className="btn-link btn-sm normal-case no-underline text-base-content font-normal"
                        >
                            View all
                        </Button>
                    </li>
                    {categories.map((product) => (
                        <li key={product.name} className="flex items-center ">
                            <Button
                                href={`/products/${product.slug}`}
                                className="btn-link btn-sm normal-case no-underline  text-base-content font-normal"
                            >
                                {product.name}
                            </Button>
                        </li>
                    ))}
                </ul>
                <ul className="flex flex-col gap-1 sm:row-start-2 sm:col-start-2 lg:col-auto lg:row-auto lg:col-start-4 items-start">
                    <h6 className="ml-3 flex justify-center font-semibold md:justify-start">
                        Useful links
                    </h6>

                    <li className="flex items-center">
                        <Button className="btn-link btn-sm normal-case no-underline  text-base-content font-normal">
                            Frequent questions
                        </Button>
                    </li>
                    <li className="flex items-center ">
                        <Button className="btn-link btn-sm normal-case no-underline  text-base-content font-normal">
                            Settings
                        </Button>
                    </li>
                    <li className="flex items-center ">
                        <Button className="btn-link btn-sm normal-case no-underline  text-base-content font-normal">
                            Orders
                        </Button>
                    </li>
                    <li className="flex items-center ">
                        <Button className="btn-link btn-sm normal-case no-underline  text-base-content font-normal">
                            Help
                        </Button>
                    </li>
                </ul>
                <ul className="flex flex-col gap-1 sm:row-start-3 sm:col-start-2 lg:col-auto lg:row-auto lg:col-start-5 items-start">
                    <h6 className="ml-3 font-semibold md:justify-start">Contact</h6>

                    <li className="  flex items-center justify-center md:justify-start">
                        <Button className="btn-link btn-sm normal-case no-underline text-base-content font-normal">
                            <MapPinIcon className=" h-5 w-5 mr-2" aria-hidden="true" />
                            <span className="sr-only">location:</span> Neuquen Capital, Argentina
                        </Button>
                    </li>
                    <li className="  flex items-center justify-center md:justify-start">
                        <Button className="btn-link btn-sm normal-case no-underline  text-base-content font-normal">
                            <EnvelopeIcon className=" h-5 w-5 mr-2" aria-hidden="true" />
                            <span className="sr-only">email address:</span> info@example.com
                        </Button>
                    </li>
                    <li className=" flex items-center justify-center md:justify-start">
                        <Button className="btn-link btn-sm normal-case no-underline  text-base-content font-normal">
                            <PhoneIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                            <span className="sr-only">phone number:</span> 299-999-9999
                        </Button>
                    </li>
                </ul>
            </div>
            <div className="flex justify-center items-center bg-primary text-primary-content p-6 text-center text-sm">
                <FaCopyright className="mr-2" />
                <span>2023 Copyright</span>
                <Button
                    className="ml-2 btn-ghost btn-sm font-normal"
                    target="_blank"
                    href="https://guidogennari.vercel.app/"
                    rel="noreferrer"
                >
                    <span className="font-bold">Guido</span> Gennari
                </Button>
            </div>
        </footer>
    );
}

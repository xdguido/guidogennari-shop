import { EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { FaFacebook, FaTwitter, FaInstagram, FaCopyright } from 'react-icons/fa';
import Logo from '@ui/Logo';
import Button from '@ui/Button';
import { useCategory } from '@lib/store/CategoryContext';

export default function Footer() {
    const { categories } = useCategory();
    return (
        <footer className="border-t border-neutral bg-base-contrast text-center  text-base-content lg:bg-base-100 lg:text-left">
            <div className="grid-1 mx-6 grid gap-8 py-10 text-center md:grid-cols-2 md:text-left lg:mx-20 lg:grid-cols-5">
                <div className="flex flex-col items-center  ">
                    <Logo />
                    <p className="my-2 text-center text-sm font-medium">
                        Here you can use rows and columns to organize your footer content.
                    </p>
                    <div className="flex items-center gap-3">
                        <Button href="#!" className="btn-ghost btn-sm btn-circle ">
                            <FaFacebook className="h-4 w-4" />
                        </Button>
                        <Button href="#!" className="btn-ghost btn-sm btn-circle ">
                            <FaTwitter className="h-4 w-4" />
                        </Button>
                        <Button href="#!" className="btn-ghost btn-sm btn-circle ">
                            <FaInstagram className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                <ul className="flex flex-col items-start gap-1 lg:col-start-3">
                    <h6 className="ml-3 flex justify-center font-semibold md:justify-start">
                        Products
                    </h6>

                    <li className="flex items-center ">
                        <Button
                            href={`/products/all-products/newest`}
                            className="btn-link btn-sm font-normal normal-case text-base-content no-underline"
                        >
                            View all
                        </Button>
                    </li>
                    {categories.map((product) => (
                        <li key={product.name} className="flex items-center ">
                            <Button
                                href={`/products/${product.slug}/newest`}
                                className="btn-link btn-sm font-normal normal-case  text-base-content no-underline"
                            >
                                {product.name}
                            </Button>
                        </li>
                    ))}
                </ul>
                <ul className="flex flex-col items-start gap-1 sm:col-start-2 sm:row-start-2 lg:col-auto lg:col-start-4 lg:row-auto">
                    <h6 className="ml-3 flex justify-center font-semibold md:justify-start">
                        Useful links
                    </h6>

                    <li className="flex items-center">
                        <Button className="btn-link btn-sm font-normal normal-case  text-base-content no-underline">
                            Frequent questions
                        </Button>
                    </li>
                    <li className="flex items-center ">
                        <Button className="btn-link btn-sm font-normal normal-case  text-base-content no-underline">
                            Settings
                        </Button>
                    </li>
                    <li className="flex items-center ">
                        <Button className="btn-link btn-sm font-normal normal-case  text-base-content no-underline">
                            Orders
                        </Button>
                    </li>
                    <li className="flex items-center ">
                        <Button className="btn-link btn-sm font-normal normal-case  text-base-content no-underline">
                            Help
                        </Button>
                    </li>
                </ul>
                <ul className="flex flex-col items-start gap-1 sm:col-start-2 sm:row-start-3 lg:col-auto lg:col-start-5 lg:row-auto">
                    <h6 className="ml-3 font-semibold md:justify-start">Contact</h6>

                    <li className="  flex items-center justify-center md:justify-start">
                        <Button className="btn-link btn-sm font-normal normal-case text-base-content no-underline">
                            <MapPinIcon className=" mr-2 h-5 w-5" aria-hidden="true" />
                            <span className="sr-only">location:</span> Neuquen Capital, Argentina
                        </Button>
                    </li>
                    <li className="  flex items-center justify-center md:justify-start">
                        <Button className="btn-link btn-sm font-normal normal-case  text-base-content no-underline">
                            <EnvelopeIcon className=" mr-2 h-5 w-5" aria-hidden="true" />
                            <span className="sr-only">email address:</span> info@example.com
                        </Button>
                    </li>
                    <li className=" flex items-center justify-center md:justify-start">
                        <Button className="btn-link btn-sm font-normal normal-case  text-base-content no-underline">
                            <PhoneIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                            <span className="sr-only">phone number:</span> 299-999-9999
                        </Button>
                    </li>
                </ul>
            </div>
            <div className="flex items-center justify-center bg-primary p-6 text-center text-sm text-primary-content">
                <FaCopyright className="mr-2" />
                <span>2023 Copyright</span>
                <Button
                    className="btn-ghost btn-sm ml-2 font-normal"
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

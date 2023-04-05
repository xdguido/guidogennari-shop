import { useState } from 'react';
import { Tab } from '@headlessui/react';
import clsx from 'clsx';

export default function Tabs() {
    const [categories] = useState({
        FAQ: [
            {
                id: 1,
                title: 'Does drinking coffee make you smarter?',
                date: '5h ago',
                commentCount: 5,
                shareCount: 2
            },
            {
                id: 2,
                title: "So you've bought coffee... now what?",
                date: '2h ago',
                commentCount: 3,
                shareCount: 2
            }
        ],
        Reviews: [
            {
                id: 1,
                title: 'Is tech making coffee better or worse?',
                date: 'Jan 7',
                commentCount: 29,
                shareCount: 16
            },
            {
                id: 2,
                title: 'The most innovative things happening in coffee',
                date: 'Mar 19',
                commentCount: 24,
                shareCount: 12
            }
        ]
        // Trending: [
        //     {
        //         id: 1,
        //         title: 'Ask Me Anything: 10 answers to your questions about coffee',
        //         date: '2d ago',
        //         commentCount: 9,
        //         shareCount: 5
        //     },
        //     {
        //         id: 2,
        //         title: "The worst advice we've ever heard about coffee",
        //         date: '4d ago',
        //         commentCount: 1,
        //         shareCount: 2
        //     }
        // ]
    });

    return (
        <div className="mx-auto w-full  px-2 py-12 sm:px-0">
            <Tab.Group>
                <Tab.List className="flex space-x-1 rounded-xl bg-base-200 p-1">
                    {Object.keys(categories).map((category) => (
                        <Tab
                            key={category}
                            className={({ selected }) =>
                                clsx(
                                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5 ',
                                    'ring-primary  focus:outline-none focus:ring-2',
                                    selected
                                        ? 'bg-base-100 shadow'
                                        : 'text-base-content hover:bg-base-300'
                                )
                            }
                        >
                            {category}
                        </Tab>
                    ))}
                </Tab.List>
                <Tab.Panels className="mt-2">
                    {Object.values(categories).map((posts, idx) => (
                        <Tab.Panel
                            key={idx}
                            className={clsx(
                                'rounded-xl bg-base-200 p-3',
                                ' ring-primary focus:outline-none focus:ring-2'
                            )}
                        >
                            <ul>
                                {posts.map((post) => (
                                    <li
                                        key={post.id}
                                        className="relative rounded-md p-3 hover:bg-base-100"
                                    >
                                        <h3 className="text-sm font-medium leading-5">
                                            {post.title}
                                        </h3>

                                        <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                                            <li>{post.date}</li>
                                            <li>&middot;</li>
                                            <li>{post.commentCount} comments</li>
                                            <li>&middot;</li>
                                            <li>{post.shareCount} shares</li>
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        </Tab.Panel>
                    ))}
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
}

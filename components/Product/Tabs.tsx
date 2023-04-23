import { useState } from 'react';
import { Tab } from '@headlessui/react';
import clsx from 'clsx';

export default function Tabs() {
    const [categories] = useState({
        FAQ: [
            {
                id: 1,
                question: 'What is the maximum weight that the drawer can hold?',
                answer: 'The drawer can hold up to 10 pounds of weight.'
            },
            {
                id: 2,
                question: 'Does this desk have any storage space?',
                answer: 'Yes, this desk has a built-in drawer for storage.'
            },
            {
                id: 3,
                question: 'Does this desk come with a chair?',
                answer: 'No, this desk does not come with a chair. It is sold separately.'
            }
        ],
        Reviews: [
            {
                id: 1,
                question: 'What is the maximum weight that the drawer can hold?',
                answer: 'The drawer can hold up to 10 pounds of weight.'
            },
            {
                id: 2,
                question: 'Does this desk have any storage space?',
                answer: 'Yes, this desk has a built-in drawer for storage.'
            },
            {
                id: 3,
                question: 'Does this desk come with a chair?',
                answer: 'No, this desk does not come with a chair. It is sold separately.'
            }
        ]
    });

    return (
        <div className="mx-auto w-full mt-2 ">
            <Tab.Group>
                <Tab.List className="flex space-x-1 rounded-xl bg-base-200 p-1">
                    {Object.keys(categories).map((category) => (
                        <Tab
                            key={category}
                            className={({ selected }) =>
                                clsx(
                                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5 ',
                                    'ring-primary ring-offset-2 ring-offset-base-300 focus:outline-none focus:ring-2',
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
                                    <li key={post.id} className="relative rounded-md p-3">
                                        <h3 className="text-sm font-medium leading-5">
                                            {post.question}
                                        </h3>
                                        <p className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                                            {post.answer}
                                        </p>
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

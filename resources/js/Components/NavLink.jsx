import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center px-3 py-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                'border-b-2 sm:border-b-2 border-l-4 sm:border-l-0 ' +
                (active
                    ? 'border-indigo-400 text-gray-900 bg-indigo-50 sm:bg-transparent focus:border-indigo-700'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 focus:border-gray-300 focus:text-gray-700') +
                ' ' + className
            }
        >
            {children}
        </Link>
    );
}

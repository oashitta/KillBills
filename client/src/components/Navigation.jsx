import { Fragment } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import Switcher from './Switcher';

const userNavigation = [
  { name: 'Dashboard', href: '/' },
  { name: 'Payment History', href: '/history' },
  { name: 'Settings', href: '/settings' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navigation() {
  const { isAuthenticated, user, logout } = useAuth0();

  return (
    isAuthenticated && (
    <>
    <div className="min-h-full sticky top-0 z-88 bg-gray-50 dark:bg-black">
      <Disclosure as="nav">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0 mt-2">
                    <a href="https://killbills.onrender.com" className="-m-1.5 p-1.5">
                      <span className="text-3xl font-bold text-black dark:text-gray-200">KILL</span>
                      <span className="text-3xl font-bold text-indigo-600">/</span>
                      <span className="text-3xl font-bold text-black dark:text-gray-200">BILL</span>
                      <span className="text-3xl font-bold text-indigo-600">$</span>
                    </a>
                  </div>
                </div>
                <div className="md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    <Switcher />
                    <Menu as="div" className="relative ml-6">
                      <div>
                        <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="sr-only">Open user menu</span>
                          <img className="h-8 w-8 rounded-full" src={user.picture} alt="" />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="px-4 py-1 border-b">
                            <span className="block text-sm text-gray-900 dark:text-gray-200 font-bold">{user.name}</span>
                            <span className="block text-sm text-gray-500 dark:text-gray-200 truncate">{user.email}</span>
                          </div>
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <a
                                  href={item.href}
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 dark:hover:text-gray-900'
                                  )}
                                >
                                  {item.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                          <div className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 dark:hover:text-gray-900 hover:bg-gray-100 cursor-pointer" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Sign Out</div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Disclosure>
    </div>
  </>
  ));
}

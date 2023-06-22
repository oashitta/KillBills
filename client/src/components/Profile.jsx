import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div className="flex justify-center">Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <>
      <div className="mx-auto flex max-w-7xl items-center justify-between pb-0 mt-12">
      <div className="border-b border-gray-200 bg-white dark:bg-black rounded-t-sm pt-2 px-0 shadow-lg">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          <li className="mr-2">
          <a href="/" className="inline-flex p-4 border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 group">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" strokeWidth="1" stroke="currentColor" className="w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>Unpaid
            </a>
          </li>
          <li className="mr-2">
            <a href="/history" className="inline-flex p-4 border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 group">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" strokeWidth="1" stroke="currentColor" className="w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
              </svg>History
            </a>
          </li>
          <li>
            <a href="/insights" className="inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 group">
              <svg aria-hidden="true" className="w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z" />
              </svg>Insights
            </a>
          </li>
        </ul>
      </div>
    </div>
      <div className="flex flex-col items-center py-3 py-12 my-12">
        <img className="rounded-full" src={user.picture} alt={user.name} />
        <p className="txt-xl font-bold">{user.name}</p>
        <p className="txt-xl">{user.email}</p>
        <div className="onesignal-customlink-container"></div>
      </div>
      </>
    )
  );
};

export default Profile;

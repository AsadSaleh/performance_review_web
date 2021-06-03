import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../store/auth";
import BaseLayout from "./BaseLayout";

export default function InitialScreen() {
  const { state, dispatch } = useAuth();

  function handleLogout() {
    const confirmation = window.confirm("Are you sure you want to log out?");
    if (!confirmation) return;
    dispatch({
      type: "logout",
    });
  }

  return (
    <BaseLayout title={`Hello ${state.user?.name}`}>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg bg-gray-50 p-12">
              <div className="">
                <p className="text-4xl mb-4">Give a Peer Review</p>
                <p className="text-lg">
                  This platform allows you to give a Performance Review (or
                  known as Peer Review) to your fellow co-workers. Click on the
                  "Pending Performance Review" button and{" "}
                  <span className="text-indigo-600 font-bold">fill out</span>{" "}
                  the performance review form &nbsp;👉&nbsp;
                  <Link to="/pending-performance-review">
                    <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Pending Performance Reviews
                    </button>
                  </Link>
                </p>
                <br />
                <p></p>
                <hr className="my-6" />
                <div className="justify-end">
                  <p className="pb-2">
                    If you find yourself done here, you can log out here:
                  </p>
                  <button
                    className="inline-flex items-center px-8 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                  <div className="pt-2">
                    Bye! Enjoy the rest of your day 👋😄
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}

import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

function Pagination(props: any) {
  const { pageNumber } = props;
  const pageCount: number = props.pageCount;
  const handleChangePage = props.handleChangePage;
  var links = [];
  for (var i = 1; i <= pageCount; i++) {
    links.push(i);
  }
  return (
    <>
      <div className="flex justify-between flex-1 sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-center">
        <div>
          <nav
            className="relative z-0 inline-flex space-x-1 rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <a
              href="#"
              className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-300 rounded-l-md "
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="w-5 h-5 " aria-hidden="true" />
            </a>

            {links.map((link) => (
              <a
                key={link}
                href="#"
                className={
                  pageNumber === link
                    ? "relative inline-flex items-center px-2 py-2 text-sm font-medium text-white bg-blue-900"
                    : "relative inline-flex items-center px-2 py-2 text-sm font-medium text-black border border-gray-300 bg-white  hover:bg-gray-100"
                }
                onClick={handleChangePage(link)}
              >
                {link}
              </a>
            ))}
            <a
              href="#"
              className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-300 rounded-l-md"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Pagination;

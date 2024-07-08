"use client";
import Link from "next/link";

const Home = () => {
  return (
    <main className="">
        <main className="flex justify-center items-center bg-[#f4f4f5] min-h-screen">
          <div className="flex items-center justify-center bg-white w-[578px] rounded-[24px] p-8">
            <div className="flex flex-col items-start gap-4 w-full max-w-md">
              <Link href="/shell" className="text-blue-500 underline">
                Shell
              </Link>
              <Link href="/search" className="text-blue-500 underline">
                Search
              </Link>
              <Link href="/ui-components" className="text-blue-500 underline">
                UI Components
              </Link>
            </div>
          </div>
        </main>
    </main>
  );
};

export default Home;

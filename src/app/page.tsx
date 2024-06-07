"use client";
import Layout from "@/components/Layout";
import Link from "next/link";
import { Plus } from "@phosphor-icons/react";
import { CustomButton } from "@/components/ui/CustomButton";
import { Button } from "@/components/ui/button";
import { logout } from "@/utils/http-util";

const Home = () => {
  return (
    <main className="">
      <Layout>
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
              <CustomButton variant={"outline"} icon={Plus} iconPosition="left">
                Add Item
              </CustomButton>
              <CustomButton icon={Plus} iconPosition="right" variant="outline">
                Add Item
              </CustomButton>
              <Button onClick={() => logout()} />
            </div>
          </div>
        </main>
      </Layout>
    </main>
  );
};

export default Home;

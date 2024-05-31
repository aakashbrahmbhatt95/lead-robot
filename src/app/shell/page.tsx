"use client";
import SearchFilter from "@/components/SearchFilter";
import Layout from "@/components/Layout";
import Breadcrumbs from "@/components/BreadCrumbs";
import caretleft from ".././../../public/CaretLeft.svg";
import { useState } from "react";
import Image from "next/image";
import pencilicon from ".././../../public/PencilSimple.svg";
import dotsthree from ".././../../public/DotsThree.svg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { WindowsLogo, Plus, PencilSimple } from "@phosphor-icons/react";

const Home = () => {
  const [activeTab, setActiveTab] = useState<string>("tab1");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const tabs = [
    { id: "tab1", label: "Tab 1", content: "Content for Tab 1" },
    { id: "tab2", label: "Tab 2", content: "Content for Tab 2" },
    { id: "tab3", label: "Tab 3", content: "Content for Tab 3" },
  ];

  return (
    <main className="">
      <Layout>
        <div className="flex flex-col bg-[#f4f4f5] dark:bg-slate-900 p-4">
          <Breadcrumbs path="/nav/page/" />
          <div className="flex items-center justify-between mt-10">
            <button className="border border-[#E4E4E7] rounded-[6px] h-[32px] w-[32px] flex justify-start items-center p-2">
              <Plus size={20} weight="light" />{" "}
            </button>
            <Button>+ Action</Button>
          </div>
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center justify-center gap-4">
              <h2 className="scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                {" "}
                Title
              </h2>
              <PencilSimple size={20} weight="light" />
            </div>
            <button className="bg-[#F4F4F5] w-[56px] h-[42px] flex justify-center items-center rounded-[6px]">
              <WindowsLogo size={20} weight="light" />
            </button>
          </div>
          <div className="flex items-center justify-between gap-4 mt-6">
            <p className="leading-7 [&:not(:first-child)]:mt-6">Subhead</p>
          </div>
          <div className="flex mt-4 space-x-4">
            <Tabs className="w-[400px]" value={activeTab}>
              <TabsList>
                {tabs.map((tab) => (
                  <TabsTrigger
                    value={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
          <div className="flex flex-wrap items-center mt-10 gap-5 ">
            <div className="w-[1550px] border border-[#D4D4D8] h-[200px] rounded-[8px]"></div>
            <div className="w-[750px] border border-[#D4D4D8] h-[200px] rounded-[8px]"></div>
            <div className="w-[500px] border border-[#D4D4D8] h-[200px] rounded-[8px]"></div>
            <div className="w-[500px] border border-[#D4D4D8] h-[200px] rounded-[8px]"></div>
            <div className="w-[500px] border border-[#D4D4D8] h-[200px] rounded-[8px]"></div>
          </div>
        </div>
      </Layout>
    </main>
  );
};

export default Home;

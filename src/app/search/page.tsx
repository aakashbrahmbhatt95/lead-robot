"use client";
import SearchFilter from "@/components/SearchFilter";
import Layout from "@/components/Layout";
import Breadcrumbs from "@/components/BreadCrumbs";
import caretleft from "../../public/CaretLeft.svg";
import { useState } from "react";
import Image from "next/image";
import pencilicon from "../../public/PencilSimple.svg";
import dotsthree from "../../public/DotsThree.svg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
        <div className="flex flex-col bg-white dark:bg-slate-900 p-4">
          <Breadcrumbs path="/nav/page/" />
          <SearchFilter />
        </div>
      </Layout>
    </main>
  );
};

export default Home;

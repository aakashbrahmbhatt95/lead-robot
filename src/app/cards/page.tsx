"use client";
import DoCard from "@/components/DoCard";
import Layout from "@/components/Layout";
import ParentTaskCard from "@/components/ParentTaskCard";
import SayCard from "@/components/SayCard";
import TaskCard from "@/components/TaskCard";
import { useAppSelector } from "../../redux/store";
import AskCard from "@/components/AskCard";

const Cards: React.FC = () => {
  const components = useAppSelector((state) => state.components.components);
  const handleDelete = (id: string) => {
    console.log(`Delete card with id: ${id}`);
  };

  const handleCopy = (id: string) => {
    console.log(`Copy card with id: ${id}`);
  };

  return (
    <main className="">
        <main className="flex justify-center items-center bg-[#f4f4f5] min-h-screen">
          <div className="flex flex-col gap-10 items-center justify-center bg-white w-[578px] rounded-[24px] p-8">
            <ParentTaskCard
              id="1"
              handleDelete={handleDelete}
              handleCopy={handleCopy}
            />{" "}
          </div>
        </main>
    </main>
  );
};

export default Cards;

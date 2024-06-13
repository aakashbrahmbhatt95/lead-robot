"use client";
import DoCard from "@/components/DoCard";
import Layout from "@/components/Layout";
import ParentTaskCard from "@/components/ParentTaskCard";
import SayCard from "@/components/SayCard";
import TaskCard from "@/components/TaskCard";
import { useAppSelector } from "../../redux/store";

const Cards: React.FC = () => {
  const components = useAppSelector((state) => state.components.components);

  return (
    <main className="">
      <Layout>
        <main className="flex justify-center items-center bg-[#f4f4f5] min-h-screen">
          <div className="flex flex-col gap-10 items-center justify-center bg-white w-[578px] rounded-[24px] p-8">
            <ParentTaskCard />
            {components.map((component, index) => {
              if (component === "do") return <DoCard key={index} />;
              if (component === "say") return <SayCard key={index} />;
              return null;
            })}
          </div>
        </main>
      </Layout>
    </main>
  );
};

export default Cards;

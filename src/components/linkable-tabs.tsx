"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

type Tab = {
  value: string;
  label: string;
  link: string;
};

type Props = {
  tabs: Tab[];
  children: React.ReactNode;
  searchQuery?: string;
};

const LinkableTabs = ({ tabs, children, searchQuery }: Props) => {
  const pathname = usePathname();

  const getActiveTab = (): string => {
    const currentTab = tabs.find((tab) => tab.link === pathname);
    return currentTab ? currentTab.value : tabs[0].value;
  };

  const [activeTab, setActiveTab] = useState(getActiveTab);

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="border-b-1 flex justify-between border-mauve6">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className={`flex-grow ${
              activeTab === tab.value ? "border-b-2 border-mauve12 font-bold" : "border-b-2 border-mauve6"
            }`}
          >
            <Link href={searchQuery ? `${tab.link}?search=${searchQuery}` : tab.link}>
              <div className="py-2 text-mauve12">{tab.label}</div>
            </Link>
          </TabsTrigger>
        ))}
      </TabsList>
      {children}
    </Tabs>
  );
};

export default LinkableTabs;

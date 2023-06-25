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
      <TabsList className="flex justify-between border-b-1 border-mauve6">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className={`flex-grow ${
              activeTab === tab.value ? "border-b-2 border-mauve12 font-bold" : "border-b-2 border-mauve6"
            }`}
          >
            <Link href={searchQuery ? `${tab.link}?search=${searchQuery}` : tab.link}>
              <div className="text-mauve12 py-2">{tab.label}</div>
            </Link>
          </TabsTrigger>
        ))}
      </TabsList>
      {children}
    </Tabs>
  );
};

export default LinkableTabs;

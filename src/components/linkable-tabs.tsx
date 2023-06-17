"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

type Tab = {
  value: string;
  label: string;
  link: string;
};

interface Props {
  tabs: Tab[];
  children: React.ReactNode;
}

const LinkableTabs = ({ tabs, children }: Props) => {
  const pathname = usePathname();

  const [activeTab, setActiveTab] = useState(() => {
    const currentTab = tabs.find((tab) => tab.link === pathname);
    return currentTab ? currentTab.value : tabs[0].value;
  });

  useEffect(() => {
    const currentTab = tabs.find((tab) => tab.link === pathname);
    if (currentTab && currentTab.value !== activeTab) {
      setActiveTab(currentTab.value);
    }
  }, [pathname, activeTab]);

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="flex justify-between border-b-1 border-border">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className={`flex-grow p-1 ${
              activeTab === tab.value ? "border-b-2 border-black font-bold" : "border-b-2 border-border"
            }`}
          >
            <Link href={tab.link}>
              <div className="text-base inline-block w-full py-2">{tab.label}</div>
            </Link>
          </TabsTrigger>
        ))}
      </TabsList>
      {children}
    </Tabs>
  );
};

export default LinkableTabs;

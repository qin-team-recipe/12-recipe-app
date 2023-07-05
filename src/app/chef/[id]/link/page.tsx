import ExternalLinkTile from "@/src/components/external-link-tile";
import { linkList } from "@/src/constants/dummy/link-list";

const page = () => {
  return (
    <>
      {linkList.map((list) => (
        <ExternalLinkTile key={list.site} siteName={list.site} siteUrl={list.url} />
      ))}
    </>
  );
};

export default page;

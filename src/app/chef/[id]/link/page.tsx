import ExternalLinkList from "@/src/components/external-link-list";
import { linkLists } from "@/src/constants/dummy/link-list";

const page = () => {
  return (
    <>
      {linkLists.map((list) => (
        <ExternalLinkList key={list.site} siteName={list.site} siteUrl={list.url} />
      ))}
    </>
  );
};

export default page;

import { redirect } from "next/navigation";

import { getAuthenticatedUser } from "@/src/actions/getAuthenticatedUser";
import ExternalLinkTile from "@/src/components/external-link-tile";
import NoDataDisplay from "@/src/components/no-data-display";

const page = async () => {
  const user = await getAuthenticatedUser();

  if (!user) {
    // TODO: 未ログイン時のリダイレクト先を変更する
    redirect("/mock/unauthorized");
  }

  const { UserLink: links } = user;

  return (
    <>
      {links.length ? (
        links.map(({ id, url }) => <ExternalLinkTile key={id} siteName={"ツイッター"} siteUrl={url} />)
      ) : (
        <NoDataDisplay text="リンクが登録されていません。" />
      )}
    </>
  );
};

export default page;

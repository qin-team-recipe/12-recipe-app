import HeaderArrowToGoBack from "@/src/components/header-arrow-to-go-back";
import SettingList from "@/src/components/setting-list";

const page = () => {
  return (
    <>
      <div className="relative h-16">
        <HeaderArrowToGoBack path={"favorite/"} color="text-black" text="設定" border={true} />
      </div>
      <div className="my-3 ml-6 text-lg font-bold">利用規約やお問い合わせ</div>
      <div className="mb-8">
        <SettingList path="/" icon={<img src="/icon-chevron-right.svg" alt=""/>} text="利用規約" />
        <SettingList path="/" icon={<img src="/icon-chevron-right.svg" alt=""/>} text="プライバシーポリシー" />
        <SettingList path="/" icon={<img src="/icon-arrow-up-right.svg" alt=""/>} text="運営会社" external />
        <SettingList path="/" icon={<img src="/icon-arrow-up-right.svg" alt=""/>} text="お問い合わせ" external />
      </div>
      <div className="my-3 ml-6 text-lg font-bold">アカウントの操作</div>
      <div className="mb-8">
        <SettingList path="/" icon={<img src="/icon-logout.svg" alt=""/>} text="ログアウト" />
      </div>
      <div className="my-3 ml-6 text-lg font-bold">取り消しができない操作</div>
      <div className="mb-8">
        <SettingList icon={<img src="/icon-alert-circle.svg" alt=""/>} text="退会する" />
      </div>
    </>
  );
};

export default page;

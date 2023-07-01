import Login from "./login";

export const metadata = {
  title: "BE Demo",
  description: "バックエンドのデモです",
};

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Login />
      {children}
    </>
  );
}

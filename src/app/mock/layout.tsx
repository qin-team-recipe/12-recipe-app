import Login from "./login";

export const metadata = {
  title: "BE Demo",
  description: "Generated by create next app",
};

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-8">
      <Login />
      {children}
    </div>
  );
}

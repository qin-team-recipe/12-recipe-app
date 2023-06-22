import { ReactNode } from "react";

type Props = {
  leadingComponent?: ReactNode;
  centerComponent?: ReactNode;
  trailingComponent?: ReactNode;
};

const TopBar = ({
  leadingComponent: LeadingComponent,
  centerComponent: CenterComponent,
  trailingComponent: TrailingComponent,
}: Props) => {
  return (
    <div className="w-full h-12 flex px-2 md:px-4 items-center border-b border-mauve6">
      <div className="flex items-center justify-start flex-1">{LeadingComponent}</div>
      {CenterComponent && <div className="flex items-center justify-center flex-auto mx-auto">{CenterComponent}</div>}
      <div className="flex items-center justify-end flex-1">{TrailingComponent}</div>
    </div>
  );
};

export default TopBar;

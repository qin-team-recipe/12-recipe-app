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
    <div className="w-full h-16 flex px-2 md:px-4 items-center border-b border-mauve6">
      {LeadingComponent ? (
        <div className="flex items-center justify-start flex-1">{LeadingComponent}</div>
      ) : (
        <div className="flex-1"></div>
      )}
      <div
        className={
          LeadingComponent || TrailingComponent
            ? "flex items-center justify-center flex-auto mx-auto"
            : "w-full flex items-center justify-center"
        }
      >
        {CenterComponent}
      </div>
      {TrailingComponent ? (
        <div className="flex items-center justify-end flex-1">{TrailingComponent}</div>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  );
};

export default TopBar;

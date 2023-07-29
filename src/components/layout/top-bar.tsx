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
    <div className="flex h-16 w-full items-center border-b border-mauve6 px-4 md:px-4">
      {LeadingComponent ? (
        <div className="flex flex-1 items-center justify-start">{LeadingComponent}</div>
      ) : (
        <div className="flex-1"></div>
      )}
      <div
        className={
          LeadingComponent || TrailingComponent
            ? "mx-auto flex flex-auto items-center justify-center"
            : "flex w-full items-center justify-center"
        }
      >
        {CenterComponent}
      </div>
      {TrailingComponent ? (
        <div className="flex flex-1 items-center justify-end">{TrailingComponent}</div>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  );
};

export default TopBar;

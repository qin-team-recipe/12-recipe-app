import React from "react";

type Props = {
  numbers: number;
  unit: string;
};

const NumberUnit = ({ numbers, unit }: Props) => {
  return (
    <div className="flex">
      <span className="font-bold mr-0.5">{numbers.toLocaleString()}</span>
      <span>{unit}</span>
    </div>
  );
};

export default NumberUnit;

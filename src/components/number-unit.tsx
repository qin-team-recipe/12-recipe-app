type Props = {
  numbers: number;
  unit: string;
};

const NumberUnit = ({ numbers, unit }: Props) => {
  return (
    <div className="flex">
      <span className="mr-0.5 font-extrabold text-mauve11">{numbers.toLocaleString()}</span>
      <span className="text-mauve11">{unit}</span>
    </div>
  );
};

export default NumberUnit;

type Props = {
  numbers: number;
  unit: string;
};

const NumberUnit = ({ numbers, unit }: Props) => {
  return (
    <div className="flex">
      <span className="font-bold mr-0.5 text-mauve12">{numbers.toLocaleString()}</span>
      <span className="text-mauve11">{unit}</span>
    </div>
  );
};

export default NumberUnit;

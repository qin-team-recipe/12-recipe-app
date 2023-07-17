type Props = {
  text: string;
};

const NoDataDisplay = async ({ text }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center pt-4">
      <img
        className="mx-auto mb-4 h-80 w-80"
        src="https://uploads-ssl.webflow.com/603c87adb15be3cb0b3ed9b5/61bf07d2cce98fb122df3dd3_1.png"
        alt="No result"
      />
      <p className="font-bold text-mauve12">{text}</p>
    </div>
  );
};

export default NoDataDisplay;
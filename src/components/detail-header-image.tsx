import HeaderArrowToGoBack from "./header-arrow-to-go-back";

type Props = {
  imageUrl: string;
  path: string;
};

const DetailHeaderImage = ({ imageUrl, path }: Props) => {
  return (
    <div className="relative aspect-square">
      <img className="aspect-square" src={imageUrl} alt="chef or recipe image" />
      <HeaderArrowToGoBack path={path} />
    </div>
  );
};

export default DetailHeaderImage;

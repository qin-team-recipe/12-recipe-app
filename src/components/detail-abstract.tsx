type Props = {
  name: string; // シェフ名orレシピ名
  abstract: string; // 概要
};

const DetailAbstract = ({ name, abstract }: Props) => {
  return (
    <div className="grid gap-4">
      <h6 className="text-xl font-bold text-mauve12">{name}</h6>
      <p className="text-mauve12">{abstract}</p>
    </div>
  );
};

export default DetailAbstract;

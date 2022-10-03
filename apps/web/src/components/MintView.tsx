import DropView from "./DropView";
const MintView = () => {
  const drops = [0, 1];

  return (
    <div style={{ display: "flex" }}>
      {drops.map((key, item) => (
        <DropView key={key} dropId={item} />
      ))}
    </div>
  );
};

export default MintView;

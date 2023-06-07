import Aliment from "./Aliment";

const AlimentList = (props: any) => {
  return (
    <div className="flex flex-col text-white justify-center my-4 p-2 rounded-lg">
      {props.alims.map((el: any, index: number) => {
        return (
          <Aliment
            key={index}
            el={el}
            name={el.Nome}
            unit={el["Unità di riferimento"].endsWith("ml") ? "ml" : "g"}
            alims={props.alims}
            setAlims={props.setAlims}
            currentLabel={props.currentLabel}
            setCurrentLabel={props.setCurrentLabel}
            setDropUnit={props.setDropUnit}
            dropUnitList={props.dropUnitList}
            setDropUnitList={props.setDropUnitList}
          />
        );
      })}
    </div>
  );
};

export default AlimentList;

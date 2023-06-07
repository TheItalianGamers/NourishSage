import { useState } from "react";
import { Button, TextField } from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

//ui component
import { Typography } from "@mui/material";

const Aliment = (props: any) => {
  const [value, setValue] = useState(0);
  function remove() {
    props.setAlims([
      ...props.alims.filter((el: any) => el.Nome !== props.name),
    ]);

    let unitList = props.dropUnitList;
    delete unitList[props.name];
    props.setDropUnitList({ ...unitList });
  }

  return (
    <div className="flex justify-evenly gap-2 align-middle max-w-full py-4 px-3 bg-tig-dark-gray border-neutral-900 border-y">
      <p className="flex-1 text-center my-auto">
        <Typography variant="h6">{props.name}</Typography>
      </p>

      <div className="flex-1">
        <TextField
          type="number"
          label={`Quantità (${props.unit})`}
          placeholder="0"
          InputProps={{ inputProps: { min: 0 } }}
          onChange={(event: any) => {
            setValue(event.target.value);

            // setting drop value into the array

            let unitList = props.dropUnitList;
            if (event.target.value === "" || event.target.value === "0")
              delete unitList[props.name];
            else unitList[props.name] = event.target.value;
            props.setDropUnitList({ ...unitList });
          }}
        />
      </div>
      <Button
        onClick={() => {
          props.setCurrentLabel({ ...props.el });
          props.setDropUnit(value);
        }}
        variant="outlined"
        size="large"
      >
        crea etichetta
      </Button>
      <div className="flex-1 flex justify-center items-center">
        <CancelOutlinedIcon
          onClick={remove}
          className="flex-1 cursor-pointer"
          fontSize="large"
          color="primary"
        />
      </div>
    </div>
  );
};

export default Aliment;

import { useRef, forwardRef } from "react";
import { exportComponentAsPNG } from "react-component-export-image";

import {
  Button,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  Paper,
  TableRow,
} from "@mui/material";

//#region FUNZIONI

function getValue(props: any, key: string): string {
  console.log(key);
  let value = props.currentLabel[key].toString();

  if (Number.isNaN(parseFloat(value))) {
    if (value === "tr.") return "tracce";

    if (value === "nd") return "non dato";
  }

  return Number(value).toFixed(1);
}

function getValueMultiplicated(props: any, key: string, drop: number): string {
  let value: any = getValue(props, key);

  if (value.includes("<")) {
    value = parseFloat(value.replace("<", ""));
    return "<" + (value * drop) / 100;
  }

  if (Number.isNaN(parseFloat(value))) {
    if (value === "tracce") return "tracce";

    if (value === "non dato") return "non dato";
  }

  return ((value * drop) / 100).toFixed(1);
}
//#endregion

const ElementToPrint = forwardRef((props: any, ref: any) => (
  <div className="flex flex-col items-center px-4 py-2">
    <header className="text-xl font-sans uppercase my-3">
      {props.currentLabel.Nome}
    </header>

    <TableContainer component={Paper} ref={ref}>
      <Table size="medium" stickyHeader frame={true}>
        <TableHead>
          <TableRow>
            <TableCell colSpan={props.dropUnit <= 0 ? 2 : 3} align="center">
              {props.currentLabel.Nome}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>VALORI MEDI</TableCell>
            <TableCell>100 g</TableCell>
            {props.dropUnit > 0 && <TableCell>{props.dropUnit} g</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>VALORE ENERGETICO (kcal/KJ)</TableCell>
            <TableCell>
              {getValue(props, "Energia, calorie (kcal)")} kcal
            </TableCell>
            {props.dropUnit > 0 && (
              <TableCell>
                {getValueMultiplicated(
                  props,
                  "Energia, calorie (kcal)",
                  props.dropUnit
                )}
                &nbsp;kcal
              </TableCell>
            )}
          </TableRow>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>
              {getValue(props, "Energia, kilojoules (kJ)")} KJ
            </TableCell>
            {props.dropUnit > 0 && (
              <TableCell>
                {getValueMultiplicated(
                  props,
                  "Energia, kilojoules (kJ)",
                  props.dropUnit
                )}
                &nbsp;KJ
              </TableCell>
            )}
          </TableRow>
          <TableRow>
            <TableCell>CARBOIDRATI</TableCell>
            <TableCell>
              {getValue(props, "Glucidi, disponibili (g)")} g
            </TableCell>
            {props.dropUnit > 0 && (
              <TableCell>
                {getValueMultiplicated(
                  props,
                  "Glucidi, disponibili (g)",
                  props.dropUnit
                )}
                &nbsp;g
              </TableCell>
            )}
          </TableRow>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>
              {getValue(props, "Zuccheri (g)")} g (di cui zuccheri)
            </TableCell>
            {props.dropUnit > 0 && (
              <TableCell>
                {getValueMultiplicated(props, "Zuccheri (g)", props.dropUnit)}
                &nbsp;g (di cui zuccheri)
              </TableCell>
            )}
          </TableRow>
          <TableRow>
            <TableCell>PROTEINE</TableCell>
            <TableCell>{getValue(props, "Proteine (g)")} g</TableCell>
            {props.dropUnit > 0 && (
              <TableCell>
                {getValueMultiplicated(props, "Proteine (g)", props.dropUnit)}
                &nbsp;g
              </TableCell>
            )}
          </TableRow>
          <TableRow>
            <TableCell>GRASSI</TableCell>
            <TableCell>{getValue(props, "Lipidi, totali (g)")} g</TableCell>
            {props.dropUnit > 0 && (
              <TableCell>
                {getValueMultiplicated(
                  props,
                  "Lipidi, totali (g)",
                  props.dropUnit
                )}
                &nbsp;g
              </TableCell>
            )}
          </TableRow>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>
              {getValue(props, "Acidi grassi, saturi (g)")} g (di cui saturi)
            </TableCell>
            {props.dropUnit > 0 && (
              <TableCell>
                {getValueMultiplicated(
                  props,
                  "Acidi grassi, saturi (g)",
                  props.dropUnit
                )}
                &nbsp;g (di cui saturi)
              </TableCell>
            )}
          </TableRow>
          <TableRow>
            <TableCell>FIBRA</TableCell>
            <TableCell>{getValue(props, "Fibra alimentare (g)")} g</TableCell>
            {props.dropUnit > 0 && (
              <TableCell>
                {getValueMultiplicated(
                  props,
                  "Fibra alimentare (g)",
                  props.dropUnit
                )}
                &nbsp;g
              </TableCell>
            )}
          </TableRow>
          <TableRow>
            <TableCell>SALE</TableCell>
            <TableCell>{getValue(props, "Sale (NaCl) (g)")} g</TableCell>
            {props.dropUnit > 0 && (
              <TableCell>
                {getValueMultiplicated(
                  props,
                  "Sale (NaCl) (g)",
                  props.dropUnit
                )}
                &nbsp;g
              </TableCell>
            )}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  </div>
));

const SingleLabel = (props: any) => {
  const elementRef: any = useRef();

  return (
    <div className="flex flex-col gap-1">
      <ElementToPrint ref={elementRef} {...props} />
      <Button
        className="self-end"
        variant="outlined"
        onClick={() =>
          exportComponentAsPNG(elementRef, {
            html2CanvasOptions: {
              width: elementRef.current.offsetWidth,
              backgroundColor: "#121212",
            },
          })
        }
      >
        STAMPA
      </Button>
    </div>
  );
};

export default SingleLabel;

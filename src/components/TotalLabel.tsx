import { useRef, forwardRef, useState } from "react";
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

import {
  getValue,
  getTotalWeight,
  selectionSort,
  search,
} from "../services/LabelUtils";

// ui icons
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const TotalLabel = (props: any) => {
  const elementRef: any = useRef();

  let tot_grammi = getTotalWeight(props);

  // Riordino gli alimenti dal più presente al meno presente
  let tempArr = selectionSort(props.dropUnitList);

  let description: string = " | "; //descrizione con lista alimenti
  let percentages: Array<number> = [];
  let lastPercent: number = 100;

  //calcolo le percentuali tranne l'ultima che ottengo per sottrazione delle altre
  for (let i = 0; i < tempArr.length - 1; i++) {
    let pos: number = search(props, tempArr[i]);
    percentages.push(
      Math.round(
        ((Number(props.dropUnitList[tempArr[i]]) *
          (props.alims[pos]["Densità"] || 1)) /
          tot_grammi) *
          100
      )
    );

    lastPercent -= percentages[i];
  }

  //Aggiungo l'ultima percentuale
  percentages.push(lastPercent);

  //Creo la stringa
  for (let i = 0; i < tempArr.length; i++) {
    description += `${tempArr[i]} (${percentages[i]}%) | `;
  }

  const [isVisible, setVisible] = useState(true);

  return (
    <>
      <div className="flex flex-row justify-end items-center p-1">
        {isVisible ? (
          <VisibilityIcon
            className="cursor-pointer"
            onClick={() => setVisible(false)}
          />
        ) : (
          <VisibilityOffIcon
            className="cursor-pointer"
            onClick={() => setVisible(true)}
          />
        )}
      </div>

      <section hidden={!isVisible}>
        <div className="flex flex-col items-center">
          <ElementToPrint
            ref={elementRef}
            {...props}
            description={description}
            tot_grammi={tot_grammi}
            customPortion={props.customPortion}
          />
          <Button
            onClick={() =>
              exportComponentAsPNG(elementRef, {
                html2CanvasOptions: { width: elementRef.current.offsetWidth },
              })
            }
            variant="outlined"
            size="large"
          >
            Salva etichetta
          </Button>
        </div>
      </section>
    </>
  );
};

const ElementToPrint = forwardRef((props: any, ref: any) => (
  <div className="my-10">
    <TableContainer component={Paper} ref={ref}>
      <Table size="medium" stickyHeader frame={true}>
        <TableHead>
          <TableRow>
            <TableCell
              colSpan={props.customPortion == 0 ? 2 : 3}
              align="center"
            >
              <p className="text-center font-medium text-white font-sans uppercase text-lg my-3">
                {props.productName} <br />
                Prodotto alimentare di {props.tot_grammi} g.
              </p>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell
              colSpan={props.customPortion == 0 ? 2 : 3}
              align="center"
            >
              <p className="text-white font-sans">
                Questo prodotto contiene: {props.description}
              </p>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>VALORI MEDI</TableCell>
            <TableCell>100 g</TableCell>
            {props.customPortion > 0 && (
              <TableCell>{props.customPortion} g</TableCell>
            )}
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow>
            <TableCell>VALORE ENERGETICO (kcal/kJ)</TableCell>
            <TableCell>
              {getValue(
                props,
                "Energia, calorie (kcal)",
                100,
                props.tot_grammi
              )}
              kcal
            </TableCell>
            {props.customPortion > 0 && (
              <TableCell>
                {getValue(
                  props,
                  "Energia, calorie (kcal)",
                  props.customPortion,
                  props.tot_grammi
                )}
                kcal
              </TableCell>
            )}
          </TableRow>

          <TableRow>
            <TableCell></TableCell>
            <TableCell>
              {getValue(
                props,
                "Energia, kilojoules (kJ)",
                100,
                props.tot_grammi
              )}
              kJ
            </TableCell>

            {props.customPortion > 0 && (
              <TableCell>
                {getValue(
                  props,
                  "Energia, kilojoules (kJ)",
                  props.customPortion,
                  props.tot_grammi
                )}
                kJ
              </TableCell>
            )}
          </TableRow>

          <TableRow>
            <TableCell>CARBOIDRATI</TableCell>

            <TableCell>
              {getValue(
                props,
                "Glucidi, disponibili (g)",
                100,
                props.tot_grammi
              )}
              g
            </TableCell>

            {props.customPortion > 0 && (
              <TableCell>
                {getValue(
                  props,
                  "Glucidi, disponibili (g)",
                  props.customPortion,
                  props.tot_grammi
                )}
                g
              </TableCell>
            )}
          </TableRow>

          <TableRow>
            <TableCell></TableCell>

            <TableCell>
              {getValue(props, "Zuccheri (g)", 100, props.tot_grammi)} g (di cui
              zuccheri)
            </TableCell>

            {props.customPortion > 0 && (
              <TableCell>
                {getValue(
                  props,
                  "Zuccheri (g)",
                  props.customPortion,
                  props.tot_grammi
                )}
                g (di cui zuccheri)
              </TableCell>
            )}
          </TableRow>

          <TableRow>
            <TableCell>PROTEINE</TableCell>
            <TableCell>
              {getValue(props, "Proteine (g)", 100, props.tot_grammi)} g
            </TableCell>

            {props.customPortion > 0 && (
              <TableCell>
                {getValue(
                  props,
                  "Proteine (g)",
                  props.customPortion,
                  props.tot_grammi
                )}
                g
              </TableCell>
            )}
          </TableRow>

          <TableRow>
            <TableCell>GRASSI</TableCell>
            <TableCell>
              {getValue(props, "Lipidi, totali (g)", 100, props.tot_grammi)} g
            </TableCell>

            {props.customPortion > 0 && (
              <TableCell>
                {getValue(
                  props,
                  "Lipidi, totali (g)",
                  props.customPortion,
                  props.tot_grammi
                )}
                g
              </TableCell>
            )}
          </TableRow>

          <TableRow>
            <TableCell></TableCell>

            <TableCell>
              {getValue(
                props,
                "Acidi grassi, saturi (g)",
                100,
                props.tot_grammi
              )}
              g
            </TableCell>

            {props.customPortion > 0 && (
              <TableCell>
                {getValue(
                  props,
                  "Acidi grassi, saturi (g)",
                  props.customPortion,
                  props.tot_grammi
                )}
                g
              </TableCell>
            )}
          </TableRow>

          <TableRow>
            <TableCell>FIBRA</TableCell>

            <TableCell>
              {getValue(props, "Fibra alimentare (g)", 100, props.tot_grammi)} g
            </TableCell>

            {props.customPortion > 0 && (
              <TableCell>
                {getValue(
                  props,
                  "Fibra alimentare (g)",
                  props.customPortion,
                  props.tot_grammi
                )}
                g
              </TableCell>
            )}
          </TableRow>

          <TableRow>
            <TableCell>SALE</TableCell>

            <TableCell>
              {getValue(props, "Sale (NaCl) (g)", 100, props.tot_grammi)} g
            </TableCell>

            {props.customPortion > 0 && (
              <TableCell>
                {getValue(
                  props,
                  "Sale (NaCl) (g)",
                  props.customPortion,
                  props.tot_grammi
                )}
                g
              </TableCell>
            )}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  </div>
));
export default TotalLabel;

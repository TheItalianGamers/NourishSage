import { useState } from "react";

import Meal from "./components/Meal";

// ui components
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  Paper,
  TableRow,
  Button,
} from "@mui/material";

const InsertionMenu = (props: any) => {
  const [carboidrati, setCarboidrati] = useState({
    colazione: 0.0,
    pranzo: 0.0,
    spuntino: 0.0,
    cena: 0.0,
  });

  const [proteine, setProteine] = useState({
    colazione: 0.0,
    pranzo: 0.0,
    spuntino: 0.0,
    cena: 0.0,
  });

  const [lipidi, setLipidi] = useState({
    colazione: 0.0,
    pranzo: 0.0,
    spuntino: 0.0,
    cena: 0.0,
  });

  const [carboidratiTot, setCarboidratiTot] = useState(0.0);
  const [proteineTot, setProteineTot] = useState(0.0);
  const [lipidiTot, setLipidiTot] = useState(0.0);

  let calorieTot: number = carboidratiTot * 4 + proteineTot * 4 + lipidiTot * 9;
  let deficit: number = calorieTot - props.profileInfo["fabbisogno"];

  function calcTotal() {
    setCarboidratiTot(
      carboidrati.colazione +
        carboidrati.pranzo +
        carboidrati.spuntino +
        carboidrati.cena
    );
    setProteineTot(
      proteine.colazione + proteine.pranzo + proteine.spuntino + proteine.cena
    );
    setLipidiTot(
      lipidi.colazione + lipidi.pranzo + lipidi.spuntino + lipidi.cena
    );
  }

  function getCarboDescription(): string {
    let calorieCarbo: number = carboidratiTot * 4;
    let percentuale = (calorieCarbo / props.profileInfo["fabbisogno"]) * 100;

    if (percentuale >= 45 && percentuale <= 60)
      return ` | ${percentuale.toFixed(1)} %|  Apporto regolare (45-60%)`;
    else if (percentuale > 60 && percentuale <= 65)
      return ` | ${percentuale.toFixed(
        1
      )}% | L'apporto di carboidrati va bene se si effettua un'attività fisica intensa (60-65%)`;
    else if (percentuale > 65)
      return ` | ${percentuale.toFixed(
        1
      )}% | Apporto di carboidrati sovraelevato (>65%)`;

    return ` | ${percentuale.toFixed(
      1
    )}% | Aumentare l'apporto di carboidrati (<40%)`;
  }

  function getValuesForProteins(): any {
    if (props.profileInfo["età"] == 0) {
      return [9, 11];
    }

    if (props.profileInfo["età"] >= 1 && props.profileInfo["età"] <= 3)
      return [11, 14];

    if (props.profileInfo["età"] > 3 && props.profileInfo["età"] <= 6)
      return [16, 19];

    if (props.profileInfo["età"] > 6 && props.profileInfo["età"] <= 10)
      return [25, 31];

    if (props.profileInfo["età"] > 10 && props.profileInfo["età"] <= 14)
      return [39, 48];

    if (props.profileInfo["età"] > 14 && props.profileInfo["età"] <= 17) {
      if (props.profileInfo["sesso"] == "M") return [50, 62];
      else return [40, 50];
    }

    if (props.profileInfo["età"] && props.profileInfo["sesso"] == "M")
      return [50, 63];

    if (props.profileInfo["età"] && props.profileInfo["sesso"] == "F")
      return [43, 54];

    return [];
  }

  function getProteinDescription(): string {
    // Il valore a sinistra è quello medio, quello a destra è quello raccomandato: le proteine devon stare dentro questo range
    let values: Array<number> = [...getValuesForProteins()];

    if (proteineTot >= values[0] && proteineTot <= values[1])
      return `Tra L'assunzione di proteine è regolare ! (${values[0]} - ${values[1]} g. al giorno) `;
    else if (proteineTot < values[0])
      return `Assunzione inferiore ai livelli raccomandati! ( < ${values[0]} g)`;

    return `Assunzione superiore ai livelli raccomandati! ( > ${values[1]} g)`;
  }

  function getValuesForFats(): any {
    if (props.profileInfo["età"] <= 3) return [35, 40];

    return [20, 35];
  }

  function getFatsDescription(): string {
    // percentuali di assunzione consigliata
    let values: Array<number> = [...getValuesForFats()];
    let calorieLipidi = lipidiTot * 9;
    let percentuale = Number(
      ((calorieLipidi / props.profileInfo["fabbisogno"]) * 100).toFixed(1)
    );

    if (percentuale >= values[0] && percentuale <= values[1])
      return `|${percentuale}% | Assunzione regolare! (${values[0]}-${values[1]}%)`;
    else if (percentuale < values[0])
      return `| ${percentuale}% | Assunzione inferiore ai livelli raccomandati (<${values[0]}%)`;

    return `| ${percentuale}% | Assunzione superiore ai livelli raccomandati (>${values[1]}%)`;
  }

  function getDeficitDescription(): string {
    if (deficit <= -350 && deficit >= -500)
      return "dimagrimento e perdita di peso graduale (deficit di 350-500 kcal)";
    else if (deficit < -500)
      return `dimagrimento (Non si dovrebbe sottostare a un deficit di 500 kcal!)`;
    else if (deficit > 0) return "Le calorie introdotte superano il fabbisogno";

    return "";
  }

  return (
    <section className="my-6">
      <Meal
        type="colazione"
        customPortion={props.customPortion}
        productName={props.productName}
        alims={props.alims}
        dropUnitList={props.dropUnitList}
        profileInfo={props.profileInfo}
        carboidrati={carboidrati}
        setCarboidrati={setCarboidrati}
        proteine={proteine}
        setProteine={setProteine}
        lipidi={lipidi}
        setLipidi={setLipidi}
      />
      <Meal
        type="pranzo"
        customPortion={props.customPortion}
        productName={props.productName}
        alims={props.alims}
        dropUnitList={props.dropUnitList}
        profileInfo={props.profileInfo}
        carboidrati={carboidrati}
        setCarboidrati={setCarboidrati}
        proteine={proteine}
        setProteine={setProteine}
        lipidi={lipidi}
        setLipidi={setLipidi}
      />
      <Meal
        type="spuntino"
        customPortion={props.customPortion}
        productName={props.productName}
        alims={props.alims}
        dropUnitList={props.dropUnitList}
        profileInfo={props.profileInfo}
        carboidrati={carboidrati}
        setCarboidrati={setCarboidrati}
        proteine={proteine}
        setProteine={setProteine}
        lipidi={lipidi}
        setLipidi={setLipidi}
      />
      <Meal
        type="cena"
        customPortion={props.customPortion}
        productName={props.productName}
        alims={props.alims}
        dropUnitList={props.dropUnitList}
        profileInfo={props.profileInfo}
        carboidrati={carboidrati}
        setCarboidrati={setCarboidrati}
        proteine={proteine}
        setProteine={setProteine}
        lipidi={lipidi}
        setLipidi={setLipidi}
      />

      <div className="flex flex-row justify-end py-3 px-4">
        <Button variant="contained" size="large" onClick={calcTotal}>
          Calcola totale
        </Button>
      </div>

      {(carboidratiTot !== 0.0 || proteineTot !== 0.0 || lipidiTot !== 0) && (
        <div className="w-[500px] max-w-full my-2 flex flex-row mx-auto rounded-e-lg">
          <TableContainer component={Paper}>
            <Table size="medium" frame={true}>
              <TableHead>
                <TableRow>
                  <TableCell
                    align="center"
                    className="text-white font-sans uppercase my-3"
                  >
                    Dato
                  </TableCell>
                  <TableCell
                    align="center"
                    className="text-white font-sans uppercase my-3"
                  >
                    Valore
                  </TableCell>
                  <TableCell
                    align="center"
                    className="text-white font-sans uppercase my-3"
                  >
                    Indicazioni
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRow>
                  <TableCell>Carboidrati</TableCell>
                  <TableCell align="center">
                    {carboidratiTot.toFixed(1)} g
                  </TableCell>
                  <TableCell align="center">{getCarboDescription()}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Proteine</TableCell>
                  <TableCell align="center">
                    {proteineTot.toFixed(1)} g
                  </TableCell>
                  <TableCell align="center">
                    {getProteinDescription()}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Lipidi</TableCell>
                  <TableCell align="center">{lipidiTot.toFixed(1)} g</TableCell>
                  <TableCell align="center">{getFatsDescription()}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Calorie</TableCell>
                  <TableCell align="center">
                    {calorieTot.toFixed(1)}
                    &nbsp;kcal
                  </TableCell>

                  <TableCell align="center">
                    <p>
                      Deficit calorico: &nbsp;
                      {Math.abs(deficit)}
                      kcal: <br />
                      {getDeficitDescription()}
                    </p>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </section>
  );
};

export default InsertionMenu;

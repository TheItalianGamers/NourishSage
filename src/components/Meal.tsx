import { useState, useEffect } from "react";

// services
import { getValue, getTotalWeight } from "../services/LabelUtils";

// ui components
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";

// icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";

const Meal = (props: any) => {
  const [products, setProducts]: any = useState({});
  const [quantity, setQuantity]: any = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  let tot_grammi: number = getTotalWeight(props);

  function sumOfANutrient(nutrient: string) {
    let keys = Object.keys(products) as Array<keyof typeof products>;
    let sum: number = 0;

    keys.forEach((key) => {
      sum += products[key][nutrient] * quantity[key];
    });

    return sum;
  }

  function updateNutrients() {
    let tempCarbo = { ...props.carboidrati };
    tempCarbo[props.type] = sumOfANutrient("Glucidi, disponibili (g)");
    props.setCarboidrati({ ...tempCarbo });

    let tempProteine = { ...props.proteine };
    tempProteine[props.type] = sumOfANutrient("Proteine (g)");
    props.setProteine({ ...tempProteine });

    let tempLipidi = { ...props.lipidi };
    tempLipidi[props.type] = sumOfANutrient("Lipidi, totali (g)");
    props.setLipidi({ ...tempLipidi });
  }

  useEffect(updateNutrients, [products]);
  useEffect(updateNutrients, [quantity]);

  function getNutrients(): string {
    return `
    {
      "Energia, calorie (kcal)" : "${getValue(
        props,
        "Energia, calorie (kcal)",
        props.customPortion,
        tot_grammi
      )}",
      
      "Energia, kilojoules (kJ)": "${getValue(
        props,
        "Energia, kilojoules (kJ)",
        props.customPortion,
        tot_grammi
      )}",

      "Glucidi, disponibili (g)": "${getValue(
        props,
        "Glucidi, disponibili (g)",
        props.customPortion,
        tot_grammi
      )}",

      "Zuccheri (g)": "${getValue(
        props,
        "Zuccheri (g)",
        props.customPortion,
        tot_grammi
      )}",

      "Proteine (g)": "${getValue(
        props,
        "Proteine (g)",
        props.customPortion,
        tot_grammi
      )}",

      "Lipidi, totali (g)": "${getValue(
        props,
        "Lipidi, totali (g)",
        props.customPortion,
        tot_grammi
      )}",

      "Acidi grassi, saturi (g)": "${getValue(
        props,
        "Acidi grassi, saturi (g)",
        props.customPortion,
        tot_grammi
      )}",

      "Fibra alimentare (g)": "${getValue(
        props,
        "Fibra alimentare (g)",
        props.customPortion,
        tot_grammi
      )}",

      "Sale (NaCl) (g)": "${getValue(
        props,
        "Sale (NaCl) (g)",
        props.customPortion,
        tot_grammi
      )}",

      "Quantità": "${props.customPortion}"

    }
    `;
  }

  function addProduct() {
    if (props.profileInfo["fabbisogno"] == 0) {
      setErrorMessage("Impostare prima un possibile profilo!");
      return;
    }

    if (props.productName === "") {
      setErrorMessage("Creare un prodotto da inserire!");
      return;
    }

    let keyList = Object.keys(products) as Array<keyof typeof products>;

    if (keyList.includes(props.productName)) {
      products[props.productName] = { ...JSON.parse(getNutrients()) };
      setProducts({ ...products });

      quantity[props.productName] = 1;
      setQuantity({ ...quantity });
    } else {
      const tempProducts = { ...products };
      tempProducts[props.productName] = { ...JSON.parse(getNutrients()) };

      setProducts({ ...tempProducts });

      const tempQuantity = { ...quantity };
      tempQuantity[props.productName] = 1;

      setQuantity({ ...tempQuantity });
    }
  }

  function getProductsFromList() {
    let keyList = Object.keys(products) as Array<keyof typeof products>;
    return keyList.map((key: any, index: any) => (
      <li
        key={index}
        className="flex flex-row justify-between items-center bg-tig-dark-gray px-4 py-2 border-neutral-900 border-y"
      >
        <p className="text-center font-medium text-white font-sans uppercase text-lg my-3">
          {key}
        </p>
        <p className="text-center font-medium text-white font-sans uppercase text-lg my-3">
          porzione di {products[key]["Quantità"]} g
        </p>
        <TextField
          type="number"
          label="Quantità"
          size="small"
          value={quantity[key]}
          onChange={(event: any) => {
            let temp = { ...quantity };
            temp[key] = event.target.value;
            setQuantity({ ...temp });
          }}
          onBlur={(event: any) => {
            if (event.target.value < 1) {
              let temp = { ...quantity };
              temp[key] = 1;
              setQuantity({ ...temp });
            }
          }}
        ></TextField>
        <span
          className="cursor-pointer"
          onClick={() => {
            delete products[key];
            setProducts({ ...products });

            delete quantity[key];
            setQuantity({ ...quantity });
          }}
        >
          <DeleteIcon></DeleteIcon>
        </span>
      </li>
    ));
  }

  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <p className="font-sans font-medium uppercase">{props.type}</p>
        </AccordionSummary>

        <AccordionDetails>
          <Button variant="outlined" onClick={addProduct}>
            <AddCircleOutlineIcon />
            &nbsp;Aggiungi prodotto
          </Button>

          <ul className="my-2">{getProductsFromList()}</ul>
        </AccordionDetails>
      </Accordion>

      <Snackbar
        open={errorMessage !== ""}
        autoHideDuration={5000}
        onClose={() => setErrorMessage("")}
      >
        <Alert severity="error">{errorMessage}</Alert>
      </Snackbar>
    </>
  );
};

export default Meal;

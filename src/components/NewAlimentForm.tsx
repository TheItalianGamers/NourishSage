import { addCustomAliment } from "../services/ReadExcel";
import { TextField, Button, Switch } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";

const NewAlimentForm = (props: any) => {
  const [isSolid, setSolid] = useState(true);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm();

  function onSubmit(data: any) {
    let isValid = true;
    Object.keys(data).forEach((name: any, index: any) => {
      if (name !== "Nome" && (!isSolid || name !== "Densità")) {
        if (
          isNaN(data[name].replace(",", ".")) &&
          data[name] !== "tr." &&
          data[name] !== "nd"
        ) {
          setError(name, {
            type: "custom",
            message: "Il valore inserito non è valido",
          });
          isValid = false;
        }
        if (Number(data[name]) < 0) {
          setError(name, {
            type: "custom",
            message: "Il valore non può essere inferiore di 0",
          });
          isValid = false;
        }
      }
    });
    if (Number(data["Energia, calorie (kcal)"]) < 0) {
      setError("Energia, calorie (kcal)", {
        type: "custom",
        message: "Il dato non può essere minore di 0",
      });
      isValid = false;
    }

    if (isValid) {
      reset();
      addCustomAliment(
        {
          Nome: data["Nome"],
          "Energia, calorie (kcal)": data["Energia, calorie (kcal)"],
          "Energia, kilojoules (kJ)": data["Energia, kilojoules (kJ)"],
          "Glucidi, disponibili (g)": data["Glucidi, disponibili (g)"],
          "Zuccheri (g)": data["Zuccheri (g)"],
          "Proteine (g)": data["Proteine (g)"],
          "Lipidi, totali (g)": data["Lipidi, totali (g)"],
          "Acidi grassi, saturi (g)": data["Acidi grassi, saturi (g)"],
          "Fibra alimentare (g)": data["Fibra alimentare (g)"],
          "Sale (NaCl) (g)": data["Sale (NaCl) (g)"],
          Densità: data["Densità"] || "",
          "Unità di riferimento": isSolid
            ? "per 100 g di parte edibile"
            : "per 100 ml",
        },
        props.setList
      );
    }
  }

  return (
    <form
      autoComplete="off"
      className="flex flex-col gap-3 w-[100%] items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        required
        label="Nome"
        placeholder="Acciuga sott'olio, sgocciolata"
        variant="outlined"
        fullWidth
        {...register("Nome")}
        error={errors["Nome"] ? true : false}
        helperText={errors["Nome"]?.message?.toString() || ""}
      />
      <TextField
        required
        label="Energia, calorie (kcal)"
        placeholder="182"
        variant="outlined"
        fullWidth
        {...register("Energia, calorie (kcal)")}
        error={errors["Energia, calorie (kcal)"] ? true : false}
        helperText={
          errors["Energia, calorie (kcal)"]?.message?.toString() || ""
        }
      />
      <TextField
        required
        label="Energia, kilojoules (KJ)"
        placeholder="765"
        variant="outlined"
        fullWidth
        {...register("Energia, kilojoules (kJ)")}
        error={errors["Energia, kilojoules (kJ)"] ? true : false}
        helperText={
          errors["Energia, kilojoules (kJ)"]?.message?.toString() || ""
        }
      />
      <TextField
        required
        label="Glucidi, disponibili (g)"
        placeholder="0,2"
        variant="outlined"
        fullWidth
        {...register("Glucidi, disponibili (g)")}
        error={errors["Glucidi, disponibili (g)"] ? true : false}
        helperText={
          errors["Glucidi, disponibili (g)"]?.message?.toString() || ""
        }
      />
      <TextField
        required
        label="Zuccheri (g)"
        placeholder="0,1"
        variant="outlined"
        fullWidth
        {...register("Zuccheri (g)")}
        error={errors["Zuccheri (g)"] ? true : false}
        helperText={errors["Zuccheri (g)"]?.message?.toString() || ""}
      />
      <TextField
        required
        label="Proteine (g)"
        placeholder="26,4"
        variant="outlined"
        fullWidth
        {...register("Proteine (g)")}
        error={errors["Proteine (g)"] ? true : false}
        helperText={errors["Proteine (g)"]?.message?.toString() || ""}
      />
      <TextField
        required
        label="Lipidi, totali (g)"
        placeholder="8,5"
        variant="outlined"
        fullWidth
        {...register("Lipidi, totali (g)")}
        error={errors["Lipidi, totali (g)"] ? true : false}
        helperText={errors["Lipidi, totali (g)"]?.message?.toString() || ""}
      />
      <TextField
        required
        label="Acidi grassi, saturi (g)"
        placeholder="2,9"
        variant="outlined"
        fullWidth
        {...register("Acidi grassi, saturi (g)")}
        error={errors["Acidi grassi, saturi (g)"] ? true : false}
        helperText={
          errors["Acidi grassi, saturi (g)"]?.message?.toString() || ""
        }
      />
      <TextField
        required
        label="Fibra alimentare (g)"
        placeholder="0"
        variant="outlined"
        fullWidth
        {...register("Fibra alimentare (g)")}
        error={errors["Fibra alimentare (g)"] ? true : false}
        helperText={errors["Fibra alimentare (g)"]?.message?.toString() || ""}
      />
      <TextField
        required
        label="Sale (NaCl) (g)"
        placeholder="12"
        variant="outlined"
        fullWidth
        {...register("Sale (NaCl) (g)")}
        error={errors["Sale (NaCl) (g)"] ? true : false}
        helperText={errors["Sale (NaCl) (g)"]?.message?.toString() || ""}
      />
      <div className="flex items-center">
        <div>Liquido</div>
        <Switch onChange={() => setSolid(!isSolid)} checked={isSolid} />
        <div>Solido</div>
      </div>
      <TextField
        required
        disabled={isSolid}
        label="Densità"
        placeholder="12"
        variant="outlined"
        fullWidth
        {...register("Densità")}
        error={errors["Densità"] ? true : false}
        helperText={errors["Densità"]?.message?.toString() || ""}
      />
      <Button type="submit" variant="outlined">
        Aggiungi elemento
      </Button>
    </form>
  );
};

export default NewAlimentForm;

import { useState } from "react";

// Ui components
import { TextField, Typography, Switch, MenuItem, Button } from "@mui/material";

// icons
import CloseIcon from "@mui/icons-material/Close";

const Profile = (props: any) => {
  const [weight, setWeight] = useState(0.0);
  const [height, setHeight] = useState(0.0);
  const [sex, setSex] = useState("");
  const [age, setAge] = useState(0);
  const [laf, setLaf] = useState(0.0);
  const [lafDisabled, isLafDiasbled] = useState(true);
  const [energy, setEnergy] = useState(0.0);
  let imc: number = weight / (height / 100) ** 2;

  function imcDescription(): string {
    if (imc < 16.0) return "Grave magrezza";

    if (imc >= 16.0 && imc < 18.5) return "Sottopeso";

    if (imc >= 18.5 && imc < 25.0) return "Normopeso";

    if (imc >= 25.0 && imc < 30.0) return "Sovrappeso";

    return "Obeso";
  }

  function getEnergy() {
    // Il metabolismo basale si calcola secondo l'equazione M = (P*q) + m
    let q, m: number; // parametri

    if (
      weight === 0.0 ||
      height === 0.0 ||
      sex === "" ||
      age === 0 ||
      (laf === 0.0 && !lafDisabled)
    ) {
      alert("Devi finire di compilare!!!");
      return;
    }

    if (sex === "M") {
      if (age < 3) {
        q = 59.5;
        m = -31;
      } else if (age >= 3 && age <= 9) {
        q = 22.7;
        m = 504;
      } else if (age >= 10 && age <= 17) {
        q = 17.7;
        m = 650;
      } else if (age >= 18 && age <= 29) {
        q = 15.3;
        m = 679;
      } else if (age >= 30 && age <= 59) {
        q = 11.6;
        m = 879;
      } else if (age >= 60 && age <= 74) {
        q = 11.9;
        m = 700;
      } else {
        q = 8.4;
        m = 819;
      }
    } else {
      if (age < 3) {
        q = 58.3;
        m = -31;
      } else if (age >= 3 && age <= 9) {
        q = 20.3;
        m = 485;
      } else if (age >= 10 && age <= 17) {
        q = 13.4;
        m = 693;
      } else if (age >= 18 && age <= 29) {
        q = 14.7;
        m = 496;
      } else if (age >= 30 && age <= 59) {
        q = 8.7;
        m = 829;
      } else if (age >= 60 && age <= 74) {
        q = 9.2;
        m = 688;
      } else {
        q = 9.8;
        m = 624;
      }
    }

    if (imcDescription() !== "Normopeso") {
      sex == "M"
        ? setEnergy((height / 100) ** 2 * 700)
        : setEnergy((height / 100) ** 2 * 600);
    } else {
      setEnergy(weight * q + m);
    }
  }

  const prova = [
    "Sedentario",
    "Poco attivo",
    "Attivo/moderato",
    "Molto Attivo",
  ];
  const gino = ["Leggero", "moderato", "alto"];

  function getLaf() {
    if (age < 3) return [1.35, 1.39, 1.43];

    if (age >= 3 && age <= 9) return [1.42, 1.57, 1.69];

    if (age >= 10 && age <= 18) return [1.66, 1.73, 1.85];

    if (age >= 60) return [1.4, 1.5, 1.6, 1.75];

    return [1.45, 1.6, 1.75, 2.1];
  }

  return (
    <div className="w-[600px] max-w-full ">
      <div className=" w-full flex flex-row justify-end cursor-pointer">
        <span
          onClick={() => {
            props.setProfileClosed(true);
            props.setProfileInfo({
              peso: weight,
              altezza: height,
              sesso: sex,
              età: age,
              laf: getLaf(),
              fabbisogno: Math.round(energy),
            });
          }}
        >
          <CloseIcon></CloseIcon>
        </span>
      </div>

      <Typography variant="h6" align="center">
        Profilo:
      </Typography>

      <section className="flex flex-col gap-5 w-full">
        <TextField
          type="number"
          value={weight || ""}
          placeholder="(kg.)"
          label="Peso"
          autoComplete="off"
          fullWidth
          onChange={(event: any) => setWeight(event.target.value)}
          onBlur={(event: any) => {
            if (event.target.value < 1) setWeight(1);
            else if (event.target.value > 200) setWeight(200);
          }}
          variant="outlined"
        />

        <TextField
          type="number"
          value={height || ""}
          placeholder="(cm.)"
          label="Altezza"
          autoComplete="off"
          fullWidth
          onChange={(event: any) => setHeight(event.target.value)}
          onBlur={(event: any) => {
            if (event.target.value < 1) setHeight(1);
            else if (event.target.value > 220) setHeight(220);
          }}
          variant="outlined"
        />

        <TextField
          select
          value={sex}
          label="Sesso"
          fullWidth
          onChange={(event: any) => setSex(event.target.value)}
        >
          <MenuItem value={"ns"}>Non selezionato</MenuItem>
          <MenuItem value={"M"}>Maschio</MenuItem>
          <MenuItem value={"F"}>Femmina</MenuItem>
        </TextField>

        <TextField
          type="number"
          value={age || ""}
          label="Età"
          autoComplete="off"
          fullWidth
          onChange={(event: any) => setAge(event.target.value)}
          onBlur={(event: any) => {
            if (event.target.value < 0) setAge(0);
            else if (event.target.value > 120) setAge(120);
          }}
          variant="outlined"
        />

        <div className="flex flex-row justify-between items-center gap-3">
          <TextField
            select
            value={laf}
            label="LAF"
            fullWidth
            disabled={lafDisabled}
            onChange={(event: any) => setLaf(event.target.value)}
          >
            <MenuItem value={"0"}>Non selezionato</MenuItem>
            {getLaf().map((laf: number, index: number) => {
              return getLaf().length == 4 ? (
                <MenuItem key={index} value={laf}>
                  {prova[index]}
                </MenuItem>
              ) : (
                <MenuItem key={index} value={laf}>
                  {gino[index]}
                </MenuItem>
              );
            })}
          </TextField>

          <Switch onChange={() => isLafDiasbled(!lafDisabled)} />
        </div>

        <div className="p-4 flex flex-row justify-end">
          <Button
            variant="outlined"
            size="large"
            onClick={getEnergy}
            className="rounded bg-slate-900 px-6 py-2"
          >
            Calcola
          </Button>
        </div>
      </section>

      {energy !== 0.0 && (
        <div className="p-4 text-center">
          <Typography variant="h6">
            Metabolismo basale: {Math.round(energy)} Kcal/giorno
          </Typography>
          <Typography variant="h6">
            &nbsp;Fabbisogno Energetico:
            {laf == 0.0 ? Math.round(energy) : Math.round(energy * laf)}
            Kcal/giorno
          </Typography>
          <Typography variant="h6">
            Indice di massa corporea: {imc.toFixed(2)} ({imcDescription()})
          </Typography>
        </div>
      )}
    </div>
  );
};

export default Profile;

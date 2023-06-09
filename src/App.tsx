import { useEffect, useState } from "react";

//components
import Nav from "./components/Nav";
import Dropdown from "./components/Dropdown";
import SingleLabel from "./components/SingleLabel";
import TotalLabel from "./components/TotalLabel";
import Profile from "./Profile";
import InsertionMenu from "./InsertionMenu";
import {
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  IconButton,
  Divider,
} from "@mui/material";
// services
import { getFile } from "./services/ReadExcel";
import AlimentList from "./components/AlimentList";

import Dialog from "@mui/material/Dialog";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// icons
import PersonIcon from "@mui/icons-material/Person";
import CloseIcon from "@mui/icons-material/Close";
import NewAlimentForm from "./components/NewAlimentForm";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircleOutline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App() {
  const [updateCount, forceUpdate] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [list, setList] = useState([]);
  const [alims, setAlims] = useState([]);
  const [alimsToPass, setAlimsToPass] = useState([]);
  const [currentLabel, setCurrentLabel] = useState({ Nome: "" });
  const [dropUnit, setDropUnit] = useState(0);
  const [dropUnitList, setDropUnitList] = useState({});
  const [dropUnitListToPass, setDropUnitListToPass] = useState({});
  const [portion, setPortion] = useState(0);
  const [profileClosed, setProfileClosed] = useState(true);

  const [profileInfo, setProfileInfo] = useState({
    peso: 0.0,
    altezza: 0,
    sesso: "",
    età: 0,
    laf: 0.0,
    fabbisogno: 0.0,
  }); //fabbisogno calorico
  const [productName, setProductName] = useState("");
  const [tempName, setTempName] = useState("");
  const [inputNameOpened, setInputNameOpened] = useState(false);
  const [temp, setTemp] = useState(0);
  const [editMode, setEditMode] = useState("none");
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  if (list.length === 0) {
    getFile(setList);
  }

  function passToTotLabel() {
    if (tempName !== "") {
      setProductName(tempName);
      setAlimsToPass([...alims]);
      setDropUnitListToPass({ ...dropUnitList });
      setPortion(temp);
    }
  }

  useEffect(passToTotLabel, [inputNameOpened]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="flex flex-col items-center ">
        <Nav
          setInputValue={setInputValue}
          list={JSON.stringify(list)}
          setEditOpen={() => {
            setEditMode("edit");
          }}
          setDropdownOpen={setDropdownOpen}
        />
      </div>

      {alims.length === 0 ? (
        <div className="flex justify-center text-white my-5">
          <Typography variant="h6">
            Benvenuto!!! Per iniziare selezionare un alimento uno o più alimenti
            dalla barra di ricerca
          </Typography>
        </div>
      ) : (
        <div>
          <AlimentList
            alims={alims}
            setAlims={setAlims}
            currentLabel={currentLabel}
            setCurrentLabel={setCurrentLabel}
            setDropUnit={setDropUnit}
            dropUnitList={dropUnitList}
            setDropUnitList={setDropUnitList}
          />

          <Dialog open={currentLabel.Nome !== ""} maxWidth={false}>
            <div className="flex justify-end px-2 py-1">
              <IconButton onClick={() => setCurrentLabel({ Nome: "" })}>
                <CloseIcon />
              </IconButton>
            </div>

            {currentLabel.Nome !== "" && (
              <div className="p-2">
                <SingleLabel currentLabel={currentLabel} dropUnit={dropUnit} />
              </div>
            )}
          </Dialog>

          <div className="flex items-center gap-3">
            <TextField
              type="number"
              placeholder="0"
              label="Porzione di prodotto (g)"
              value={temp || ""}
              autoComplete="off"
              onChange={(event: any) => setTemp(event.target.value)}
              onBlur={(event: any) => {
                if (event.target.value < 0) setTemp(0);
              }}
              variant="outlined"
              InputProps={{ inputProps: { min: 0 } }}
            />

            <Button
              onClick={() => setInputNameOpened(true)}
              variant="outlined"
              size="large"
            >
              Crea etichetta totale
            </Button>
          </div>

          {/* Inserimento nome */}

          <Dialog
            open={inputNameOpened}
            onKeyDown={(event: any) => {
              if (event.keyCode == 27) {
                setInputNameOpened(false);
                setTempName("");
              }
              if (event.key == "Enter") {
                setInputNameOpened(false);
                event.preventDefault();
              }
            }}
          >
            <div className="w-[300px] p-5 flex flex-col gap-2">
              <TextField
                placeholder="Acciuga sott'olio, sgocciolata"
                label="Nome dell'alimento"
                fullWidth
                value={tempName}
                onChange={(event: any) => setTempName(event.target.value)}
              ></TextField>

              <div className="flex flex-row justify-between gap-2">
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => {
                    setInputNameOpened(false);
                    setTempName("");
                  }}
                >
                  Annulla
                </Button>
                <Button
                  variant="outlined"
                  color="success"
                  onClick={() => setInputNameOpened(false)}
                >
                  Conferma
                </Button>
              </div>
            </div>
          </Dialog>

          {alimsToPass.length > 0 && (
            <TotalLabel
              productName={productName}
              alims={alimsToPass}
              setAlims={setAlimsToPass}
              dropUnitList={dropUnitListToPass}
              customPortion={portion}
            />
          )}

          {/* scelta menù */}

          <div className="flex flex-row gap-5 my-8 p-1 ">
            <span
              onClick={() => setProfileClosed(false)}
              className="cursor-pointer"
            >
              <PersonIcon fontSize="large" />
            </span>

            <Dialog
              open={!profileClosed}
              onKeyDown={(event: any) => {
                if (event.keyCode == 27) setProfileClosed(true);
              }}
            >
              <div className="p-5">
                <Profile
                  setProfileClosed={setProfileClosed}
                  profileInfo={profileInfo}
                  setProfileInfo={setProfileInfo}
                />
              </div>
            </Dialog>

            <div className="flex-1">
              <Typography variant="h6">
                Fabbisogno di riferimento: {profileInfo["fabbisogno"]} kcal
              </Typography>
              <InsertionMenu
                profileInfo={profileInfo}
                customPortion={portion}
                productName={productName}
                alims={alims}
                dropUnitList={dropUnitListToPass}
              />
            </div>
          </div>
        </div>
      )}
      <Dialog
        open={isDropdownOpen}
        onKeyDown={(event: any) => {
          if (event.keyCode == 27) setDropdownOpen(false);
        }}
      >
        <div className="p-5 flex flex-col gap-4 overflow-y-hidden">
          <div className="flex justify-end px-2 py-1">
            <IconButton onClick={() => setDropdownOpen(false)}>
              <CloseIcon />
            </IconButton>
          </div>
          {isDropdownOpen && (
            <Dropdown
              inputValue={inputValue}
              alims={alims}
              setAlims={setAlims}
              list={JSON.stringify(list)}
            />
          )}
        </div>
      </Dialog>
      <Dialog
        open={editMode === "edit"}
        onKeyDown={(event: any) => {
          if (event.keyCode == 27) setEditMode("none");
        }}
      >
        <div className="p-5 flex flex-col gap-4">
          <div className="flex justify-end px-2 py-1">
            <IconButton onClick={() => setEditMode("none")}>
              <CloseIcon />
            </IconButton>
          </div>
          <div className="flex gap-1">
            <Button
              startIcon={<AddCircleOutlineIcon />}
              variant="outlined"
              color="success"
              onClick={() => {
                setEditMode("add");
              }}
            >
              Aggiungi un alimento
            </Button>
            <Button
              startIcon={<RemoveCircleOutlineIcon />}
              variant="outlined"
              color="error"
              onClick={() => {
                setEditMode("removeAllConfirm");
              }}
            >
              Rimuovi tutti gli alimenti
            </Button>
          </div>
          <List>
            {editMode === "edit" &&
              JSON.parse(localStorage.getItem("aliments") || "[]").map(
                (el: any, index: any) => {
                  return (
                    <>
                      <ListItem
                        key={index}
                        secondaryAction={
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => {
                              const aliments = JSON.parse(
                                localStorage.getItem("aliments") || "[]"
                              );
                              aliments.splice(index, 1);
                              localStorage.setItem(
                                "aliments",
                                JSON.stringify(aliments)
                              );
                              forceUpdate(updateCount + 1);
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        }
                      >
                        {el["Nome"] || "TEST"}
                      </ListItem>
                      <Divider />
                    </>
                  );
                }
              )}
          </List>
        </div>
      </Dialog>

      <Dialog
        open={editMode === "removeAllConfirm"}
        onKeyDown={(event: any) => {
          if (event.keyCode == 27) setEditMode("edit");
        }}
      >
        <div className="p-5">
          <p className="text-red-500 font-bold">
            CONFERMA DI VOLER CANCELLARE TUTTI GLI ALIMENTI
          </p>
          <div className="flex justify-between">
            <IconButton onClick={() => setEditMode("edit")} color="error">
              <CancelIcon fontSize="large" />
            </IconButton>
            <IconButton
              onClick={() => {
                localStorage.clear();
                setEditMode("edit");
              }}
              color="success"
            >
              <CheckCircleIcon fontSize="large" />
            </IconButton>
          </div>
        </div>
      </Dialog>
      <Dialog
        open={editMode === "add"}
        onKeyDown={(event: any) => {
          if (event.keyCode == 27) setEditMode("edit");
        }}
      >
        <div className="p-3">
          <div className="flex justify-end px-2 py-1">
            <IconButton onClick={() => setEditMode("edit")}>
              <CloseIcon />
            </IconButton>
          </div>
          <div className="text-xs mb-2">
            CONTIENE TRACCE = "tr." | NON DATO = "nd"
          </div>
          <NewAlimentForm setList={setList} list={list} />
        </div>
      </Dialog>
    </ThemeProvider>
  );
}

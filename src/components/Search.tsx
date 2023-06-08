import { TextField } from "@mui/material";

const Search = (props: any) => {
  return (
    <div className="w-full">
      <TextField
        placeholder={"Acciuga sott'olio, sgocciolata"}
        name={props.name}
        id={props.name}
        label="Barra di ricerca"
        autoComplete="off"
        onChange={(event) => props.setInputValue(event.target.value)}
        variant="outlined"
        fullWidth
        onKeyDown={(event: any) => {
          if (event.key === "Enter") props.setDropdownOpen(true);
        }}
      />
    </div>
  );
};

export default Search;

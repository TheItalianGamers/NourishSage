import { useState } from "react";

const InputFile = (props: any) => {
  const [fileValid, setFileValid] = useState(false);
  return (
    <div>
      <label
        htmlFor={props.id}
        className="rounded bg-tig-dark-gray text-white p-3 hover:brightness-50 relative"
      >
        {fileValid ? "File caricato" : "Inserisci il file excel"}
        <input
          type="file"
          onChange={(e) => {
            if (props.selectFile(e)) setFileValid(true);
            else setFileValid(false);
          }}
          className="absolute block left-0 top-0 w-full h-full opacity-0"
          id={props.id}
        />
      </label>
    </div>
  );
};

export default InputFile;

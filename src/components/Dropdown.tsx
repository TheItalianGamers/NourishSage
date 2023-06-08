import { Divider } from "@mui/material";

const Dropdown = (props: any) => {
  const list = JSON.parse(props.list);

  function isPresent(key: string) {
    props.alims.forEach((alim: string) => {
      if (alim === key) {
        return true;
      }
    });

    return false;
  }

  return (
    <ul className="  z-50 w-full max-h-full overflow-y-auto text-white flex flex-col gap-2 p-2 scroll ">
      {list.map((el: any, index: number) => {
        if (el.Nome.toLowerCase().startsWith(props.inputValue.toLowerCase())) {
          return (
            <>
              <li
                key={index}
                onClick={() => {
                  if (
                    props.alims.filter((key: any) => key.Nome === el.Nome)
                      .length < 1
                  )
                    props.setAlims([...props.alims, el]);
                }}
                className="cursor-pointer hover:bg-tig-dark-gray flex flex-row gap-3"
              >
                <p>{el.Nome}</p>
              </li>
              <Divider />
            </>
          );
        }
      })}
    </ul>
  );
};

export default Dropdown;

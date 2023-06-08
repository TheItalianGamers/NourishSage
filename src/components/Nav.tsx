import Search from "./Search";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Nav = (props: any) => {
  return (
    <div className="flex justify-center items-center gap-5 px-4 py-2 bg-tig-dark-gray w-full">
      <Search
        name="cerca"
        setInputValue={props.setInputValue}
        setDropdownOpen={props.setDropdownOpen}
      />
      <IconButton onClick={() => props.setDropdownOpen(true)}>
        <SearchIcon />
      </IconButton>
      <IconButton onClick={() => props.setEditOpen(true)}>
        <EditIcon />
      </IconButton>
    </div>
  );
};

export default Nav;

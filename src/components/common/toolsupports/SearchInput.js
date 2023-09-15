import React from "react";
import { alpha, styled } from "@mui/material/styles";
import { InputBase } from "@mui/material";
import { Search } from "@styled-icons/evaicons-solid";

const SearchBox = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 20,
  border: 1,
  borderStyle: "solid",
  borderColor: alpha(theme.palette.text.third, 0.25),
  backgroundColor: theme.palette.background.primary,
  "&:hover": {
    backgroundColor: theme.palette.background.secondary,
  },
  marginRight: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.text.third,
  zIndex: 99,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      borderRadius: 20,
      "&:focus": {
        width: "24ch",
        borderRadius: 20,
        backgroundColor: theme.palette.background.secondary,
      },
    },
  },
}));

const SearchInput = () => {
  return (
    <SearchBox>
      <SearchIconWrapper>
        <Search width={24} />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
      />
    </SearchBox>
  );
};

export default SearchInput;

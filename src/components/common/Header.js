import { Box, IconButton, Typography, useTheme } from "@mui/material";
import React from "react";
import SearchInput from "./toolsupports/SearchInput";
import FilterData from "./toolsupports/FilterData";
import { ArrowLeft } from "@styled-icons/bootstrap";
import { history } from "../AppRouter";

const Header = ({ showBack, title, subTitle, showTool }) => {
  const theme = useTheme();
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      padding={1}
      marginX={2}
    >
      <Box display="flex" alignItems="center" gap={2}>
        {showBack ? (
          <IconButton
            aria-label="back"
            sx={{ border: 1, color: theme.palette.text.buttonText }}
            onClick={() => history.back()}
          >
            <ArrowLeft width={24} />
          </IconButton>
        ) : null}

        <Box>
          <Typography
            color={theme.palette.text.active}
            fontWeight="bold"
            fontSize={36}
          >
            {title}
          </Typography>
          <Typography
            color={theme.palette.text.third}
            fontWeight="regular"
            fontSize={18}
          >
            {subTitle}
          </Typography>
        </Box>
      </Box>

      {/* Search Box*/}
      {showTool ? (
        <Box display="flex" alignItems="center" gap={1}>
          <SearchInput />
          <FilterData />
        </Box>
      ) : null}
    </Box>
  );
};

export default Header;

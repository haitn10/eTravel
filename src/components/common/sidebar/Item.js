import React from "react";
import { Typography, alpha, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { MenuItem } from "react-pro-sidebar";

const Item = ({ title, icon, linkUrl, subMenu, selected, setSelected }) => {
  const theme = useTheme();
  console.log(linkUrl);
  return (
    <MenuItem
      icon={icon}
      component={<Link to={linkUrl} onClick={() => setSelected(title)} />}
      style={{
        color: selected ? theme.palette.text.active : undefined,
        backgroundColor: selected
          ? alpha(theme.palette.background.hovered, 0.05)
          : undefined,
      }}
      active={selected}
    >
      <Typography
        fontWeight={selected ? "bold" : "medium"}
        color="inherit"
        fontSize={subMenu ? "0.85rem" : "1rem"}
      >
        {title}
      </Typography>
    </MenuItem>
  );
};

export default Item;

import React, { useState } from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { MenuItem } from "react-pro-sidebar";

const Item = ({ showTitle, title, icon }) => {
  const [active, setActive] = useState(false);
  return (
    <MenuItem icon={icon} component={<Link to="/home" />} active={active}>
      {showTitle ? null : (
        <Typography fontWeight={active ? "bold" : "medium"} color="inherit">
          {title}
        </Typography>
      )}
    </MenuItem>
  );
};

export default Item;

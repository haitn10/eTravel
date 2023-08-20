import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router";

const SubItems = ({ options, isNonMobile, url }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [subActive, setSubActive] = useState("");

  return (
    <List style={{ marginLeft: 10 }}>
      {options &&
        options.map(({ subTitle, subIcon, subUrl }) => {
          const lcTitle = subTitle.toLowerCase();
          return (
            <ListItem
              key={subTitle}
              disablePadding
              onClick={() => {
                navigate(`${url}${subUrl}`);
                setSubActive(lcTitle);
              }}
              sx={{
                ":hover": {
                  color: theme.palette.text.active,
                  backgroundColor: theme.palette.background.secondary,
                },
                color:
                  subActive === lcTitle
                    ? theme.palette.text.active
                    : theme.palette.text.secondary,
                paddingX: isNonMobile ? 2 : 0,
                marginLeft: isNonMobile ? 0 : "0.75rem",
              }}
            >
              <ListItemIcon
                sx={{
                  color: "inherit",
                }}
              >
                {subIcon}
              </ListItemIcon>
              {isNonMobile ? (
                <ListItemText
                  primary={subTitle}
                  primaryTypographyProps={
                    subActive === lcTitle
                      ? { fontWeight: "700", minWidth: 150 }
                      : { fontWeight: "500", minWidth: 150 }
                  }
                />
              ) : null}
            </ListItem>
          );
        })}
    </List>
  );
};

export default SubItems;

import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import logo from "../../../assets/etravel-logo.png";

import DoDisturbOnOutlinedIcon from "@mui/icons-material/DoDisturbOnOutlined";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";

import tabsItem from "../../../constants/tabsItem";
import SubItems from "./subItems";
import { useNavigate } from "react-router-dom";

const Sidebar = ({
  isNonMobile,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const theme = useTheme();
  const [active, setActive] = useState("home");
  const navigate = useNavigate();
  return (
    <Box component="nav">
      <Drawer
        open={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        variant="persistent"
        anchor="left"
        sx={{
          width: drawerWidth,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
      >
        <Box>
          {/* Logo */}
          <Box
            margin={2}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box display="flex" alignItems="center" justifyContent="center">
              {isNonMobile ? (
                <img
                  src={logo}
                  alt="logo"
                  style={{ maxHeight: 150, maxWidth: 150 }}
                />
              ) : (
                <img
                  src={logo}
                  alt="logo"
                  style={{ maxHeight: 60, maxWidth: 60 }}
                />
              )}
            </Box>
          </Box>

          <List>
            {tabsItem.map(({ id, title, icon, options }) => {
              const lcTitle = title.toLowerCase();
              return (
                <ListItem
                  key={id}
                  disablePadding
                  onClick={() => {
                    // navigate(`/${lcTitle}`);
                    setActive(lcTitle);
                  }}
                  sx={{
                    ":hover": {
                      color: theme.palette.text.active,
                    },
                    cursor: "pointer",
                    color:
                      active === lcTitle && options.length === 0
                        ? theme.palette.text.active
                        : theme.palette.text.secondary,
                    paddingY: "0.25rem",
                    flexDirection: "column",
                  }}
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    width={isNonMobile ? 260 : null}
                  >
                    <ListItemIcon
                      sx={{
                        ml: "1.5rem",
                        color: "inherit",
                      }}
                    >
                      {icon}
                    </ListItemIcon>
                    {isNonMobile ? (
                      <ListItemText
                        primary={title}
                        primaryTypographyProps={
                          active === lcTitle
                            ? { fontWeight: "700", fontSize: 17, minWidth: 150 }
                            : { fontWeight: "500", fontSize: 17, minWidth: 150 }
                        }
                      />
                    ) : null}

                    {isNonMobile && options.length > 0 ? (
                      active !== lcTitle ? (
                        <ListItemIcon
                          sx={{
                            display: "flex",
                            justifyContent: "end",
                          }}
                        >
                          <ControlPointOutlinedIcon color="error" />
                        </ListItemIcon>
                      ) : (
                        <ListItemIcon
                          sx={{
                            display: "flex",
                            justifyContent: "end",
                          }}
                        >
                          <DoDisturbOnOutlinedIcon color="error" />
                        </ListItemIcon>
                      )
                    ) : null}
                  </Box>
                  {options.length > 0 && active === lcTitle ? (
                    <SubItems options={options} isNonMobile={isNonMobile} />
                  ) : null}
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Sidebar;

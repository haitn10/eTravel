import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import { Sidebar, Menu, SubMenu, MenuItem } from "react-pro-sidebar";

import { MenuOutline } from "@styled-icons/evaicons-outline";
import { ErrorOutline } from "@styled-icons/material";
import { SignOut } from "@styled-icons/octicons";

import Item from "./Item";
import logo from "../../../assets/etravel-logo.png";
import tabItems from "../../../constants/tabsItem";
import { logOut } from "../../auth/action";
import { useDispatch } from "react-redux";

const SidebarApp = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Home");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const onLogout = () => {
    dispatch(logOut());
  };

  return (
    <Box display="flex" flexDirection="column" justifyContent="space-between">
      <Sidebar
        collapsed={isCollapsed}
        backgroundColor={theme.palette.background.primary}
      >
        <Menu
          iconShape="square"
          menuItemStyles={{
            root: {
              color: theme.palette.text.third,
            },
            button: {
              [`&:hover`]: {
                backgroundColor: alpha(theme.palette.background.hovered, 0.025),
              },
            },
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent={isCollapsed ? "center" : "space-between"}
            padding={1}
          >
            {!isCollapsed && (
              <Box ml={2}>
                <Typography
                  color={theme.palette.text.third}
                  fontWeight="medium"
                >
                  Tour Operator
                </Typography>
              </Box>
            )}

            <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
              <MenuOutline width={24} />
            </IconButton>
          </Box>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="Etravel Logo"
                  width="150px"
                  height="150px"
                  src={logo}
                />
              </Box>
            </Box>
          )}

          {tabItems.map((tab) => {
            if (tab.options.length > 0) {
              return (
                <SubMenu
                  key={tab.id}
                  label={
                    <Typography
                      fontWeight={false ? "bold" : "medium"}
                      color="inherit"
                    >
                      {tab.title}
                    </Typography>
                  }
                  icon={tab.icon}
                >
                  {tab.options.map((option, index) => (
                    <Item
                      key={index}
                      title={option.subTitle}
                      icon={option.subIcon}
                      linkUrl={option.subUrl}
                      subMenu={true}
                      selected={selected === option.subTitle}
                      setSelected={setSelected}
                    />
                  ))}
                </SubMenu>
              );
            } else {
              return (
                <Item
                  key={tab.id}
                  title={tab.title}
                  icon={tab.icon}
                  linkUrl={tab.url}
                  subMenu={false}
                  selected={selected === tab.title}
                  setSelected={setSelected}
                />
              );
            }
          })}
        </Menu>
      </Sidebar>
      <Box marginBottom={3}>
        <Sidebar
          collapsed={isCollapsed}
          backgroundColor={theme.palette.background.primary}
        >
          <Menu
            iconShape="square"
            menuItemStyles={{
              root: {
                color: theme.palette.text.third,
              },
              button: {
                [`&:hover`]: {
                  backgroundColor: alpha(
                    theme.palette.background.hovered,
                    0.025
                  ),
                },
              },
            }}
          >
            <MenuItem
              icon={<ErrorOutline width={24} />}
              onClick={() => setOpen(true)}
            >
              <Typography fontWeight="medium">Help & Information</Typography>
            </MenuItem>
            <MenuItem icon={<SignOut height={24} />} onClick={() => onLogout()}>
              <Typography fontWeight="medium">Log out</Typography>
            </MenuItem>
          </Menu>
        </Sidebar>
      </Box>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Help & Information"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The system helps manage all application information. You can perform
            basic operations to develop tours with the right voice for the
            language.
            <Typography fontWeight="medium">
              <strong>Call us: </strong>
              0971 520 977
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={() => setOpen(false)} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SidebarApp;

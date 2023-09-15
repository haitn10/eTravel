import { Box, IconButton, Typography, alpha, useTheme } from "@mui/material";
import React, { useState } from "react";
import { MenuOutline } from "@styled-icons/evaicons-outline";

import { Sidebar, Menu, SubMenu } from "react-pro-sidebar";
import logo from "../../../assets/etravel-logo.png";
import Item from "./Item";
import tabItems from "../../../constants/tabsItem";

const SidebarApp = () => {
  const theme = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
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
              backgroundColor: alpha(theme.palette.background.hovered, 0.05),
            },
          },
        }}
      >
        <Box
          display="flex"
          justifyContent={isCollapsed ? "center" : "flex-end"}
          padding={1}
        >
          <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
            <MenuOutline width={24} />
          </IconButton>
        </Box>

        {!isCollapsed && (
          <Box mb="25px">
            <Box display="flex" justifyContent="center" alignItems="center">
              <img alt="Etravel Logo" width="150px" height="150px" src={logo} />
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
                {tab.options.map((option) => (
                  <Item
                    key={option.id}
                    showTitle={false}
                    title={option.subTitle}
                    icon={option.subIcon}
                  />
                ))}
              </SubMenu>
            );
          } else {
            return (
              <Item
                key={tab.id}
                showTitle={isCollapsed}
                title={tab.title}
                icon={tab.icon}
              />
            );
          }
        })}
      </Menu>
    </Sidebar>
  );
};

export default SidebarApp;

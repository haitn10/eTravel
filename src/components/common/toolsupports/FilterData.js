import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { StyledMenu } from "../styled/StyledMenu";

const FilterData = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [statusChecked, setStatusChecked] = useState("All");
  const [paymentMethodChecked, setPaymentMethodChecked] = useState("All");

  const handleChangeStatus = (event) => {
    setStatusChecked(event.target.value);
  };
  const handleChangeMetohd = (event) => {
    setPaymentMethodChecked(event.target.value);
  };

  return (
    <Box>
      <Button
        variant="outlined"
        color="error"
        sx={{
          borderRadius: 20,
          height: 40,
        }}
        startIcon={<FilterAltOutlinedIcon />}
        onClick={handleClick}
      >
        <Typography fontWeight="medium">Filter</Typography>
      </Button>

      {/* FilterMenu */}
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginBottom={1} 
          paddingX={1}
        >
          <Box>
            <Typography fontSize={20} fontWeight="semiBold">
              Filter
            </Typography>
          </Box>

          {statusChecked !== "All" || paymentMethodChecked !== "All" ? (
            <Button
              variant="text"
              color="error"
              sx={{
                "&:hover": { bgcolor: theme.palette.background.primary },
                padding: 0,
              }}
              onClick={() => {
                setStatusChecked("All");
                setPaymentMethodChecked("All");
              }}
            >
              Clear
            </Button>
          ) : null}
        </Box>

        <Divider sx={{ marginBottom: 0.5 }} />

        <Box sx={{ display: "flex", flexDirection: "column", ml: 0.5 }}>
          <Box padding={0.5}>
            <Typography fontSize={16}>Payment Method</Typography>
          </Box>
          <MenuItem dense sx={{ borderRadius: 1 }}>
            <FormControlLabel
              label="All"
              control={
                <Checkbox
                  checked={paymentMethodChecked === "All"}
                  value="All"
                  onChange={handleChangeMetohd}
                />
              }
            />
          </MenuItem>

          <MenuItem dense sx={{ borderRadius: 1 }}>
            <FormControlLabel
              label="MasterCard"
              control={
                <Checkbox
                  checked={paymentMethodChecked === "MasterCard"}
                  value="MasterCard"
                  onChange={handleChangeMetohd}
                />
              }
            />
          </MenuItem>
          <MenuItem dense sx={{ borderRadius: 1 }}>
            <FormControlLabel
              label="Paypal"
              control={
                <Checkbox
                  checked={paymentMethodChecked === "Paypal"}
                  value="Paypal"
                  onChange={handleChangeMetohd}
                />
              }
            />
          </MenuItem>
        </Box>

        <Divider sx={{ marginY: 0.5 }} />

        <Box sx={{ display: "flex", flexDirection: "column", ml: 0.5 }}>
          <Box padding={0.5}>
            <Typography fontSize={16}>Status</Typography>
          </Box>
          <MenuItem dense sx={{ borderRadius: 1 }}>
            <FormControlLabel
              label="All"
              control={
                <Checkbox
                  checked={statusChecked === "All"}
                  value="All"
                  onChange={handleChangeStatus}
                />
              }
            />
          </MenuItem>

          <MenuItem dense sx={{ borderRadius: 1 }}>
            <FormControlLabel
              label="Active"
              control={
                <Checkbox
                  checked={statusChecked === "Active"}
                  value="Active"
                  onChange={handleChangeStatus}
                />
              }
            />
          </MenuItem>
          <MenuItem dense sx={{ borderRadius: 1 }}>
            <FormControlLabel
              label="Inactive"
              control={
                <Checkbox
                  checked={statusChecked === "Inactive"}
                  value="Inactive"
                  onChange={handleChangeStatus}
                />
              }
            />
          </MenuItem>
        </Box>
      </StyledMenu>
    </Box>
  );
};

export default FilterData;

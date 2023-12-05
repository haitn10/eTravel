import { Box, Typography, Skeleton, useTheme } from "@mui/material";
import React from "react";
import { DataGrid } from "@mui/x-data-grid";

import beacons from "../../../../constants/tables/beacons";

const BeaconSub = ({ values, loading, setDialog, setBeaconIndex }) => {
  const theme = useTheme();

  return (
    <Box>
      <Box marginBottom={1} display="flex" justifyContent="space-between">
        {loading ? (
          <Skeleton width={150} />
        ) : (
          <Typography
            fontSize={14}
            letterSpacing={0.5}
            fontWeight="medium"
            textTransform="uppercase"
            color={theme.palette.text.third}
          >
            Beacon Information
          </Typography>
        )}
      </Box>
      <Box width="99.5%">
        <DataGrid
          rowHeight={80}
          autoHeight
          disableColumnMenu
          disableRowSelectionOnClick
          columns={beacons}
          rows={values}
          loading={loading}
          pageSizeOptions={[5, 10]}
          onRowClick={(params) => {
            setBeaconIndex(params.id);
            setDialog(true);
          }}
          sx={{
            border: 0,
            minHeight: "60vh",
            "& .MuiDataGrid-row:hover": {
              cursor: "pointer",
            },
            "& .MuiDataGrid-cell:focus": {
              outline: "none",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default BeaconSub;

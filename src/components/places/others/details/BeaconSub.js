import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
  Skeleton,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

import beacons from "../../../../constants/tables/beacons";
import { updatePlace } from "../../action";
import CustomNoRowsOverlay from "../../../common/CustomNoRowsOverlay";

const BeaconSub = ({
  placeName,
  values,
  loading,
  getValues,
  setValues,
  setDialog,
  locationIndex,
  setBeaconId,
  update,
  setUpdate,
  notification,
  setNotification,
}) => {
  const theme = useTheme();
  const [popupConfirm, setPopupConfirm] = useState(false);

  const onConfirm = async () => {
    let dataUpdate = {
      name: getValues("name"),
      longitude: getValues("longitude"),
      latitude: getValues("latitude"),
      address: getValues("address"),
      hour: getValues("hour"),
      googlePlaceId: getValues("googlePlaceId"),
      price: getValues("price"),
      entryTicket: getValues("entryTicket"),
      placeCategories: [],
      placeImages: [],
      placeDescriptions: [],
      placeTimes: [],
      placeItems: [],
    };

    for (const cate of getValues("placeCategories")) {
      dataUpdate.placeCategories.push({ id: cate.id });
    }

    for (const img of getValues("placeImages")) {
      dataUpdate.placeImages.push({
        image: img.image,
        isPrimary: img.isPrimary,
      });
    }

    for (const desc of getValues("placeDescriptions")) {
      dataUpdate.placeDescriptions.push({
        languageCode: desc.languageCode,
        voiceFile:
          desc.voiceFile instanceof File ? desc.voiceFile.name : desc.voiceFile,
        name: desc.name,
        description: desc.description,
        status: desc.status,
      });
    }

    for (const time of getValues("placeTimes")) {
      dataUpdate.placeTimes.push({
        daysOfWeek: time.daysOfWeek,
        openTime: time.openTime,
        endTime: time.endTime,
      });
    }

    for (const item of getValues("placeItems").filter(
      (_, index) => index !== locationIndex
    )) {
      dataUpdate.placeItems.push({
        name: item.name,
        beaconId: item.beaconId,
        image: item.image,
        startTime: item.startTime,
        endTime: item.endTime,
        beaconMajorNumber: item.beaconMajorNumber,
        beaconMinorNumber: item.beaconMinorNumber,
        itemDescriptions: item.itemDescriptions,
      });
    }

    try {
      setUpdate(true);
      const res = await updatePlace(getValues().id, dataUpdate);
      if (res) {
        setValues(res.place);
        setNotification({
          ...notification,
          errorState: true,
          errorMessage: "Remove location successfully!",
          status: "success",
        });
        setUpdate(false);
        setPopupConfirm(false);
      }
    } catch (e) {
      setUpdate(false);
      setNotification({
        ...notification,
        errorState: true,
        errorMessage: "Something went wrong with processing!",
        status: "error",
      });
    }
  };

  const action = [
    {
      field: "action",
      headerName: "Action",
      width: 100,
      align: "center",
      headerAlign: "center",
      sortable: false,
      renderCell: (params) => {
        return (
          <Button
            aria-label="more"
            variant="outlined"
            color="error"
            onClick={async (event) => {
              event.stopPropagation();
              setBeaconId(params.id);
              setPopupConfirm(true);
            }}
          >
            Remove
          </Button>
        );
      },
    },
  ];
  return (
    <Box>
      <Dialog open={popupConfirm} onClose={() => setPopupConfirm(false)}>
        <DialogTitle>Are you sure to remove the location?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`Your actions will cause this location to no longer be used for "${placeName}" place.`}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ padding: 3 }}>
          <Button
            variant="outlined"
            onClick={onConfirm}
            disabled={update}
            autoFocus
          >
            Confirm
          </Button>
          <Button
            variant="outlined"
            color="error"
            disabled={update}
            onClick={() => setPopupConfirm(false)}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
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
            Location List
          </Typography>
        )}
      </Box>
      <Box width="99.5%">
        <DataGrid
          rowHeight={80}
          autoHeight
          disableColumnMenu
          disableRowSelectionOnClick
          columns={beacons.concat(action)}
          rows={values}
          loading={loading}
          onRowClick={(params) => {
            setBeaconId(params.id);
            setDialog(true);
          }}
          slots={{ noRowsOverlay: CustomNoRowsOverlay }}
          sx={{
            border: 0,
            minHeight: "55vh",
            "& .MuiDataGrid-row:hover": {
              cursor: "pointer",
            },
            "& .MuiDataGrid-cell:focus": {
              outline: "none",
            },
            "--DataGrid-overlayHeight": "300px",
          }}
        />
      </Box>
    </Box>
  );
};

export default BeaconSub;

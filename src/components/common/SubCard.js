import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import React from "react";
import { theme } from "../../styles/theme";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";

const SubCard = ({ provided, place, placesList, setPlacesList }) => {
  const removePlaceItem = () => {
    const newList = placesList.filter(
      (placeRemoved) => placeRemoved.id !== place.id
    );
    setPlacesList(newList);
  };
  return (
    <Box
      ref={provided.innerRef}
      {...provided.dragHandleProps}
      {...provided.draggableProps}
      sx={{
        border: 1,
        borderRadius: 2.5,
        borderColor: theme.palette.background.third,
        marginBottom: 1,
        minHeight: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box display="flex">
        <DragIndicatorIcon
          sx={{ color: theme.palette.text.third, marginX: 1 }}
        />
        <Typography fontWeight="medium">{place.name}</Typography>
      </Box>
      <Tooltip title="Delete">
        <IconButton
          onClick={removePlaceItem}
          sx={{
            color: theme.palette.text.third,
            "&:hover": {
              backgroundColor: "inherit",
            },
          }}
        >
          <CloseTwoToneIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default SubCard;

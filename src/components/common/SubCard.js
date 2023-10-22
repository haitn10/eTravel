import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import React from "react";
import { theme } from "../../styles/theme";
import { DragIndicator } from "@styled-icons/material";
import { CloseOutline } from "@styled-icons/evaicons-outline";

const SubCard = ({ provided, place, placesList, setPlacesList }) => {
  const removePlaceItem = () => {
    const newList = placesList.filter(
      (placeRemoved) => placeRemoved.id !== place.id
    );
    console.log(placesList);
    console.log(place);
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
      <Box display="flex" gap={1} marginX={1}>
        <DragIndicator color={theme.palette.text.third} width={24} />
        <Typography fontWeight="medium">
          {place.name}
        </Typography>
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
          <CloseOutline width={24} />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default SubCard;

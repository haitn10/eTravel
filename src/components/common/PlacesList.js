import {
  Box,
  FormControl,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import SubCard from "./SubCard";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Search } from "@styled-icons/evaicons-solid";
import { FilterAlt } from "@styled-icons/boxicons-regular";
import { DataGrid } from "@mui/x-data-grid";
import { createFakeServer } from "@mui/x-data-grid-generator";

const SERVER_OPTIONS = {
  useCursorPagination: false,
};

const { useQuery, ...data } = createFakeServer({}, SERVER_OPTIONS);

const finalSpaceCharacters = [
  {
    id: "gary",
    name: "Gary Goodspeed",
    thumb: "/images/gary.png",
  },
  {
    id: "cato",
    name: "Little Cato",
    thumb: "/images/cato.png",
  },
  {
    id: "kvn",
    name: "KVN",
    thumb: "/images/kvn.png",
  },
  {
    id: "mooncake",
    name: "Mooncake",
    thumb: "/images/mooncake.png",
  },
  {
    id: "quinn",
    name: "Quinn Ergon",
    thumb: "/images/quinn.png",
  },
];

const PlacesList = () => {
  const theme = useTheme();
  const [placesList, setPlacesList] = useState(finalSpaceCharacters);
  const [filterValue, setFilterValue] = React.useState("");

  const handleChange = (event) => {
    setFilterValue(event.target.value);
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(placesList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPlacesList(items);
  };

  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });

  const { isLoading, rows, pageInfo } = useQuery(paginationModel);
  const [rowCountState, setRowCountState] = React.useState(
    pageInfo?.totalRowCount || 0
  );
  React.useEffect(() => {
    setRowCountState((prevRowCountState) =>
      pageInfo?.totalRowCount !== undefined
        ? pageInfo?.totalRowCount
        : prevRowCountState
    );
  }, [pageInfo?.totalRowCount, setRowCountState]);

  return (
    <Box width="100%" paddingX={3} marginTop={2}>
      <Grid container spacing={5}>
        <Grid item xs={12} md={7}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            gap={3}
          >
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search width={24} />
                  </InputAdornment>
                ),
                style: {
                  borderRadius: 10,
                },
              }}
              fullWidth
              placeholder="Search..."
            />
            <FormControl sx={{ m: 1, minWidth: 200 }}>
              <Select
                value={filterValue}
                onChange={handleChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                startAdornment={
                  <InputAdornment position="start">
                    <FilterAlt height={24} />
                  </InputAdornment>
                }
                sx={{
                  borderRadius: 2.5,
                }}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box>
            <DataGrid
              rows={rows}
              {...data}
              rowCount={rowCountState}
              loading={isLoading}
              pageSizeOptions={[10]}
              paginationModel={paginationModel}
              paginationMode="server"
              onPaginationModelChange={setPaginationModel}
              disableColumnMenu
              sx={{
                border: 0,
                "& .MuiDataGrid-row:hover": {
                  cursor: "pointer",
                },
                ".MuiDataGrid-cell:focus": {
                  outline: "none",
                },
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={5}>
          <Box>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="h5" fontWeight="semiBold">
                Reorder columns
              </Typography>
              <Box
                height={23}
                width={23}
                textAlign="center"
                bgcolor={theme.palette.background.hovered}
                color={theme.palette.text.second}
                borderRadius={2}
              >
                <Typography variant="span" fontWeight="medium">
                  {placesList.length}
                </Typography>
              </Box>
            </Box>
            <Typography fontWeight="regular" color={theme.palette.text.third}>
              Click and drag to reorder the columns
            </Typography>
          </Box>

          <Box>
            <Box minHeight={300} marginTop={5}>
              <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="ROOT" type="group">
                  {(provided) => (
                    <Box ref={provided.innerRef} {...provided.droppableProps}>
                      {placesList.map((place, index) => (
                        <Draggable
                          draggableId={place.id}
                          key={place.id}
                          index={index}
                        >
                          {(provided) => (
                            <SubCard
                              provided={provided}
                              place={place}
                              placesList={placesList}
                              setPlacesList={setPlacesList}
                            />
                          )}
                        </Draggable>
                      ))}
                    </Box>
                  )}
                </Droppable>
              </DragDropContext>
            </Box>
            {placesList.length === 5 ? (
              <Box>
                <Typography color="error" fontWeight="medium">
                  The maximum number of places has been reached!
                </Typography>
              </Box>
            ) : null}

            <Box display="flex" justifyContent="space-between" marginTop={5}>
              <Typography fontSize={18} fontWeight="semiBold">
                Total Price :
              </Typography>
              <Typography fontSize={18} fontWeight="semiBold">
                20 $
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PlacesList;

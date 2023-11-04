import { useTheme } from "@emotion/react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Typography,
  alpha,
} from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import { ExpandMore } from "styled-icons/material";

const PreviewData = ({ data }) => {
  const theme = useTheme();

  return (
    <Box width="100%" paddingX={10} marginTop={3}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box display="flex" gap={2} marginBottom={2}>
            <Typography fontWeight="medium">Place Name:</Typography>
            <Typography>{data.name}</Typography>
          </Box>

          <Box display="flex" gap={2} marginBottom={2} flexWrap="wrap">
            <Typography fontWeight="medium">Category:</Typography>
            {data.placeCategories?.map((category) => (
              <Box
                key={category.id}
                borderRadius={10}
                border={1}
                borderColor={theme.palette.background.primary}
                paddingX={0.85}
                bgcolor={theme.palette.background.hovered}
              >
                <Typography
                  color={theme.palette.text.second}
                  fontSize={14}
                  fontWeight="regular"
                >
                  {category.name}
                </Typography>
              </Box>
            ))}
          </Box>

          <Box display="flex" gap={2} marginBottom={2}>
            <Typography fontWeight="medium">Price:</Typography>
            <Typography>{data.price}$</Typography>
          </Box>

          <Box display="flex" gap={2} marginBottom={2}>
            <Typography fontWeight="medium">Entry Ticket:</Typography>
            <Typography>{data.entryTicket}$</Typography>
          </Box>

          <Box display="flex" gap={2} marginBottom={2}>
            <Typography fontWeight="medium">Duration:</Typography>
            <Typography>{dayjs(data.hour).format("HH:mm:ss")}</Typography>
          </Box>

          <Box display="flex" gap={2} marginBottom={2}>
            <Typography fontWeight="medium">Longitude:</Typography>
            <Typography>{data.longitude}</Typography>
          </Box>

          <Box display="flex" gap={2} marginBottom={2}>
            <Typography fontWeight="medium">Latitude:</Typography>
            <Typography>{data.latitude}</Typography>
          </Box>

          <Box display="flex" gap={2} marginBottom={2}>
            <Typography fontWeight="medium">Place IDs:</Typography>
            <Typography>{data.googlePlaceId}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box marginBottom={2}>
            <Typography fontWeight="medium">Images List</Typography>
            <Box
              sx={{
                display: "flex",
                maxHeight: 220,
                maxWidth: 500,
                overflowY: "hidden",
                overflowX: "auto",
                "&::-webkit-scrollbar": {
                  marginTop: 0.5,
                  width: "0.35em",
                  height: "0.45em",
                  bgcolor: theme.palette.background.secondary,
                },

                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: theme.palette.background.third,
                  borderRadius: 3,
                  "&:hover": {
                    background: alpha(theme.palette.background.hovered, 0.25),
                  },
                },
              }}
              columnGap={2}
            >
              {data.placeImages.length !== 0 ? (
                data.placeImages?.map((item, index) => (
                  <Box
                    key={index}
                    position="relative"
                    minWidth={200}
                    border={1}
                    borderRadius={2.5}
                    borderColor={theme.palette.background.third}
                  >
                    <img
                      src={
                        typeof item.image === "string"
                          ? item.image
                          : URL.createObjectURL(item.image)
                      }
                      alt="item"
                      style={{
                        height: "100%",
                        width: "100%",
                        maxWidth: 200,
                        objectFit: "contain",
                        borderRadius: 10,
                      }}
                      loading="lazy"
                    />
                  </Box>
                ))
              ) : (
                <Typography fontSize={14}>(No Images)</Typography>
              )}
            </Box>
          </Box>
          <Box marginBottom={2}>
            <Typography fontWeight="medium">Descriptions</Typography>

            {data.placeDescriptions?.map((item, index) => (
              <Accordion key={index} sx={{ marginTop: 1 }}>
                <AccordionSummary
                  expandIcon={<ExpandMore width={24} />}
                  sx={{
                    alignItems: "center",
                    bgcolor: theme.palette.background.primary,
                  }}
                >
                  <img
                    src={item.icon}
                    alt={item.name}
                    style={{
                      width: 25,
                      height: 17,
                      border: "1px solid #ccc",
                      marginRight: 5,
                    }}
                  />
                  <Typography>{item.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography fontWeight="semiBold">
                    {item.placeName}
                  </Typography>
                  <Typography>
                    {item.description ? item.description : "No script"}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PreviewData;

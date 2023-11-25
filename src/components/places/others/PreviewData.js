import { useTheme } from "@emotion/react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  ImageList,
  ImageListItem,
  TextField,
  Typography,
  Tooltip,
  alpha,
} from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import { ExpandMore } from "styled-icons/material";
import { imageFileTypes } from "../../../constants/fileType";

import { StarFill } from "@styled-icons/bootstrap";

const PreviewData = ({ data, setValues, getValues, language }) => {
  const theme = useTheme();

  const previewImage = (image) => {
    if (image instanceof File && imageFileTypes.includes(image.type)) {
      return URL.createObjectURL(image);
    }

    return image;
  };

  const getLanguage = (languagecode) => {
    const value = language.filter(
      (field) => field.languageCode === languagecode
    );
    return value;
  };
  return (
    <Box padding={5} marginX={5}>
      <Typography
        fontWeight="medium"
        textTransform="uppercase"
        color={theme.palette.text.third}
      >
        General Infomation
      </Typography>
      <Box
        bgcolor={theme.palette.background.secondary}
        paddingY={2}
        marginTop={1}
        borderRadius={2.5}
      >
        <Grid container spacing={2}>
          <Grid item lg={0.5} />

          <Grid item sm={6} lg={2}>
            <Typography fontWeight="medium" color={theme.palette.text.third}>
              Place Name
            </Typography>
            <Tooltip title={data.name}>
              <Typography>{data.name}</Typography>
            </Tooltip>
          </Grid>

          <Grid item sm={6} lg={2}>
            <Typography fontWeight="medium" color={theme.palette.text.third}>
              Google Place IDs
            </Typography>
            <Tooltip title={data.googlePlaceId}>
              <Typography>
                {data.googlePlaceId ? data.googlePlaceId : "(No data)"}
              </Typography>
            </Tooltip>
          </Grid>

          <Grid item sm={6} lg={2}>
            <Typography fontWeight="medium" color={theme.palette.text.third}>
              Latitude
            </Typography>
            <Tooltip title={data.latitude}>
              <Typography noWrap>{data.latitude}</Typography>
            </Tooltip>
          </Grid>

          <Grid item sm={6} lg={2}>
            <Typography fontWeight="medium" color={theme.palette.text.third}>
              Longitude
            </Typography>
            <Tooltip title={data.longitude}>
              <Typography noWrap>{data.longitude}</Typography>
            </Tooltip>
          </Grid>

          <Grid item sm={10} lg={3}>
            <Typography fontWeight="medium" color={theme.palette.text.third}>
              Place Address
            </Typography>
            <Typography>{data.address}</Typography>
          </Grid>

          <Grid item lg={0.5} />
          <Grid item lg={0.5} />

          <Grid item sm={4} lg={2}>
            <Typography fontWeight="medium" color={theme.palette.text.third}>
              Duration
            </Typography>
            <Typography>{dayjs(data.hour).format("HH:mm:ss")}</Typography>
          </Grid>

          <Grid item sm={4} lg={2}>
            <Typography fontWeight="medium" color={theme.palette.text.third}>
              Price
            </Typography>
            <Typography>
              {data.price?.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </Typography>
          </Grid>

          <Grid item sm={4} lg={2}>
            <Typography fontWeight="medium" color={theme.palette.text.third}>
              Entry Ticket
            </Typography>
            <Typography>
              {data.entryTicket?.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </Typography>
          </Grid>
          <Grid item sm={12} lg={5}>
            <Typography fontWeight="medium" color={theme.palette.text.third}>
              Category
            </Typography>
            <Box display="flex" flexWrap="wrap">
              {getValues("placeCategories").map((category) => (
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
          </Grid>
        </Grid>
      </Box>

      <Box marginTop={7}>
        <Typography
          fontWeight="medium"
          textTransform="uppercase"
          color={theme.palette.text.third}
        >
          Place Descriptions ({getValues("placeDescriptions").length})
        </Typography>
        {getValues("placeDescriptions").map((item, index) => (
          <Accordion
            key={index}
            sx={{
              marginTop: 1,
              boxShadow: " rgba(0, 0, 0, 0.04) 0px 3px 5px;",
              "&:before": {
                display: "none",
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMore width={24} />}
              sx={{
                "& .MuiAccordionSummary-content": {
                  alignItems: "center",
                },
                bgcolor: theme.palette.background.primary,
              }}
            >
              <img
                src={getLanguage(item.languageCode)[0]?.icon}
                alt={item.languageCode}
                style={{
                  width: 25,
                  height: 17,
                  border: "1px solid #ccc",
                  marginRight: 5,
                }}
              />
              <Typography>{getLanguage(item.languageCode)[0]?.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography fontWeight="semiBold">{item.name}</Typography>
              <Typography>
                {item.description ? item.description : "(No script)"}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      <Grid container spacing={5} marginTop={4}>
        <Grid item sm={12} lg={6}>
          <Typography
            fontWeight="medium"
            textTransform="uppercase"
            color={theme.palette.text.third}
          >
            Images List
          </Typography>
          <ImageList
            variant="standard"
            cols={3}
            gap={2}
            sx={{ maxHeight: 500, marginTop: 1 }}
          >
            {data.placeImages.map((item, index) => (
              <ImageListItem key={index}>
                {item.isPrimary ? (
                  <Tooltip title={"Primary Image"}>
                    <Box
                      style={{
                        position: "absolute",
                        width: 25,
                        height: 25,
                        borderRadius: "10px 0 5px 0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        left: 0,
                        top: 0,
                        backgroundColor: theme.palette.background.secondary,
                        color: theme.palette.text.pending,
                      }}
                    >
                      <StarFill width={18} />
                    </Box>
                  </Tooltip>
                ) : null}

                <img
                  src={previewImage(item.image)}
                  alt={index}
                  loading="lazy"
                  style={{
                    borderRadius: 10,
                    maxWidth: 300,
                    maxHeight: 200,
                  }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>
        <Grid item sm={12} lg={6}>
          <Box>
            <Typography
              fontWeight="medium"
              textTransform="uppercase"
              color={theme.palette.text.third}
            >
              Beacons List
            </Typography>
            {getValues("placeItems").map((item, index) => (
              <Accordion
                key={index}
                sx={{
                  marginTop: 1,
                  boxShadow: " rgba(0, 0, 0, 0.04) 0px 3px 5px;",
                  "&:before": {
                    display: "none",
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore width={24} />}
                  sx={{
                    alignItems: "center",
                    bgcolor: theme.palette.background.primary,
                  }}
                >
                  <Typography>Beacon Number {index + 1}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box display="flex" justifyContent="space-around">
                    <Box>
                      <Box display="flex" alignItems="center">
                        <Typography
                          width={150}
                          color={alpha(theme.palette.text.third, 0.75)}
                        >
                          Code:
                        </Typography>
                        <Typography fontWeight="medium">
                          {item.beaconId}
                        </Typography>
                      </Box>

                      <Box display="flex" alignItems="center">
                        <Typography
                          width={150}
                          color={alpha(theme.palette.text.third, 0.75)}
                        >
                          Name:
                        </Typography>
                        <Typography fontWeight="medium">{item.name}</Typography>
                      </Box>

                      <Box display="flex" alignItems="center">
                        <Typography
                          width={150}
                          color={alpha(theme.palette.text.third, 0.75)}
                        >
                          Major Number:
                        </Typography>
                        <Typography>{item.beaconMajorNumber}</Typography>
                      </Box>

                      <Box display="flex" alignItems="center">
                        <Typography
                          width={150}
                          color={alpha(theme.palette.text.third, 0.75)}
                        >
                          MinorNumber:
                        </Typography>
                        <Typography>{item.beaconMinorNumber}</Typography>
                      </Box>

                      <Box display="flex" alignItems="center">
                        <Typography
                          width={150}
                          color={alpha(theme.palette.text.third, 0.75)}
                        >
                          Start Time:
                        </Typography>
                        <Typography>
                          {dayjs(item.startTime).format("HH:mm:ss")}
                        </Typography>
                      </Box>

                      <Box display="flex" alignItems="center">
                        <Typography
                          width={150}
                          color={alpha(theme.palette.text.third, 0.75)}
                        >
                          End Time:
                        </Typography>
                        <Typography>
                          {dayjs(item.endTime).format("HH:mm:ss")}
                        </Typography>
                      </Box>
                    </Box>
                    <Box>
                      {item.image ? (
                        <img
                          src={previewImage(item.image)}
                          style={{ width: 120, height: 120, borderRadius: 10 }}
                          alt={item.name}
                        />
                      ) : (
                        <Box width={120} />
                      )}
                    </Box>
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>

          <Box marginTop={5}>
            <Typography
              fontWeight="medium"
              textTransform="uppercase"
              color={theme.palette.text.third}
            >
              Date Of Week
            </Typography>
            {data.placeTimes.map((data, index) => (
              <Grid
                key={index}
                container
                paddingX={1}
                marginTop={1}
                spacing={1}
              >
                <Grid item sm={4}>
                  <Typography width={100}>{data.day}</Typography>
                </Grid>
                <Grid item sm={4}>
                  <TextField
                    fullWidth
                    size="small"
                    type="time"
                    value={data.openTime}
                    InputProps={{
                      style: {
                        borderRadius: 10,
                      },
                    }}
                  />
                </Grid>
                <Grid item sm={4}>
                  <TextField
                    fullWidth
                    size="small"
                    type="time"
                    value={data.endTime}
                    InputProps={{
                      style: {
                        borderRadius: 10,
                      },
                    }}
                  />
                </Grid>
              </Grid>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PreviewData;

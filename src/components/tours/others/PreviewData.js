import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ExpandMore } from "styled-icons/material";

import { getAllLanguages } from "../../languages/action";

const PreviewData = ({ data, descriptionList }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [languagesList, setLanguagesList] = useState([]);

  useEffect(() => {
    async function fetchLanguage() {
      try {
        const response = await dispatch(getAllLanguages());
        setLanguagesList(response.languages);
      } catch (e) {
        console.log(e);
      }
    }
    fetchLanguage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const preview = (data) => {
    return languagesList.filter((language) => language.languageCode === data);
  };
  return (
    <Box width="100%" paddingX={3} marginTop={3}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <Box>
            <Typography
              textTransform="uppercase"
              fontWeight="medium"
              color={theme.palette.text.third}
            >
              General Informations
            </Typography>
          </Box>

          <Box marginLeft={2} marginTop={2}>
            <Box display="flex" alignItems="center" marginBottom={1}>
              <Typography fontSize={16} width={150}>
                Tour Name:{" "}
              </Typography>
              <Typography marginLeft={1} fontWeight="medium">
                {data?.name}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" marginBottom={1}>
              <Typography fontSize={16} width={150}>
                Number of Places:{" "}
              </Typography>
              <Typography marginLeft={1} fontWeight="medium">
                {data?.tourDetails.length}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" marginBottom={1}>
              <Typography fontSize={16} width={150}>
                Total Price:{" "}
              </Typography>
              <Typography marginLeft={1} fontWeight="medium">
                ${" "}
                {data?.total
                  .toFixed(2)
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
              </Typography>
            </Box>
            <Box marginBottom={1}>
              <Typography fontSize={16} width={150} marginBottom={1}>
                Symbolic Picture:{" "}
              </Typography>
              <Box display="flex" justifyContent="center">
                {data?.image ? (
                  <img
                    src={data.image && URL.createObjectURL(data.image)}
                    style={{
                      maxWidth: "100%",
                      maxHeight: 300,
                      marginLeft: 2,
                      borderRadius: 10,
                    }}
                    alt={data?.name}
                  />
                ) : (
                  <Typography marginLeft={1} fontWeight="medium">
                    (No Picture)
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={5}>
          <Box>
            <Typography
              textTransform="uppercase"
              fontWeight="medium"
              color={theme.palette.text.third}
            >
              Price Details
            </Typography>
          </Box>

          <Box marginTop={2}>
            {data.tourDetails?.map((place) => (
              <Box
                key={place.id}
                border={1}
                bgcolor={theme.palette.background.secondary}
                paddingX={2}
                paddingY={1}
                borderRadius={2}
                borderColor={alpha(theme.palette.text.third, 0.2)}
                marginTop={2}
              >
                <Typography fontWeight="semiBold">{place.name}</Typography>
                <Grid container color={theme.palette.text.third} padding={1}>
                  <Grid item xs={4} textAlign="left">
                    <Typography noWrap>Price</Typography>
                    <Typography noWrap>
                      ${" "}
                      {place.price
                        .toFixed(2)
                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} textAlign="center">
                    <Typography noWrap>Duration</Typography>
                    <Typography noWrap>
                      {place.duration
                        .toFixed(1)
                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}{" "}
                      hours
                    </Typography>
                  </Grid>
                  <Grid item xs={4} textAlign="right">
                    <Typography noWrap>Category</Typography>
                    <Typography noWrap textTransform="capitalize">
                      {place.category}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            ))}
          </Box>
        </Grid>

        <Grid item xs={12} md={7}>
          <Box>
            <Typography
              textTransform="uppercase"
              fontWeight="medium"
              color={theme.palette.text.third}
            >
              Descriptions List
            </Typography>
          </Box>

          <Box marginTop={1}>
            {descriptionList?.map((item, index) => (
              <Accordion key={index}>
                <AccordionSummary
                  expandIcon={<ExpandMore width={24} />}
                  sx={{
                    ".MuiAccordionSummary-content": {
                      alignItems: "center",
                    },
                    bgcolor: theme.palette.background.primary,
                  }}
                >
                  <img
                    src={preview(item.languageCode)[0]?.icon}
                    alt={preview(item.languageCode)[0]?.name}
                    style={{
                      width: 25,
                      height: 17,
                      border: "1px solid #ccc",
                      marginRight: 10,
                    }}
                  />
                  <Typography>{preview(item.languageCode)[0]?.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box display="flex" gap={2}>
                    <Typography fontWeight="medium" width={100}>
                      Tour Name:{" "}
                    </Typography>
                    <Typography fontStyle="italic">{item.name}</Typography>
                  </Box>

                  <Box display="flex" gap={2}>
                    <Typography fontWeight="medium" width={140}>
                      Tour Description:{" "}
                    </Typography>
                    <Typography>
                      {item.description ? item.description : "No script"}
                    </Typography>
                  </Box>
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

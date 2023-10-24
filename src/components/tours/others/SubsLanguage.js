import { Box, Divider, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { getAllLanguages } from "../../languages/action";

const SubsLanguage = ({ values, setValues, notification, setNotification }) => {
  const dispatch = useDispatch();
  const [languageList, setLanguageList] = useState([]);

  useEffect(() => {
    async function fetchLanguage() {
      try {
        const response = await dispatch(getAllLanguages());
        setLanguageList(response.languages);
      } catch (e) {
        setNotification({
          ...notification,
          errorState: true,
          errorMessage: "Can't loading details mutil-languages for tour!",
          status: "error",
        });
      }
    }
    fetchLanguage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handleChange = (index, event) => {
    const data = [...values.tourDescriptions];
    data[index][event.target.name] = event.target.value;
    setValues({ ...values, tourDescriptions: data });
  };

  return (
    <>
      {values?.tourDescriptions.map((tour, index) => (
        <Box key={index} width="100%" paddingX={10} marginTop={1}>
          {languageList &&
            languageList.map((language, id) => {
              if (language.languageCode.trim() === tour.languageCode.trim()) {
                return (
                  <Box key={id} display="flex" alignItems="center" gap={2}>
                    <img
                      src={language.icon}
                      alt={language.name}
                      style={{ width: 30, border: "1px solid #ccc" }}
                    />
                    <Typography fontWeight="bold" variant="h5">
                      {language.name}
                    </Typography>
                  </Box>
                );
              } else return null;
            })}
          <Box paddingTop={2} paddingX={8}>
            <Grid container rowGap={3}>
              <Grid item xs={12} md={4}>
                <Typography variant="h6">
                  Place Name <small style={{ color: "red" }}>*</small>
                </Typography>
              </Grid>
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  size="small"
                  name="name"
                  value={tour.name ? tour.name : ""}
                  required
                  InputProps={{
                    style: {
                      borderRadius: 10,
                    },
                  }}
                  onChange={(event) => handleChange(index, event)}
                  placeholder={`Type name here`}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6">
                  Decription <small style={{ color: "red" }}>*</small>
                </Typography>
                <Typography variant="p">Write a short decription</Typography>
              </Grid>
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  size="small"
                  name="description"
                  required
                  value={tour.description ? tour.description : ""}
                  InputProps={{
                    style: {
                      borderRadius: 10,
                    },
                  }}
                  onChange={(event) => handleChange(index, event)}
                  placeholder="Type description here"
                  multiline={true}
                  rows={7}
                />
              </Grid>
            </Grid>
          </Box>
          <Divider sx={{ marginY: 3 }} />
        </Box>
      ))}
    </>
  );
};

export default SubsLanguage;

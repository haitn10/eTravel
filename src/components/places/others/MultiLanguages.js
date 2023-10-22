import {
  Box,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllLanguages } from "../../languages/action";


const MultiLanguages = ({ values, setValues }) => {
  const dispatch = useDispatch();
  const [languageList, setLanguageList] = useState([]);

  useEffect(() => {
    async function fetchLanguage() {
      const response = await dispatch(getAllLanguages());
      setLanguageList(response.languages);
    }
    fetchLanguage();
  }, [dispatch]);

  console.log(languageList);

  return (
    <>
      {languageList &&
        languageList.map((language, index) => (
          <Box key={index} width="100%" paddingX={10} marginTop={1}>
            <Box display="flex" alignItems="center" gap={2}>
              <img
                src={language.icon}
                alt={language.name}
                style={{ width: 30, border: "1px solid #ccc" }}
              />
              <Typography fontWeight="bold" variant="h5">
                {language.name}
              </Typography>
            </Box>
            <Box paddingTop={2} paddingX={8}>
              <Grid container rowGap={3}>
                <Grid item xs={12} md={4}>
                  <Typography variant="h6">Place Name</Typography>
                </Grid>
                <Grid item xs={12} md={8}>
                  <TextField
                    fullWidth
                    size="small"
                    value={""}
                    InputProps={{
                      style: {
                        borderRadius: 10,
                      },
                    }}
                    placeholder={`Type name here`}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="h6">Decription</Typography>
                  <Typography variant="p">Write a short decription</Typography>
                </Grid>
                <Grid item xs={12} md={8}>
                  <TextField
                    fullWidth
                    size="small"
                    value={""}
                    InputProps={{
                      style: {
                        borderRadius: 10,
                      },
                    }}
                    placeholder="Type description here"
                    multiline={true}
                    rows={7}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <Typography variant="h6">Voice File</Typography>
                </Grid>
                <Grid item xs={12} md={8}>
                  <TextField
                    fullWidth
                    type="file"
                    size="small"
                    InputProps={{
                      style: {
                        borderRadius: 10,
                      },
                    }}
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

export default MultiLanguages;

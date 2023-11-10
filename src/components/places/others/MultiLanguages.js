import {
  Box,
  Divider,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { checkDuplicateName } from "../action";
import { useDispatch } from "react-redux";
import { getAllLanguages } from "../../languages/action";

const MultiLanguages = ({
  values,
  setValues,
  errors,
  setError,
  clearErrors,
  notification,
  setNotification,
}) => {
  const dispatch = useDispatch();
  const [checkDuplicate, setcheckDuplicate] = useState(false);
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
          errorMessage: "Can't loading languages for selection!",
          status: "error",
        });
      }
    }
    fetchLanguage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCheck = async (nameFile) => {
    try {
      const check = await checkDuplicateName(nameFile);
      if (check) {
        setcheckDuplicate(false);
      }
    } catch (err) {
      setcheckDuplicate(true);
    }
  };

  const handleChange = (index, event) => {
    const data = [...languageList];
    if (!event.target.files) {
      data[index][event.target.name] = event.target.value;
    } else {
      // onCheck(event.target.files[0]?.name);
      // if (checkDuplicate) {
      //   clearErrors(`voiceFile${index}`);
      data[index][event.target.name] = event.target.files[0];
      // } else {
      //   setError(`voiceFile${index}`, {
      //     message: "Name file already exists! Please change.",
      //   });
      // }
    }
    setLanguageList(data);
    setValues({ ...values, placeDescriptions: data });
  };

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
                  <Typography fontWeight="medium">Place Name</Typography>
                </Grid>
                <Grid item xs={12} md={8}>
                  <TextField
                    fullWidth
                    size="small"
                    name="placeName"
                    InputProps={{
                      style: {
                        borderRadius: 10,
                      },
                    }}
                    value={language.placeName ? language.placeName : ""}
                    onChange={(event) => handleChange(index, event)}
                    error={!!errors.placeName}
                    helperText={errors.placeName?.message}
                    placeholder={`Type name here`}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography fontWeight="medium">Decription</Typography>
                  <Typography>
                    {" "}
                    <small>Write a short decription</small>
                  </Typography>
                </Grid>
                <Grid item xs={12} md={8}>
                  <TextField
                    fullWidth
                    size="small"
                    name="description"
                    InputProps={{
                      style: {
                        borderRadius: 10,
                      },
                    }}
                    value={language.description ? language.description : ""}
                    onChange={(event) => handleChange(index, event)}
                    placeholder="Type description here"
                    multiline={true}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                    rows={7}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <Typography fontWeight="medium">Voice File</Typography>
                </Grid>
                <Grid item xs={12} md={8}>
                  <TextField
                    fullWidth
                    type="file"
                    size="small"
                    name="voiceFile"
                    onChange={(event) => handleChange(index, event)}
                    error={!!errors.voiceFile}
                    helperText={errors.voiceFile?.message}
                    InputProps={{
                      style: {
                        borderRadius: 10,
                      },
                    }}
                    inputProps={{
                      accept: "audio/mpeg, audio/mp3",
                    }}
                  />
                  <FormHelperText
                    htmlFor="render-select"
                    style={{ marginLeft: 14 }}
                    error
                  >
                    {errors[`voiceFile${index}`]?.message}
                  </FormHelperText>
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

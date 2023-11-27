import { Grid, TextField, Typography, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import { useFieldArray } from "react-hook-form";

const BeaconLanguage = ({
  languageSelect,
  languageList,
  beaconIndex,
  control,
  register,
  errors,
}) => {
  const theme = useTheme();
  const { fields, insert } = useFieldArray({
    control,
    name: `placeItems.${beaconIndex}.itemDescriptions`,
  });

  // useEffect(() => {
  //   for (const desc of languageSelect) {
  //     const existLanguage = fields.filter(
  //       (field) => field.languageCode === desc.languageCode
  //     );
  // if (existLanguage.length === 0) {
  //   insert(`placeItems.${beaconIndex}.itemDescriptions`, {
  //     languageCode: desc.languageCode,
  //     nameItem: "",
  //   });
  // }
  // }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const getLanguage = (languagecode) => {
    const value = languageList.filter(
      (field) => field.languageCode === languagecode
    );
    return value;
  };

  return (
    <>
      {fields.map((item, i) => (
        <Grid container key={i} spacing={1} marginBottom={1}>
          <Grid
            item
            sm={12}
            lg={5}
            display="flex"
            alignItems="center"
            justifyContent="end"
          >
            <img
              src={getLanguage(item.languageCode)[0]?.icon}
              alt=""
              style={{
                width: 20,
                height: 12,
                border: 1,
                borderColor: theme.palette.background.third,
              }}
            />
            <Typography fontWeight="medium" marginLeft={1}>
              {getLanguage(item.languageCode)[0]?.name}{" "}
              <small style={{ color: theme.palette.text.active }}>*</small>
            </Typography>
          </Grid>

          <Grid item sm={12} lg={7}>
            <TextField
              key={item.id}
              fullWidth
              size="small"
              InputProps={{
                style: {
                  borderRadius: 10,
                },
              }}
              {...register(
                `placeItems.${beaconIndex}.itemDescriptions.${i}.nameItem`,
                {
                  validate: (value) => {
                    return value.trim() !== "" || "Name is not empty!";
                  },
                  required: "Name by language is required!",
                }
              )}
              error={
                !!errors.placeItems?.[beaconIndex]?.itemDescriptions?.[i]
                  ?.nameItem
              }
              helperText={
                errors.placeItems?.[beaconIndex]?.itemDescriptions?.[i]
                  ?.nameItem?.message
              }
              placeholder={`Name by ${getLanguage(item.languageCode)[0]?.name}`}
            />
          </Grid>
        </Grid>
      ))}
    </>
  );
};

export default BeaconLanguage;

import { Autocomplete, Box, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { LocationOn } from "styled-icons/material";
import parse from "autosuggest-highlight/parse";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

const PlaceAutocomplete = () => {
  const {
    ready,
    value,
    setValue,
    suggestions: { data },
    clearSuggestions,
  } = usePlacesAutocomplete();


  const handleSelect =
    ({ description }) =>
    () => {
      // When the user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false);
      clearSuggestions();

      // Get latitude and longitude via utility functions
      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        console.log("📍 Coordinates: ", { lat, lng });
      });
    };

  return (
    <Autocomplete
      size="small"
      sx={{
        ".MuiOutlinedInput-root": {
          borderRadius: 2.5,
        },
      }}
      value={value}
      options={data}
      disabled={!ready}
      freeSolo
      autoComplete
      includeInputInList
      filterSelectedOptions
      noOptionsText="No locations"
      onChange={(e) => {
        setValue(e.target.value);
      }}
      filterOptions={(x) => x}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.description
      }
      renderOption={(props, option) => {
        const matches =
          option.structured_formatting.main_text_matched_substrings || [];

        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match) => [match.offset, match.offset + match.length])
        );
        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item sx={{ display: "flex", width: 44 }}>
                <LocationOn width={24} sx={{ color: "text.secondary" }} />
              </Grid>
              <Grid
                item
                sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}
              >
                {parts.map((part, index) => (
                  <Box
                    key={index}
                    component="span"
                    sx={{ fontWeight: part.highlight ? "bold" : "regular" }}
                  >
                    {part.text}
                  </Box>
                ))}
                <Typography variant="body2" color="text.secondary">
                  {option.description}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
      renderInput={(params) => (
        <TextField {...params} placeholder="Search place by name..." />
      )}
    />
  );
};

export default PlaceAutocomplete;

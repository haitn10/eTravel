import { Box, Divider, Grid, TextField, Typography } from "@mui/material";
import React from "react";

const SubsLanguage = ({ languague }) => {
  return (
    <Box width="100%" paddingX={3} marginTop={2}>
      <Box>
        <Typography fontWeight="bold" variant="h5">
          {languague}
        </Typography>
      </Box>
      <Box paddingTop={2} paddingX={8}>
        <Grid container rowGap={3}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Decription</Typography>
            <Typography variant="p">Write a short decription</Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              InputProps={{
                style: {
                  borderRadius: 10,
                },
              }}
              placeholder="Type description here"
              multiline={true}
              rows={5}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Voice File</Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              type="file"
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
  );
};

export default SubsLanguage;

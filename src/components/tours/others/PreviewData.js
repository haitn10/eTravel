import { Box, Grid, Typography, alpha, useTheme } from "@mui/material";
import React from "react";

const PreviewData = ({ data }) => {
  const theme = useTheme();
  return (
    <Box width="100%" paddingX={3} marginTop={3}>
      <Grid container spacing={5}>
        <Grid item xs={12} md={7}>
          <Box>
            <Typography variant="subtitle1" fontWeight="medium">
              General Informations
            </Typography>
          </Box>

          <Box marginLeft={2} marginTop={2}>
            <Box display="flex" alignItems="center" marginBottom={1}>
              <Typography fontSize={16} fontWeight="light">
                Tour Name:{" "}
              </Typography>
              <Typography marginLeft={1} fontWeight="medium">
                {data?.name}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" marginBottom={1}>
              <Typography fontSize={16} fontWeight="light">
                Description:{" "}
              </Typography>
              <Typography
                width="100%"
                marginLeft={1}
                fontWeight="medium"
                noWrap
              >
                {data?.description}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" marginBottom={1}>
              <Typography fontSize={16} fontWeight="light">
                Number of Places:{" "}
              </Typography>
              <Typography marginLeft={1} fontWeight="medium">
                {data?.tourDetails.length}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" marginBottom={1}>
              <Typography fontSize={16} fontWeight="light">
                Total Price:{" "}
              </Typography>
              <Typography marginLeft={1} fontWeight="medium">
                {data?.total}
              </Typography>
            </Box>
            <Box display="flex" marginBottom={1}>
              <Typography fontSize={16} fontWeight="light">
                Symbolic Picture:{" "}
              </Typography>
              {data?.image ? (<img
                src={data.image && URL.createObjectURL(data.image)}
                style={{ maxWidth: "50%", marginLeft: 2 }}
                alt={data?.name}
              />): <Typography marginLeft={1} fontWeight="medium">
              (No Picture)
            </Typography>}
              
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={5}>
          <Box>
            <Typography variant="subtitle1" fontWeight="medium">
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
                    <Typography noWrap>$ {place.price}</Typography>
                  </Grid>
                  <Grid item xs={4} textAlign="center">
                    <Typography noWrap>Duration</Typography>
                    <Typography noWrap>{place.duration} hours</Typography>
                  </Grid>
                  <Grid item xs={4} textAlign="right">
                    <Typography noWrap>Category</Typography>
                    <Typography noWrap textTransform='capitalize'>{place.category}</Typography>
                  </Grid>
                </Grid>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PreviewData;

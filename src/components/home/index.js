import {
  Box,
  useTheme,
  alpha,
  Avatar,
  Typography,
  Grid,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import { StyledBadge } from "../common/StyledBadge";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import moment from "moment/moment";
import indicators from "../../constants/indicatorsItem";

import ChartCard from "./others/ChartCard";
import CustomersOrder from "./others/CustomersOrder";
import CountryRanking from "./others/CountryRanking";
import ArrowData from "../common/ArrowData";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, "process", 4.0),
  createData("Ice cream sandwich", 237, 9.0, "done", 4.3),
  createData("Eclair", 262, 16.0, "done", 6.0),
  createData("Cupcake", 305, 3.7, "done", 4.3),
  createData("Gingerbread", 356, 16.0, "done", 3.9),
];

const HomePage = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width: 1200px)");
  const dayNow = moment(Date.now()).format("DD MMMM, YYYY");
  const [loadings, setLoadings] = useState(true);

  return (
    <Box
      margin="1.25em"
      padding={2}
      bgcolor={theme.palette.background.primary}
      borderRadius={5}
    >
      {/* Header HomePage */}
      <Box minHeight={250} display="flex" flexDirection="row">
        <Box flexGrow={2} flexDirection="column" marginX={2}>
          <Box flexGrow={1} marginRight={2} minHeight={125}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignContent="center"
            >
              <Typography
                sx={{
                  fontWeight: "semiBold",
                  fontSize: { md: "2em", lg: "2.5em", xl: "2.75em" },
                }}
              >
                Hello, Staff Name
              </Typography>
              <Box display="flex" alignContent="center" flexWrap="wrap" gap={2}>
                <Typography
                  sx={{
                    fontWeight: "medium",
                    fontSize: { lg: ".9em", xl: "1.125em" },
                    lineHeight: 2.5,
                  }}
                >
                  {dayNow}
                </Typography>
                <Avatar sx={{ bgcolor: theme.palette.background.third }}>
                  <CalendarMonthOutlinedIcon color="error" />
                </Avatar>
              </Box>
            </Box>
            <Typography
              color={theme.palette.text.third}
              sx={{
                fontWeight: "regular",
                fontSize: { md: "1em", lg: "1.375em" },
              }}
            >
              Try to best everyday!
            </Typography>
          </Box>
          <Grid
            container={isNonMobile}
            minHeight={125}
            borderBottom={2}
            borderTop={2}
            borderColor={theme.palette.background.third}
          >
            {indicators.map((indicator) => (
              <Grid
                item
                xs={12 / indicators.length}
                key={indicator.id}
                flexDirection="row"
                display="flex"
                alignItems="center"
                paddingX={4}
                marginY={1}
                sx={
                  isNonMobile
                    ? indicator.id / 2 === 1
                      ? {
                          borderRight: 2,
                          borderLeft: 2,
                          borderColor: theme.palette.background.third,
                        }
                      : null
                    : indicator.id / 2 === 1
                    ? {
                        borderTop: 2,
                        borderBottom: 2,
                        borderColor: theme.palette.background.third,
                      }
                    : null
                }
                gap={2}
              >
                <Avatar
                  sx={{
                    bgcolor: theme.palette.background.third,
                    color: theme.palette.text.active,
                  }}
                >
                  {indicator.icon}
                </Avatar>
                <Box width="100%">
                  <Typography
                    sx={{ fontWeight: "regular", fontSize: "1.375em" }}
                  >
                    {indicator.title}
                  </Typography>
                  <ArrowData totalNum={80} direction={true} numDirection={10} />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {isNonMobile ? (
          <Box
            minWidth={250}
            minHeight={250}
            bgcolor={alpha(theme.palette.background.hovered, 0.1)}
            borderRadius={8}
            flexWrap="wrap"
            flexDirection="column"
            display="flex"
            justifyContent="center"
            alignContent="center"
            marginRight={2}
            gap={2}
          >
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar
                alt="Remy Sharp"
                src=""
                sx={{ width: 111, height: 111, border: 2 }}
              />
            </StyledBadge>

            <Box alignItems="center" flexDirection="column" display="flex">
              <Typography fontSize={22} fontWeight={700}>
                Staff Name
              </Typography>
              <Typography color={theme.palette.text.third}>#ID123</Typography>
            </Box>
          </Box>
        ) : null}
      </Box>

      <Box marginX={2}>
        <Grid container paddingTop={5} spacing={2.5}>
          <Grid item md={12}>
            <ChartCard />
          </Grid>
          <Grid item md={12} lg={6}>
            <CustomersOrder loadings={loadings} rows={rows} />
          </Grid>
          <Grid item md={12} lg={6}>
            <CountryRanking loadings={loadings} rows={rows} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default HomePage;

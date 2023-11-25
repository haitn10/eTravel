import { Box, Tabs, Tab, Typography, Skeleton, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import * as echarts from "echarts/core";
import { BarChart } from "echarts/charts";
import { TooltipComponent, GridComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

const ChartUserAnalysis = ({ loading, data, option, setOption }) => {
  const theme = useTheme();

  useEffect(() => {
    if (!loading) {
      echarts.use([TooltipComponent, GridComponent, BarChart, CanvasRenderer]);
      const chartDom = document.getElementById("chart");
      const myChart = echarts.init(chartDom);

      const options = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "Direct",
            type: "bar",
            barWidth: "60%",
            data: [10, 52, 200, 334, 390, 330, 220],
          },
        ],
      };

      myChart.setOption(options);

      window.addEventListener("resize", () => {
        myChart.resize();
      });
    }
  }, [loading]);
  return (
    <Box
      bgcolor={theme.palette.background.secondary}
      borderRadius={2.5}
      padding={2}
      width="100%"
      height="100%"
    >
      <Box
        padding={0.5}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        {loading ? (
          <Skeleton variant="rounded" width={100} />
        ) : (
          <Typography fontWeight="medium" textTransform="capitalize">
            Number of new registered users
          </Typography>
        )}

        <Box>
          {loading ? (
            <Skeleton variant="rounded" width={200} />
          ) : (
            <Tabs
              value={option}
              sx={{ minHeight: 25 }}
              onChange={(e, value) => setOption(value)}
            >
              <Tab
                value={3}
                label="3m"
                sx={{ minWidth: 50, minHeight: 25, padding: 0 }}
              />
              <Tab
                value={6}
                label="6m"
                sx={{ minWidth: 50, minHeight: 25, padding: 0 }}
              />
              <Tab
                value={1}
                label="1y"
                sx={{ minWidth: 50, minHeight: 25, padding: 0 }}
              />
            </Tabs>
          )}
        </Box>
      </Box>

      <Box padding={0.5}>
        {loading ? (
          <Skeleton variant="rounded" width="100%" height={400} />
        ) : (
          <Box
            id="chart"
            width="100%"
            maxWidth={1000}
            height="100%"
            minHeight={400}
          ></Box>
        )}
      </Box>
    </Box>
  );
};

export default ChartUserAnalysis;

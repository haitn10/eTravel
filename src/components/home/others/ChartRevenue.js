import { Box, Tabs, Tab, Typography, Skeleton, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import * as echarts from "echarts/core";
import { BarChart, LineChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
} from "echarts/components";
import { LabelLayout, UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";

const ChartRevene = ({ loading, data, option, setOption }) => {
  const theme = useTheme();

  useEffect(() => {
    if (!loading) {
      echarts.use([
        BarChart,
        LineChart,
        TitleComponent,
        TooltipComponent,
        GridComponent,
        DatasetComponent,
        TransformComponent,
        LabelLayout,
        UniversalTransition,
        CanvasRenderer,
      ]);
      const chartDom = document.getElementById("chart");
      const myChart = echarts.init(chartDom);

      const options = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        legend: {
          bottom: 0,
          data: ["Evaporation", "Precipitation", "Temperature"],
        },
        xAxis: [
          {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            axisPointer: {
              type: "shadow",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "Precipitation",
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: "{value} ml",
            },
          },
          {
            type: "value",
            name: "Temperature",
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
              formatter: "{value} °C",
            },
          },
        ],
        series: [
          {
            name: "Evaporation",
            type: "bar",
            tooltip: {
              valueFormatter: function (value) {
                return value + " ml";
              },
            },
            data: [
              2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4,
              3.3,
            ],
          },
          {
            name: "Precipitation",
            type: "bar",
            tooltip: {
              valueFormatter: function (value) {
                return value + " ml";
              },
            },
            data: [
              2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0,
              2.3,
            ],
          },
          {
            name: "Temperature",
            type: "line",
            yAxisIndex: 1,
            tooltip: {
              valueFormatter: function (value) {
                return value + " °C";
              },
            },
            data: [
              2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2,
            ],
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
          <Typography fontWeight="medium" fontSize={14}>
            Total revenue
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
                label="3d"
                sx={{ minWidth: 50, minHeight: 25, padding: 0 }}
              />
              <Tab
                value={7}
                label="7d"
                sx={{ minWidth: 50, minHeight: 25, padding: 0 }}
              />
              <Tab
                value={30}
                label="1m"
                sx={{ minWidth: 50, minHeight: 25, padding: 0 }}
              />
            </Tabs>
          )}
        </Box>
      </Box>
      <Box padding={0.5} marginLeft={2}>
        {loading ? (
          <Skeleton variant="rounded" width={200} height={40} />
        ) : (
          <Typography fontWeight="medium" variant="h5">
            ${" "}
            {Number(123123)
              .toFixed(2)
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
          </Typography>
        )}
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

export default ChartRevene;

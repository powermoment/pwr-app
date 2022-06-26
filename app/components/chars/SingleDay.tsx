import format from "date-fns/format";
import React from "react";
import type { AxisOptions, DatumStyles } from "react-charts";
import { Chart } from "react-charts";
import type { Check } from "~/remix-app";

type SingleDayProps = {
  checks: Check[];
};

type Series = {
  data: Check[];
};

// FYI: If checks = [], it breaks, idk why, but should fixed
const SingleDay = ({ checks }: SingleDayProps) => {
  const data: Series[] = [{ data: checks }];

  const primaryAxis = React.useMemo(
    (): AxisOptions<Check> => ({
      getValue: (datum) => format(new Date(datum.created_at), "HH:mm:ss"),
      elementType: "line",
      showDatumElements: true,
      position: "top",
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    (): AxisOptions<Check>[] => [
      {
        getValue: (datum) => datum.value,
        stacked: true,
        tickCount: 6,
        elementType: "line",
      },
    ],
    []
  );

  return (
    <Chart
      options={{
        data,
        primaryAxis,
        secondaryAxes,
        tooltip: {
          render: (props) => {
            return (
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="bg-gray-50 p-4">
                  Date: {props.focusedDatum?.primaryValue}
                  <br />
                  Hour: {props.focusedDatum?.secondaryValue}
                  <br />
                  Value: {props.focusedDatum?.originalDatum.value}
                </div>
              </div>
            );
          },
        },
        defaultColors: ["#E6C37D"],
        getDatumStyle: (datum) => {
          return {
            circle: { r: datum.originalDatum.value },
          } as DatumStyles;
        },
      }}
    />
  );
};

export default SingleDay;

import format from "date-fns/format";
import React from "react";
import type { AxisOptions, DatumStyles } from "react-charts";
import { Chart } from "react-charts";
import { getMoodColorByValue } from "~/helpers/colors";
import { getDatumRadiusByValue } from "~/helpers/datum";
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
      getValue: (datum) => format(new Date(datum.created_at), "HH:mm"),
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
        showDatumElements: true,
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
                  Time: {props.focusedDatum?.primaryValue}
                  <br />
                  Value: {props.focusedDatum?.originalDatum.value}
                </div>
              </div>
            );
          },
        },
        defaultColors: ["#E6C37D"],
        getDatumStyle: (datum) => {
          const value = datum.originalDatum.value;

          return {
            circle: {
              r: getDatumRadiusByValue(value),
              stroke: getMoodColorByValue(value),
              strokeWidth: 4,
              fill: '#ffffff',
              opacity: 0.8
            },
          } as DatumStyles;
        },
      }}
    />
  );
};

export default SingleDay;

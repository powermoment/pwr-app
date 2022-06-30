import format from "date-fns/format";
import React from "react";
import type { AxisOptions, DatumStyles } from "react-charts";
import { Chart } from "react-charts";
import { getMoodColorByValue } from "~/helpers/colors";
import { getDatumRadiusByValue } from "~/helpers/datum";
import type { Check } from "~/remix-app";

type Last7DaysProps = {
  checks: Check[];
};

type Series = {
  data: Check[];
};

export const Last7Days = ({ checks }: Last7DaysProps) => {
  const data: Series[] = [{ data: checks }];

  const primaryAxis = React.useMemo(
    (): AxisOptions<Check> => ({
      // FYI: Do not forget about years?
      getValue: (datum) => format(new Date(datum.created_at), "dd-MM"),
      position: "top",
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    (): AxisOptions<Check>[] => [
      {
        getValue: (datum) => new Date(datum.created_at).getHours(),
        elementType: "bubble",
        stacked: true,
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
        interactionMode: "closest",
        getDatumStyle: (datum) => {
          const value = datum.originalDatum.value;

          return {
            circle: {
              r: getDatumRadiusByValue(value),
              strokeWidth: 0,
              fill: getMoodColorByValue(value),
              opacity: 0.8
            },
          } as DatumStyles;
        },
      }}
    />
  );
};

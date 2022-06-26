import React from "react";
import type { AxisOptions } from "react-charts";
import { Chart } from "react-charts";
import type { Check } from "~/remix-app";

type Last7DaysProps = {
  checks: Check[];
};

type Series = {
  label: string;
  data: Check[];
};

// TODO: Holy shit, replace this with date-fns!
const LOCALE = "ru-RU"; // Or "en-US"
const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return date.toLocaleString(LOCALE, options);
};

export const Last7Days = ({ checks }: Last7DaysProps) => {
  const data: Series[] = [
    {
      label: "React Charts",
      data: checks,
    },
  ];

  const primaryAxis = React.useMemo(
    (): AxisOptions<Check> => ({
      getValue: (datum) => formatDate(new Date(datum.created_at)),
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
        getDatumStyle: (datum) =>
          ({
            circle: { r: datum.originalDatum.value },
          } as any),
      }}
    />
  );
};

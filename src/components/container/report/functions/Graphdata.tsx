import { ReportComponentResponse } from "@/store/api"; // Adjust this import based on your actual API response type

const GraphData = (routeComponent?: ReportComponentResponse) => {
  if (!routeComponent?.routeComponent)
    return { graphData: [], yAxisValues: [] };

  const severityMap: Record<string, { previous: number; current: number }> = {};

  const severityLevels = {
    Normal: { prevColor: "#90EE90", currColor: "#006400" },
    Moderate: { prevColor: "#FFFF99", currColor: "#FFD700" },
    Severe: { prevColor: "#F4A460", currColor: "#FF8C00" },
    Critical: { prevColor: "#DC143C", currColor: "#8B0000" },
    "Missed Points": { prevColor: "#A9A9A9", currColor: "#000000" },
  } as const;

  routeComponent.routeComponent.forEach((component) => {
    const sortedComments = [...component.comments].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const currentSeverity = sortedComments[0]?.severity;
    const previousSeverity = sortedComments[1]?.severity;

    if (currentSeverity) {
      if (!severityMap[currentSeverity]) {
        severityMap[currentSeverity] = { previous: 0, current: 0 };
      }
      severityMap[currentSeverity].current++;
    }

    if (previousSeverity) {
      if (!severityMap[previousSeverity]) {
        severityMap[previousSeverity] = { previous: 0, current: 0 };
      }
      severityMap[previousSeverity].previous++;
    }
  });

  const finalGraphData = Object.keys(severityLevels).map((key) => {
    const severity = key as keyof typeof severityLevels;
    return {
      label: severity,
      previous: severityMap[severity]?.previous || 0,
      current: severityMap[severity]?.current || 0,
      prevColor: severityLevels[severity].prevColor,
      currColor: severityLevels[severity].currColor,
    };
  });

  const totalCurrent = finalGraphData.reduce(
    (sum, item) => sum + item.current,
    0
  );

  const totalCountData = {
    label: "Total Count",
    current: totalCurrent,
    currColor: "#808080",
  };

  const graphData = [...finalGraphData, totalCountData];

  const step = totalCurrent > 30 ? 10 : 5;
  const yAxisValues = [0];

  let nextValue = step;
  while (nextValue <= totalCurrent) {
    yAxisValues.push(nextValue);
    nextValue += step;
  }
  yAxisValues.push(nextValue);

  return { graphData, yAxisValues };
};

export default GraphData;

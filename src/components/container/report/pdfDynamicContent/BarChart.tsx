import { graphData, yAxisValues } from "@/schema";
import { Text, StyleSheet, View } from "@react-pdf/renderer";

//bar graph to
const styles = StyleSheet.create({
  subHeader: {
    fontSize: 13,
    textAlign: "center",
    paddingTop: 3,
    color: "#71797E",
    marginBottom: 10,
  },
  chartWrapper: {
    borderWidth: 0.5,
    borderColor: "#808080",
    padding: 10,
    margin: 10,
    width: "85%",
    height: "30%",
    alignSelf: "center",
    marginTop: 30,
    overflow: "hidden",
  },
  chartContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: "100%",
  },
  gridContainer: {
    position: "absolute",
    width: "100%",
    height: "80%",
  },
  gridLine: {
    position: "absolute",
    width: "100%",
    height: 1,
    backgroundColor: "#D3D3D3",
    marginBottom: 15,
  },
  yAxisContainer: {
    width: 10,
    height: "80%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginRight: 10,
    marginBottom: 13,
  },
  yAxisLabel: {
    fontSize: 10,
    textAlign: "right",
    position: "absolute",
  },
  graphContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    flex: 1,
  },
  barGroup: {
    alignItems: "center",
    marginRight: 15,
  },
  barContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 200,
  },
  barItem: {
    alignItems: "center",
    marginHorizontal: 5,
  },
  barValue: {
    fontSize: 10,
  },
  bar: {
    width: 20,
    borderWidth: 0.5,
    borderColor: "#000000",
  },
  barLabel: {
    marginTop: 5,
    fontSize: 10,
    textAlign: "center",
  },
  legend: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  legendColor: {
    width: 10,
    height: 10,
    marginRight: 5,
  },
  legendText: {
    fontSize: 10,
  },
});

const BarChart = ({
  graphData,
  yAxisValues,
}: {
  graphData: graphData;
  yAxisValues: yAxisValues;
}) => {
  const maxDataValue = Math.max(...graphData.map((item) => item.current), 10);

  const containerHeight = 200;
  const minScale = 10;
  const paddingOffset = 40;
  const topPadding = 30;
  const maxBarHeight = containerHeight - paddingOffset - topPadding;

  const scaleFactor = Math.max(
    maxBarHeight / maxDataValue,
    minScale / maxDataValue
  );

  return (
    <View style={styles.chartWrapper}>
      <Text style={styles.subHeader}>Machinery Condition Summary</Text>
      <View style={styles.chartContainer}>
        <View style={[styles.yAxisContainer, { height: containerHeight }]}>
          {yAxisValues.map((value, index) => (
            <Text
              key={index}
              style={[styles.yAxisLabel, { bottom: value * scaleFactor }]}
            >
              {value}
            </Text>
          ))}
        </View>

        <View style={[styles.graphContainer, { height: containerHeight }]}>
          <View style={styles.gridContainer}>
            {yAxisValues.map((value, index) => (
              <View
                key={index}
                style={[styles.gridLine, { bottom: value * scaleFactor }]}
              />
            ))}
          </View>

          {graphData.map((item, index) => (
            <View key={index} style={styles.barGroup}>
              <View style={[styles.barContainer, { height: containerHeight }]}>
                {item.previous !== undefined && (
                  <View style={styles.barItem}>
                    <Text style={styles.barValue}>{item.previous}</Text>
                    <View
                      style={[
                        styles.bar,
                        {
                          height:
                            item.previous === 0
                              ? 0
                              : Math.max(item.previous * scaleFactor, minScale),
                          backgroundColor: item.prevColor,
                        },
                      ]}
                    />
                  </View>
                )}

                <View style={styles.barItem}>
                  <Text style={styles.barValue}>{item.current}</Text>
                  <View
                    style={[
                      styles.bar,
                      {
                        height:
                          item.current === 0
                            ? 0
                            : Math.max(item.current * scaleFactor, minScale),
                        backgroundColor: item.currColor,
                      },
                    ]}
                  />
                </View>
              </View>
              <Text style={styles.barLabel}>{item.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: "#90EE90" }]} />
          <Text style={styles.legendText}>Previous</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: "#006400" }]} />
          <Text style={styles.legendText}>Current</Text>
        </View>
      </View>
    </View>
  );
};

export default BarChart;

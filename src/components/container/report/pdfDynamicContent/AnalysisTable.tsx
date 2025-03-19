/* eslint-disable jsx-a11y/alt-text */
import { TransformedAnalysis } from "@/schema";
import { Text, StyleSheet, Image, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  companyDetails: {
    flexDirection: "column",
    fontSize: 10,
  },
  companyName: {
    fontSize: 12,
    fontWeight: "bold",
  },
  contact: {
    fontSize: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 5,
  },
  details: {
    fontSize: 13,
  },
  table: {
    display: "flex",
    flexDirection: "column",
    border: "0.3px solid black",
  },
  row: {
    flexDirection: "row",
  },
  headerCell: {
    backgroundColor: "#d3d3d3",
    borderLeft: "0.5px solid black",
    borderTop: "0.5px solid black",
    borderBottom: "0.5px solid black",
    padding: 5,
    textAlign: "center",
    fontWeight: "bold",
  },
  rightBorder: {
    borderRight: "0.5px solid black",
  },
  colSymbol: { flex: 0.5 },
  colCondition: { flex: 1 },
  colDescription: { flex: 2 },
  colAction: { flex: 1.5 },
  colRisk: { flex: 1 },
  cell: {
    borderLeft: "0.5px solid black",
    borderBottom: "0.5px solid black",
    padding: 5,
  },
  cell2: {
    flex: 1,
    borderLeft: "0.5px solid black",
    borderBottom: "0.5px solid black",
    padding: 5,
  },
  headerCell2: {
    flex: 1,
    backgroundColor: "#d3d3d3",
    borderLeft: "0.5px solid black",
    borderTop: "0.5px solid black",
    borderBottom: "0.5px solid black",
    padding: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  pageNumber: {
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 300,
  },
  colEquipmentList: { flex: 1 },
  colPriority: { flex: 0.3 },
  colAction2: { flex: 2 },
  headerCell3: {
    backgroundColor: "#d3d3d3",
    borderLeft: "0.5px solid black",
    borderTop: "0.5px solid black",
    borderBottom: "0.5px solid black",
    paddingHorizontal: 5,
    fontWeight: "bold",
    paddingVertical: 5,
  },
  cell3: {
    borderLeft: "0.5px solid black",
    borderBottom: "0.5px solid black",
    padding: 5,
  },
  colPreviousCondtion: { flex: 0.4 },
  colCurrentCondtion: { flex: 0.4 },
  colAnalysis: { flex: 2 },
});

const AnalysisTable = ({
  transformedAnalysisData,
}: {
  transformedAnalysisData: TransformedAnalysis[];
}) => {
  const groupedData = transformedAnalysisData.reduce((acc, machine) => {
    if (!acc[machine.equipmentGroup]) {
      acc[machine.equipmentGroup] = [];
    }
    acc[machine.equipmentGroup].push(machine);
    return acc;
  }, {} as Record<string, typeof transformedAnalysisData>);

  return (
    <View style={styles.table}>
      <View style={styles.row} fixed>
        <Text
          style={[
            styles.headerCell3,
            styles.colEquipmentList,
            { fontSize: 10 },
          ]}
        >
          Equipment List
        </Text>
        <Text
          style={[
            styles.headerCell3,
            styles.colPreviousCondtion,
            { fontSize: 10 },
          ]}
        >
          Previous{"\n"}Condition
        </Text>
        <Text
          style={[
            styles.headerCell3,
            styles.colCurrentCondtion,
            { fontSize: 10 },
          ]}
        >
          Current{"\n"}Condition
        </Text>
        <Text
          style={[
            styles.headerCell3,
            styles.colAnalysis,
            styles.rightBorder,
            { fontSize: 10 },
          ]}
        >
          Analysis and Recommendation
        </Text>
      </View>

      {Object.keys(groupedData).map((group, i) => (
        <View key={i}>
          <Text
            style={[
              styles.headerCell3,
              styles.rightBorder,
              { fontSize: 10, borderTop: 0 },
            ]}
          >
            {group}
          </Text>

          {groupedData[group].map((machine, j) => (
            <View style={styles.row} key={j} wrap={false}>
              {" "}
              <Text
                style={[
                  styles.cell3,
                  styles.colEquipmentList,
                  { fontSize: 10 },
                ]}
              >
                {machine.equipmentAndComponent}
              </Text>
              <Image
                style={[
                  styles.cell3,
                  styles.colPreviousCondtion,
                  { objectFit: "contain" },
                ]}
                src={`/report/${machine.previousCondition}.png`}
              />
              <Image
                style={[
                  styles.cell3,
                  styles.colCurrentCondtion,
                  { objectFit: "contain" },
                ]}
                src={`/report/${machine.currentCondition}.png`}
              />
              <View
                style={[
                  styles.cell3,
                  styles.colAnalysis,
                  styles.rightBorder,
                  { fontSize: 10 },
                ]}
              >
                <Text>{machine.analysis}</Text>

                {machine.recommendations &&
                  machine.recommendations.length > 0 && (
                    <View style={{ marginTop: 5 }}>
                      {machine.recommendations.map((rec, index) => (
                        <Text key={index}>
                          {"\n"}
                          {rec.priority}
                          {" : "}
                          {rec.recommendation}
                        </Text>
                      ))}
                      <Text> {"\n"}Refer to page 3</Text>
                    </View>
                  )}
              </View>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default AnalysisTable;

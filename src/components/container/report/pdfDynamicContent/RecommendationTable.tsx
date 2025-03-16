import { TransformedRecommendation } from "@/schema";
import { Text, StyleSheet, View } from "@react-pdf/renderer";

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

const RecommendationTable = ({
  transformedRecommendationData,
}: {
  transformedRecommendationData: TransformedRecommendation[];
}) => {
  const groupedData = transformedRecommendationData.reduce((acc, reco) => {
    if (!acc[reco.equipmentGroup]) {
      acc[reco.equipmentGroup] = [];
    }
    acc[reco.equipmentGroup].push(reco);
    return acc;
  }, {} as Record<string, TransformedRecommendation[]>);

  return (
    <View style={styles.table}>
      <View style={styles.row}>
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
          style={[styles.headerCell3, styles.colPriority, { fontSize: 10 }]}
        >
          Priority
        </Text>
        <Text
          style={[
            styles.headerCell3,
            styles.colAction2,
            styles.rightBorder,
            { fontSize: 10 },
          ]}
        >
          Action
        </Text>
      </View>

      {Object.entries(groupedData).map(([equipmentGroup, records], index) => (
        <View key={index}>
          <Text
            style={[
              styles.headerCell3,
              styles.rightBorder,
              { fontSize: 10, borderTop: 0 },
            ]}
          >
            {equipmentGroup}
          </Text>

          {records.map((reco, subIndex) => (
            <View style={styles.row} key={subIndex}>
              <Text
                style={[
                  styles.cell3,
                  styles.colEquipmentList,
                  { fontSize: 10 },
                ]}
              >
                {reco.equipmentAndComponent}
              </Text>
              <Text
                style={[
                  styles.cell3,
                  styles.colPriority,
                  { fontSize: 10, fontWeight: "bold", textAlign: "center" },
                ]}
              >
                {reco.priority}
              </Text>
              <Text
                style={[
                  styles.cell3,
                  styles.colAction2,
                  styles.rightBorder,
                  { fontSize: 10 },
                ]}
              >
                <Text style={{ fontWeight: "bold" }}>{reco.priority}: </Text>
                {reco.action} {"\n\n"}Date: {reco.date}
              </Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default RecommendationTable;

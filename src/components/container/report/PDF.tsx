/* eslint-disable jsx-a11y/alt-text */
import { Button } from "@/components/ui/button";
import { selectedJob } from "@/schema";
import {
  Document,
  Page,
  Text,
  StyleSheet,
  PDFDownloadLink,
  Image,
  View,
} from "@react-pdf/renderer";

const recommendations = [
  {
    equipmentName: "Services Pumps SPU303 – CHPP Dirty Water Dam Pump No. 3",
    component: "SPU303 Compressor",
    priority: "P4",
    action:
      "Planned replacement on convenient opportunity is stillrecommended.",
    date: "08 August 2024",
  },
  {
    equipmentName: "Services Pumps SPU303 – CHPP Dirty Water Dam Pump No. 3",
    component: "SPU303 Compressor",
    priority: "P6",
    action: "Java CM will monitor the pump condition on 2-weekly interval.",
    date: "02 September 2024",
  },
];

const machinesHealth = [
  {
    equipmentName: "Services Pumps SPU104 – Raw Water Pump",
    components: "SPU104 Motor",
    previousCondtion: "N",
    currentCondtion: "N",
    analysis: "No defects were detected.",
  },
  {
    equipmentName: "Services Pumps SPU104 – Raw Water Pump",
    components: "SPU104 Motor",
    previousCondtion: "N",
    currentCondtion: "N",
    analysis: "No defects were detected.",
  },
  {
    equipmentName: "Services Pumps SPU104 – Raw Water Pump",
    components: "SPU104 Motor",
    previousCondtion: "N",
    currentCondtion: "N",
    analysis: "No defects were detected.",
  },
  {
    equipmentName: "Services Pumps SPU104 – Raw Water Pump",
    components: "SPU104 Motor",
    previousCondtion: "N",
    currentCondtion: "N",
    analysis: "No defects were detected.",
  },
  {
    equipmentName: "Services Pumps SPU104 – Raw Water Pump",
    components: "SPU104 Motor",
    previousCondtion: "N",
    currentCondtion: "N",
    analysis: "No defects were detected.",
  },
  {
    equipmentName: "Services Pumps SPU104 – Raw Water Pump",
    components: "SPU104 Motor",
    previousCondtion: "N",
    currentCondtion: "N",
    analysis: "No defects were detected.",
  },
  {
    equipmentName: "Services Pumps SPU104 – Raw Water Pump",
    components: "SPU104 Motor",
    previousCondtion: "N",
    currentCondtion: "N",
    analysis: "No defects were detected.",
  },
  {
    equipmentName: "Services Pumps SPU104 – Raw Water Pump",
    components: "SPU104 Motor",
    previousCondtion: "N",
    currentCondtion: "N",
    analysis: "No defects were detected.",
  },
];

const graphData = [
  {
    label: "Normal",
    previous: 28,
    current: 21,
    prevColor: "#90EE90",
    currColor: "#006400",
  },
  {
    label: "Moderate",
    previous: 6,
    current: 9,
    prevColor: "#FFFF99",
    currColor: "#FFD700",
  },
  {
    label: "Severe",
    previous: 1,
    current: 2,
    prevColor: "#F4A460",
    currColor: "#FF8C00",
  },
  {
    label: "Critical",
    previous: 0,
    current: 0,
    prevColor: "#DC143C",
    currColor: "#8B0000",
  },
  {
    label: "Missed Points",
    previous: 6,
    current: 9,
    prevColor: "#A9A9A9",
    currColor: "#000000",
  },
  {
    label: "Total Count",
    current: 41,
    currColor: "#808080",
  },
];

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
  },
  severity: {
    width: 20,
    height: 20,
  },
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
    paddingVertical: 2,
  },
  cell3: {
    borderLeft: "0.5px solid black",
    borderBottom: "0.5px solid black",
    padding: 5,
  },
  colPreviousCondtion: { flex: 0.4 },
  colCurrentCondtion: { flex: 0.4 },
  colAnalysis: { flex: 2 },
  //bar graph to
  subHeader: {
    fontSize: 20,
    textAlign: "center",
    paddingTop: 5,
    color: "#808080",
  },
  chartWrapper: {
    borderWidth: 2,
    borderColor: "#808080",
    padding: 10,
    margin: 10,
  },
  chartContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  gridContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  gridLine: {
    position: "absolute",
    width: "100%",
    height: 1,
    backgroundColor: "#D3D3D3",
  },
  yAxisContainer: {
    width: 40,
    height: 200,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginRight: 10,
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
    borderWidth: 1,
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

const yAxisValues = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45];

const BarChart = () => (
  <View style={styles.chartWrapper}>
    <Text style={styles.subHeader}>Machinery Condition Summary</Text>
    <View style={styles.chartContainer}>
      <View style={styles.yAxisContainer}>
        {yAxisValues.map((value, index) => (
          <Text
            key={index}
            style={[styles.yAxisLabel, { bottom: index * 20 + 15 }]}
          >
            {value}
          </Text>
        ))}
      </View>

      <View style={styles.graphContainer}>
        <View style={styles.gridContainer}>
          {yAxisValues.map((value, index) => (
            <View
              key={index}
              style={[styles.gridLine, { bottom: index * 20 + 15 }]}
            />
          ))}
        </View>
        {graphData.map((item, index) => (
          <View key={index} style={styles.barGroup}>
            <View style={styles.barContainer}>
              {item.previous !== undefined && (
                <View style={styles.barItem}>
                  <Text style={styles.barValue}>{item.previous}</Text>
                  <View
                    style={[
                      styles.bar,
                      {
                        height: item.previous * 4,
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
                      height: item.current * 4,
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

const PdfDocument = ({ data }: { data: selectedJob }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.header}>
        <Image style={styles.logo} src="/java(logo).png" />
        <View style={styles.companyDetails}>
          <Text style={styles.companyName}>
            <Text style={{ color: "red" }}>JAVA</Text> Condition Monitoring Pty
            Ltd
          </Text>
          <Text style={styles.contact}>ABN: XX XXX</Text>
          <Text style={styles.contact}>XXXXX NSW 9000</Text>
          <Text style={styles.contact}>XXXX XXX XXX</Text>
          <Text style={styles.contact}>ryan.java@xxxxxxxxxxx.com.au</Text>
        </View>
      </View>

      <Text style={styles.title}>Vibration Analysis Report</Text>
      <Text style={styles.subtitle}>Pumps VA Report</Text>

      <Text style={[styles.details, { marginTop: 50 }]}>
        <Text style={{ fontWeight: "bold" }}>Client :</Text> {data?.user?.name}
      </Text>
      <Text style={styles.details}>
        <Text style={{ fontWeight: "bold" }}>Plant Area :</Text> {data?.area}
      </Text>
      <Text style={styles.details}>
        <Text style={{ fontWeight: "bold" }}>Report Number :</Text> {data?.reportNumber}
      </Text>
      <Text style={styles.details}>
        <Text style={{ fontWeight: "bold" }}>Date Inspected :</Text> 01 January
        2024
      </Text>
      <Text style={styles.details}>
        <Text style={{ fontWeight: "bold" }}>Date Reported :</Text>{" "}
        {new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
      </Text>

      <Text style={[styles.details, { marginTop: 30 }]}>
        <Text style={{ fontWeight: "bold" }}>Job Number :</Text> {data?.jobNumber}
      </Text>
      <Text style={styles.details}>
        <Text style={{ fontWeight: "bold" }}>Purchase Order Number :</Text> {data?.poNumber}
      </Text>
      <Text style={styles.details}>
        <Text style={{ fontWeight: "bold" }}>Work Order Number :</Text> {data?.woNumber}
      </Text>

      <BarChart />

      <Text style={[styles.details, { marginTop: 250 }]}>
        Data Analysis and Report by
      </Text>
      <Text
        style={[styles.details, { marginTop: 10, textDecoration: "underline" }]}
      >
        Ryan Java,
        <Text style={{ fontStyle: "italic" }}>MIEAust, VA Cat 2</Text>
      </Text>

      <Text style={{ marginTop: 40, fontWeight: "bold", fontSize: 10 }}>
        Disclaimer:
        <Text style={{ fontWeight: "normal" }}>
          All reports issued by Java Condition Monitoring (JCM) are a result of
          testings using the industry approved instruments with current
          calibration certificates, and all data is analysed by technicians who
          have complied with the required industry experience, holding ISO
          certifications on their related field of practice. Recommendations are
          based on, but not limited to, data information, alarm limits, on site
          observation, and criticality of equipment to the line of operation.
          JCM ensures that a thorough assessment of machinery health condition
          has been undertaken prior to report submission. However, the client
          should acknowledge that the authority of this report is limited only
          to diagnostics and recommendations; the maintenance actions will only
          take place upon the approval of the client’s designated authority, and
          therefore not holding JCM accountable of any indemnity claim or
          financial obligation due to operational losses, machinery damages and
          other consequences aŌer conducƟng the maintenance actions.
        </Text>
      </Text>
    </Page>

    <Page style={styles.page}>
      <View style={[styles.header, { justifyContent: "space-between" }]}>
        <Image style={styles.logo} src="/logo.png" />
        <View style={styles.companyDetails}>
          <Text style={[styles.contact, { fontWeight: "bold" }]}>
            Vibration Analysis Report{" "}
          </Text>
          <Text style={styles.contact}>Client: Client 1</Text>
          <Text style={styles.contact}>Plant Area: All area</Text>
        </View>
      </View>

      <Text style={{ fontWeight: "bold", fontSize: 12 }}>Introduction</Text>
      <Text style={[styles.details, { marginTop: 5, fontSize: 10 }]}>
        A 4-weekly routine vibration survey was conducted to determine the
        conditions Pumps, to monitor any defect that was previously detected,
        and to recommend maintenance action based on the severity of machinery’s
        condition. Oil analysis results and bearing temperatures were also
        considered in the assessment of machinery’s overall health conditions.
      </Text>
      <Text style={{ fontWeight: "bold", fontSize: 12, marginTop: 15 }}>
        Methodology
      </Text>
      <View style={{ marginLeft: 10, marginTop: 5 }}>
        <Text style={{ fontSize: 10 }}>- Vibration Analysis</Text>
        <Text style={{ fontSize: 10 }}>- Oil Analysis</Text>
        <Text style={{ fontSize: 10 }}>- Temperature Monitoring</Text>
      </View>
      <Text style={{ fontWeight: "bold", fontSize: 12, marginTop: 15 }}>
        Testing Equipment
      </Text>
      <View style={{ marginLeft: 10, marginTop: 5 }}>
        <Text style={{ fontSize: 10 }}>
          - CSI 2140 Machinery Health Analyser (S/N B2140XXXXX) with AMS Suite
          Version 6.33 software
        </Text>
        <Text style={{ fontSize: 10 }}>- 100mV/g accelerometer</Text>
        <Text style={{ fontSize: 10 }}>- accelerometer</Text>
        <Text style={{ fontSize: 10 }}>- Milwaukee 2268-40 Laser Temp Gun</Text>
      </View>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 12,
          marginTop: 15,
          marginBottom: 15,
        }}
      >
        Condition Description
      </Text>
      <View style={styles.table}>
        <View style={styles.row}>
          <Text
            style={[
              styles.headerCell,
              styles.colSymbol,
              { fontSize: 12, fontWeight: "normal" },
            ]}
          >
            Symbol
          </Text>
          <Text
            style={[
              styles.headerCell,
              styles.colCondition,
              { fontSize: 12, fontWeight: "normal" },
            ]}
          >
            Condition
          </Text>
          <Text
            style={[
              styles.headerCell,
              styles.colDescription,
              { fontSize: 12, fontWeight: "normal" },
            ]}
          >
            Description
          </Text>
          <Text
            style={[
              styles.headerCell,
              styles.colAction,
              { fontSize: 12, fontWeight: "normal" },
            ]}
          >
            Action
          </Text>
          <Text
            style={[
              styles.headerCell,
              styles.rightBorder,
              styles.colRisk,
              { fontSize: 12, fontWeight: "normal" },
            ]}
          >
            Risk Category
          </Text>
        </View>

        <View style={styles.row}>
          <Image
            style={[styles.cell, styles.colSymbol, { objectFit: "contain" }]}
            src="/report/N.png"
          />
          <Text style={[styles.cell, styles.colCondition, { fontSize: 10 }]}>
            Normal
          </Text>
          <Text style={[styles.cell, styles.colDescription, { fontSize: 10 }]}>
            Testing results on equipment are within acceptable limits. No
            indications of a defect are detected in data and no abnormalities
            are observed in the operation.
          </Text>
          <Text style={[styles.cell, styles.colAction, { fontSize: 10 }]}>
            No action is required.
          </Text>
          <Text
            style={[
              styles.cell,
              styles.colRisk,
              styles.rightBorder,
              { fontSize: 10 },
            ]}
          >
            Low
          </Text>
        </View>
        <View style={styles.row}>
          <Image
            style={[styles.cell, styles.colSymbol, { objectFit: "contain" }]}
            src="/report/M.png"
          />
          <Text style={[styles.cell, styles.colCondition, { fontSize: 10 }]}>
            Moderate
          </Text>
          <Text style={[styles.cell, styles.colDescription, { fontSize: 10 }]}>
            Testing results on equipment are slightly higher than acceptable
            limits. Minor defects are detected in data and/or minor
            abnormalities are observed in operation.
          </Text>
          <Text style={[styles.cell, styles.colAction, { fontSize: 10 }]}>
            Continue routine monitoring
          </Text>
          <Text
            style={[
              styles.cell,
              styles.colRisk,
              styles.rightBorder,
              { fontSize: 10 },
            ]}
          >
            Low
          </Text>
        </View>
        <View style={styles.row}>
          <Image
            style={[styles.cell, styles.colSymbol, { objectFit: "contain" }]}
            src="/report/S.png"
          />
          <Text style={[styles.cell, styles.colCondition, { fontSize: 10 }]}>
            Severe
          </Text>
          <Text style={[styles.cell, styles.colDescription, { fontSize: 10 }]}>
            Testing results on equipment are significantly higher than
            acceptable limits. Alarming level of defect indications are detected
            in data and/or pronounced abnormalities are observed in operation.
          </Text>
          <Text style={[styles.cell, styles.colAction, { fontSize: 10 }]}>
            -Preventive action (e.g., greasing, tightening of bolts, etc.){" "}
            {"\n"}-Corrective action (e.g., planned replacement). {"\n"}-Close
            monitoring interval while waiting for replacement.
          </Text>
          <Text
            style={[
              styles.cell,
              styles.colRisk,
              styles.rightBorder,
              { fontSize: 10 },
            ]}
          >
            High
          </Text>
        </View>
        <View style={styles.row}>
          <Image
            style={[styles.cell, styles.colSymbol, { objectFit: "contain" }]}
            src="/report/C.png"
          />
          <Text style={[styles.cell, styles.colCondition, { fontSize: 10 }]}>
            Critical
          </Text>
          <Text style={[styles.cell, styles.colDescription, { fontSize: 10 }]}>
            Testing results on equipment exceeded the maximum allowable limits.
            High probability of failure is likely to occur if left uncorrected.
          </Text>
          <Text style={[styles.cell, styles.colAction, { fontSize: 10 }]}>
            Immediate corrective action is required
          </Text>
          <Text
            style={[
              styles.cell,
              styles.colRisk,
              styles.rightBorder,
              { fontSize: 10 },
            ]}
          >
            Very High
          </Text>
        </View>
        <View style={styles.row}>
          <Image
            style={[styles.cell, styles.colSymbol, { objectFit: "contain" }]}
            src="/report/X.png"
          />
          <Text style={[styles.cell, styles.colCondition, { fontSize: 10 }]}>
            Missed Points
          </Text>
          <Text style={[styles.cell, styles.colDescription, { fontSize: 10 }]}>
            Data are not collected; equipment conditions are unknown.{" "}
          </Text>
          <Text style={[styles.cell, styles.colAction, { fontSize: 10 }]}>
            -Redesign guarding to allow access. {"\n"}-Install permanent
            accelerometer {"\n"}-Collect data if machine was not running on
            previous survey.{" "}
          </Text>
          <Text
            style={[
              styles.cell,
              styles.colRisk,
              styles.rightBorder,
              { fontSize: 10 },
            ]}
          >
            Unknown
          </Text>
        </View>
      </View>

      <View style={styles.pageNumber}>
        <Text style={{ fontSize: 10 }}>Pumps VA Report</Text>
        <Text
          style={{ fontSize: 10 }}
          render={({ pageNumber, totalPages }) => (
            <Text>
              Page <Text style={{ fontWeight: "bold" }}>{pageNumber}</Text> of{" "}
              <Text style={{ fontWeight: "bold" }}>{totalPages}</Text>
            </Text>
          )}
        />
      </View>
    </Page>

    <Page style={styles.page}>
      <View style={[styles.header, { justifyContent: "space-between" }]} fixed>
        <Image style={styles.logo} src="/logo.png" />
        <View style={styles.companyDetails}>
          <Text style={[styles.contact, { fontWeight: "bold" }]}>
            Vibration Analysis Report{" "}
          </Text>
          <Text style={styles.contact}>Client: Client 1</Text>
          <Text style={styles.contact}>Plant Area: All area</Text>
        </View>
      </View>
      <Text style={{ fontWeight: "bold", fontSize: 12, marginBottom: 15 }}>
        Maintenance Priority Description
      </Text>

      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={[styles.headerCell2, { fontSize: 12 }]}>P1</Text>
          <Text style={[styles.headerCell2, { fontSize: 12 }]}>P2</Text>
          <Text style={[styles.headerCell2, { fontSize: 12 }]}>P3</Text>
          <Text style={[styles.headerCell2, { fontSize: 12 }]}>P4</Text>
          <Text style={[styles.headerCell2, { fontSize: 12 }]}>P5</Text>
          <Text
            style={[styles.headerCell2, styles.rightBorder, { fontSize: 12 }]}
          >
            P6
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={[styles.cell2, { fontSize: 10 }]}>
            Immediate corrective action is required
          </Text>
          <Text style={[styles.cell2, { fontSize: 10 }]}>
            Action within a week is recommended
          </Text>
          <Text style={[styles.cell2, { fontSize: 10 }]}>
            Action within a fortnight is recommended
          </Text>
          <Text style={[styles.cell2, { fontSize: 10 }]}>
            Action within a month is recommended
          </Text>
          <Text style={[styles.cell2, { fontSize: 10 }]}>
            Planned maintenance, approximately within 3 months is recommende{" "}
          </Text>
          <Text style={[styles.cell2, styles.rightBorder, { fontSize: 10 }]}>
            No action is required
          </Text>
        </View>
      </View>

      <Text
        style={{
          fontWeight: "bold",
          fontSize: 12,
          marginTop: 25,
          marginBottom: 15,
        }}
      >
        Maintenance Recommendations
      </Text>
      <View style={styles.table}>
        <View style={styles.row}>
          <Text
            style={[
              styles.headerCell3,
              styles.colEquipmentList,
              { fontSize: 10 },
            ]}
          >
            Equipment List{" "}
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

        {recommendations.map((reco, i) => (
          <View key={i}>
            <Text
              style={[
                styles.headerCell3,
                styles.rightBorder,
                { fontSize: 10, borderTop: 0 },
              ]}
            >
              {reco.equipmentName}
            </Text>
            <View style={styles.row}>
              <Text
                style={[
                  styles.cell3,
                  styles.colEquipmentList,
                  styles.colEquipmentList,
                  { fontSize: 10 },
                ]}
              >
                {reco.component}
              </Text>
              <Text
                style={[
                  styles.cell3,
                  styles.colEquipmentList,
                  styles.colPriority,
                  { fontSize: 10, fontWeight: "bold", textAlign: "center" },
                ]}
              >
                {reco.priority}
              </Text>
              <Text
                style={[
                  styles.cell3,
                  styles.colEquipmentList,
                  styles.colAction2,
                  styles.rightBorder,
                  { fontSize: 10 },
                ]}
              >
                <Text style={{ fontWeight: "bold" }}>{reco.priority}: </Text>
                {reco.action} {"\n"}
                {"\n"}Date: {reco.date}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.pageNumber}>
        <Text style={{ fontSize: 10 }}>Pumps VA Report</Text>
        <Text
          style={{ fontSize: 10 }}
          render={({ pageNumber, totalPages }) => (
            <Text>
              Page <Text style={{ fontWeight: "bold" }}>{pageNumber}</Text> of{" "}
              <Text style={{ fontWeight: "bold" }}>{totalPages}</Text>
            </Text>
          )}
        />
      </View>
    </Page>

    <Page style={styles.page}>
      <View style={[styles.header, { justifyContent: "space-between" }]} fixed>
        <Image style={styles.logo} src="/logo.png" />
        <View style={styles.companyDetails}>
          <Text style={[styles.contact, { fontWeight: "bold" }]}>
            Vibration Analysis Report{" "}
          </Text>
          <Text style={styles.contact}>Client: Client 1</Text>
          <Text style={styles.contact}>Plant Area: All area</Text>
        </View>
      </View>
      <Text
        style={{ fontWeight: "bold", fontSize: 12, marginBottom: 15 }}
        fixed
      >
        Machinery Health Condition Reports
      </Text>

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

        {machinesHealth.map((machine, i) => (
          <View key={i} wrap={false}>
            <Text
              style={[
                styles.headerCell3,
                styles.rightBorder,
                { fontSize: 10, borderTop: 0 },
              ]}
            >
              {machine.equipmentName}
            </Text>
            <View style={styles.row}>
              <Text
                style={[
                  styles.cell3,
                  styles.colEquipmentList,
                  styles.colEquipmentList,
                  { fontSize: 10 },
                ]}
              >
                {machine.components}
              </Text>
              <Image
                style={[
                  styles.cell3,
                  styles.colPreviousCondtion,
                  { objectFit: "contain" },
                ]}
                src={`/report/${machine.previousCondtion}.png`}
              />
              <Image
                style={[
                  styles.cell3,
                  styles.colCurrentCondtion,
                  { objectFit: "contain" },
                ]}
                src={`/report/${machine.currentCondtion}.png`}
              />
              <Text
                style={[
                  styles.cell3,
                  styles.colEquipmentList,
                  styles.colAction2,
                  styles.rightBorder,
                  { fontSize: 10 },
                ]}
              >
                {machine.analysis}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.pageNumber} fixed>
        <Text style={{ fontSize: 10 }}>Pumps VA Report</Text>
        <Text
          style={{ fontSize: 10 }}
          render={({ pageNumber, totalPages }) => (
            <Text>
              Page <Text style={{ fontWeight: "bold" }}>{pageNumber}</Text> of{" "}
              <Text style={{ fontWeight: "bold" }}>{totalPages}</Text>
            </Text>
          )}
        />
      </View>
    </Page>
  </Document>
);

const PdfDownload = ({ data }: { data: selectedJob }) => (
  <PDFDownloadLink document={<PdfDocument data={data} />} fileName="report.pdf">
    {({ loading }) => (
      <Button className="bg-main hover:bg-follow" disabled={loading}>
        PDF
      </Button>
    )}
  </PDFDownloadLink>
);

export default PdfDownload;

// import { useEffect, useRef, useState } from "react";
// import { Document, Page, StyleSheet, PDFDownloadLink, Image as PdfImage } from "@react-pdf/renderer";
// import html2canvas from "html2canvas";
// import { Button } from "@/components/ui/button";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
// import { BarChart, CartesianGrid, XAxis, Bar } from "recharts";

// const chartData = [
//   { month: "January", previous: 186, current: 80 },
//   { month: "February", previous: 305, current: 200 },
//   { month: "March", previous: 237, current: 120 },
//   { month: "April", previous: 73, current: 190 },
//   { month: "May", previous: 209, current: 130 },
//   { month: "June", previous: 214, current: 140 },
// ];

// const chartConfig = {
//   previous: {
//     label: "Previous",
//     color: "hsl(var(--chart-1))",
//   },
//   current: {
//     label: "Current",
//     color: "hsl(var(--chart-2))",
//   },
// };

// const captureCardAsImage = (cardRef: HTMLDivElement, callback: (imgUrl: string) => void) => {
//   if (!cardRef) return;
//   setTimeout(() => {
//     html2canvas(cardRef, { scale: 3, useCORS: true, backgroundColor: null }).then((canvas) => {
//       callback(canvas.toDataURL("image/png", 1.0));
//     });
//   }, 1200);
// };

// // Hidden ChartCard Component (Only for Capturing)
// const HiddenChartCard = ({ onCapture }: { onCapture: (imgUrl: string) => void }) => {
//   const cardRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (cardRef.current) {
//       captureCardAsImage(cardRef.current, onCapture);
//     }
//   }, [onCapture]);

//   return (
//     <div ref={cardRef} className="absolute -left-full -top-full opacity-0">
//       <Card className="w-full">
//         <CardHeader>
//           <CardTitle>Machinery Condition Summary</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <ChartContainer config={chartConfig}>
//             <BarChart accessibilityLayer data={chartData} width={800} height={400}>
//               <CartesianGrid vertical={false} />
//               <XAxis
//                 dataKey="month"
//                 tickLine={false}
//                 tickMargin={10}
//                 axisLine={false}
//                 tickFormatter={(value) => value.slice(0, 3)}
//               />
//               <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
//               <Bar dataKey="previous" fill="var(--color-previous)" radius={4} />
//               <Bar dataKey="current" fill="var(--color-current)" radius={4} />
//             </BarChart>
//           </ChartContainer>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// const styles = StyleSheet.create({
//   page: { padding: 20, display: "flex", alignItems: "center", width: "100%" },
//   image: { width: "100%", height: "auto" },
// });

// const PdfDocument = ({ chartImage }: { chartImage: string }) => (
//   <Document>
//     <Page style={styles.page}>
//       {chartImage && <PdfImage src={chartImage} style={styles.image} />}
//     </Page>
//   </Document>
// );

// const PdfDownload = () => {
//   const [chartImage, setChartImage] = useState<string | null>(null);

//   return (
//     <div className="flex flex-col items-center gap-4">
//       {/* Hidden Chart (Only for Capturing) */}
//       <HiddenChartCard onCapture={(img) => setChartImage(img)} />

//       {/* Download Button */}
//       {chartImage && (
//         <PDFDownloadLink document={<PdfDocument chartImage={chartImage} />} fileName="report.pdf">
//           {({ loading }) => (
//             <Button className="bg-main hover:bg-follow" disabled={loading}>
//               {loading ? "Generating..." : "Download PDF"}
//             </Button>
//           )}
//         </PDFDownloadLink>
//       )}
//     </div>
//   );
// };

// export default PdfDownload;

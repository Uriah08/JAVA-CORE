/* eslint-disable jsx-a11y/alt-text */
import { Button } from "@/components/ui/button";
import { Document, Page, Text, StyleSheet, PDFDownloadLink, Image, View } from "@react-pdf/renderer";

const recommendations = [
  {
    equipmentName: "Services Pumps SPU303 – CHPP Dirty Water Dam Pump No. 3",
    component: "SPU303 Compressor",
    priority: "P4",
    action: "Planned replacement on convenient opportunity is stillrecommended.",
    date: "08 August 2024"
  },
  {
    equipmentName: "Services Pumps SPU303 – CHPP Dirty Water Dam Pump No. 3",
    component: "SPU303 Compressor",
    priority: "P6",
    action: "Java CM will monitor the pump condition on 2-weekly interval.",
    date: "02 September 2024"
  }
]

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
    borderRight: "0.5px solid black"
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
    padding: 5
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
    paddingVertical: 2
  },
  cell3: {
    borderLeft: "0.5px solid black",
    borderBottom: "0.5px solid black",
    padding: 5
  },
});

const PdfDocument = () => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.header}>
        <Image style={styles.logo} src="/logo.png" />
        <View style={styles.companyDetails}>
          <Text style={styles.companyName}><Text style={{ color: "red" }}>JAVA</Text> Condition Monitoring Pty Ltd</Text>
          <Text style={styles.contact}>ABN: XX XXX</Text>
          <Text style={styles.contact}>XXXXX NSW 9000</Text>
          <Text style={styles.contact}>XXXX XXX XXX</Text>
          <Text style={styles.contact}>ryan.java@xxxxxxxxxxx.com.au</Text>
        </View>
      </View>

      <Text style={styles.title}>Vibration Analysis Report</Text>
      <Text style={styles.subtitle}>Pumps VA Report</Text>

      <Text style={[styles.details, { marginTop: 50 }]}>
        <Text style={{ fontWeight: "bold" }}>Client :</Text> Client 1
      </Text>
      <Text style={styles.details}>
        <Text style={{ fontWeight: "bold" }}>Plant Area :</Text> All area
      </Text>
      <Text style={styles.details}>
        <Text style={{ fontWeight: "bold" }}>Report Number :</Text> : ABC123 – VA01 
      </Text>
      <Text style={styles.details}>
        <Text style={{ fontWeight: "bold" }}>Date Inspected :</Text> 01 January 2024 
      </Text>
      <Text style={styles.details}>
        <Text style={{ fontWeight: "bold" }}>Date Reported :</Text> 05 January 2024 
      </Text>
      
      <Text style={[styles.details, { marginTop: 30 }]}>
        <Text style={{ fontWeight: "bold" }}>Job Number :</Text> ABC123-1
      </Text>
      <Text style={styles.details}>
        <Text style={{ fontWeight: "bold" }}>Purchase Order Number :</Text> 12345
      </Text>
      <Text style={styles.details}>
        <Text style={{ fontWeight: "bold" }}>Work Order Number :</Text> : 1234535 
      </Text>

      <Text style={[styles.details, { marginTop: 250 }]}>Data Analysis and Report by</Text>
      <Text style={[styles.details, { marginTop: 10, textDecoration: "underline", }]}>
        Ryan Java,
        <Text style={{ fontStyle: "italic" }}>MIEAust, VA Cat 2</Text>
      </Text>
      
      <Text style={{ marginTop: 40, fontWeight: "bold", fontSize: 10 }}>
        Disclaimer:
        <Text style={{ fontWeight: "normal" }}>All reports issued by Java Condition Monitoring (JCM) are a result of testings using the industry approved instruments with current calibration certificates,
        and all data is analysed by technicians who have complied with the required industry experience, holding ISO certifications on their related field of practice.
        Recommendations are based on, but not limited to, data information, alarm limits, on site observation, and criticality of equipment to the line of operation. JCM
        ensures that a thorough assessment of machinery health condition has been undertaken prior to report submission. However, the client should acknowledge that
        the authority of this report is limited only to diagnostics and recommendations; the maintenance actions will only take place upon the approval of the client’s
        designated authority, and therefore not holding JCM accountable of any indemnity claim or financial obligation due to operational losses, machinery damages and
        other consequences aŌer conducƟng the maintenance actions.
        </Text>
      </Text>

    </Page>

    <Page style={styles.page}>
    <View style={[styles.header, {justifyContent: "space-between"}]}>
        <Image style={styles.logo} src="/logo.png" />
        <View style={styles.companyDetails}>
          <Text style={[styles.contact, {fontWeight: "bold"}]}>Vibration Analysis Report </Text>
          <Text style={styles.contact}>Client: Client 1</Text>
          <Text style={styles.contact}>Plant Area: All area</Text>
        </View>
    </View>

    <Text style={{fontWeight: "bold", fontSize: 12}}>Introduction</Text>
      <Text style={[styles.details, {marginTop: 5, fontSize: 10}]}>
      A 4-weekly routine vibration survey was conducted to determine the conditions Pumps, to monitor any defect that was
      previously detected, and to recommend maintenance action based on the severity of machinery’s condition. Oil
      analysis results and bearing temperatures were also considered in the assessment of machinery’s overall health
      conditions.
      </Text>
      <Text style={{fontWeight: "bold", fontSize: 12, marginTop: 15}}>Methodology</Text>
      <View style={{ marginLeft: 10, marginTop: 5 }}>
        <Text style={{ fontSize: 10 }}>
          -  Vibration Analysis
        </Text>
        <Text style={{ fontSize: 10 }}>
          -  Oil Analysis
        </Text>
        <Text style={{ fontSize: 10 }}>
          -  Temperature Monitoring
        </Text>
      </View>
      <Text style={{fontWeight: "bold", fontSize: 12, marginTop: 15}}>Testing Equipment</Text>
      <View style={{ marginLeft: 10, marginTop: 5 }}>
        <Text style={{ fontSize: 10 }}>
          -  CSI 2140 Machinery Health Analyser (S/N B2140XXXXX) with AMS Suite Version 6.33 software
        </Text>
        <Text style={{ fontSize: 10 }}>
          -  100mV/g accelerometer
        </Text>
        <Text style={{ fontSize: 10 }}>
          -  accelerometer
        </Text>
        <Text style={{ fontSize: 10 }}>
          -  Milwaukee 2268-40 Laser Temp Gun
        </Text>
      </View>
      <Text style={{fontWeight: "bold", fontSize: 12, marginTop: 15, marginBottom: 15}}>Condition Description</Text>
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={[styles.headerCell, styles.colSymbol, { fontSize: 12, fontWeight: "normal"}]}>Symbol</Text>
          <Text style={[styles.headerCell, styles.colCondition, { fontSize: 12, fontWeight: "normal"}]}>Condition</Text>
          <Text style={[styles.headerCell, styles.colDescription, { fontSize: 12, fontWeight: "normal"}]}>Description</Text>
          <Text style={[styles.headerCell, styles.colAction, { fontSize: 12, fontWeight: "normal"}]}>Action</Text>
          <Text style={[styles.headerCell, styles.rightBorder, styles.colRisk, { fontSize: 12, fontWeight: "normal"}]}>Risk Category</Text>
        </View>
        
        <View style={styles.row}>
        <Image style={[styles.cell, styles.colSymbol, { objectFit: "contain" }]} src="/report/N.png" />
          <Text style={[styles.cell, styles.colCondition, {fontSize: 10}]}>Normal</Text>
          <Text style={[styles.cell, styles.colDescription, {fontSize: 10}]}>Testing results on equipment are within acceptable limits. No indications of a defect are detected in data and no abnormalities are observed in the operation.</Text>
          <Text style={[styles.cell, styles.colAction, {fontSize: 10}]}>No action is required.</Text>
          <Text style={[styles.cell, styles.colRisk, styles.rightBorder, {fontSize: 10}]}>Low</Text>
        </View>
        <View style={styles.row}>
        <Image style={[styles.cell, styles.colSymbol, { objectFit: "contain" }]} src="/report/M.png" />
          <Text style={[styles.cell, styles.colCondition, {fontSize: 10}]}>Moderate</Text>
          <Text style={[styles.cell, styles.colDescription, {fontSize: 10}]}>Testing results on equipment are slightly higher than acceptable limits. Minor defects are detected in data and/or minor abnormalities are observed in operation.</Text>
          <Text style={[styles.cell, styles.colAction, {fontSize: 10}]}>Continue routine monitoring</Text>
          <Text style={[styles.cell, styles.colRisk, styles.rightBorder, {fontSize: 10}]}>Low</Text>
        </View>
        <View style={styles.row}>
        <Image style={[styles.cell, styles.colSymbol, { objectFit: "contain" }]} src="/report/S.png" />
          <Text style={[styles.cell, styles.colCondition, {fontSize: 10}]}>Severe</Text>
          <Text style={[styles.cell, styles.colDescription, {fontSize: 10}]}>Testing results on equipment are significantly higher than acceptable limits. Alarming level of defect indications are detected in data and/or pronounced abnormalities are observed in operation.</Text>
          <Text style={[styles.cell, styles.colAction, {fontSize: 10}]}>-Preventive action (e.g., greasing, tightening of bolts, etc.) {'\n'}-Corrective action (e.g., planned replacement). {'\n'}-Close monitoring interval while waiting for replacement.</Text>
          <Text style={[styles.cell, styles.colRisk, styles.rightBorder, {fontSize: 10}]}>High</Text>
        </View>
        <View style={styles.row}>
        <Image style={[styles.cell, styles.colSymbol, { objectFit: "contain" }]} src="/report/C.png" />
          <Text style={[styles.cell, styles.colCondition, {fontSize: 10}]}>Critical</Text>
          <Text style={[styles.cell, styles.colDescription, {fontSize: 10}]}>Testing results on equipment exceeded the maximum allowable limits. High probability of failure is likely to occur if left uncorrected.</Text>
          <Text style={[styles.cell, styles.colAction, {fontSize: 10}]}>Immediate corrective action is required</Text>
          <Text style={[styles.cell, styles.colRisk, styles.rightBorder, {fontSize: 10}]}>Very High</Text>
        </View>
        <View style={styles.row}>
        <Image style={[styles.cell, styles.colSymbol, { objectFit: "contain" }]} src="/report/X.png" />
          <Text style={[styles.cell, styles.colCondition, {fontSize: 10}]}>Missed Points</Text>
          <Text style={[styles.cell, styles.colDescription, {fontSize: 10}]}>Data are not collected; equipment conditions are unknown. </Text>
          <Text style={[styles.cell, styles.colAction, {fontSize: 10}]}>-Redesign guarding to allow access. {'\n'}-Install permanent accelerometer {'\n'}-Collect data if machine was not running on previous survey. </Text>
          <Text style={[styles.cell, styles.colRisk, styles.rightBorder, {fontSize: 10}]}>Unknown</Text>
        </View>
      </View>

      <View style={styles.pageNumber}>
        <Text style={{ fontSize: 10 }}>Pumps VA Report</Text>
        <Text style={{ fontSize: 10 }} render={({ pageNumber, totalPages }) => <Text>Page <Text style={{fontWeight: "bold"}}>{pageNumber}</Text> of <Text style={{fontWeight: "bold"}}>{totalPages}</Text></Text>}/>
      </View>
    </Page>

    <Page style={styles.page}>
    <View style={[styles.header, {justifyContent: "space-between"}]}>
        <Image style={styles.logo} src="/logo.png" />
        <View style={styles.companyDetails}>
          <Text style={[styles.contact, {fontWeight: "bold"}]}>Vibration Analysis Report </Text>
          <Text style={styles.contact}>Client: Client 1</Text>
          <Text style={styles.contact}>Plant Area: All area</Text>
        </View>
    </View>
    <Text style={{fontWeight: "bold", fontSize: 12, marginBottom: 15}}>Maintenance Priority Description</Text>

    <View style={styles.table}>
    <View style={styles.row}>
          <Text style={[styles.headerCell2, { fontSize: 12}]}>P1</Text>
          <Text style={[styles.headerCell2, { fontSize: 12}]}>P2</Text>
          <Text style={[styles.headerCell2, { fontSize: 12}]}>P3</Text>
          <Text style={[styles.headerCell2, { fontSize: 12}]}>P4</Text>
          <Text style={[styles.headerCell2, { fontSize: 12}]}>P5</Text>
          <Text style={[styles.headerCell2, styles.rightBorder, { fontSize: 12}]}>P6</Text>
        </View>

        <View style={styles.row}>
          <Text style={[styles.cell2, {fontSize: 10}]}>Immediate corrective action is required</Text>
          <Text style={[styles.cell2, {fontSize: 10}]}>Action within a week is recommended</Text>
          <Text style={[styles.cell2, {fontSize: 10}]}>Action within a fortnight is recommended</Text>
          <Text style={[styles.cell2, {fontSize: 10}]}>Action within a month is recommended</Text>
          <Text style={[styles.cell2, {fontSize: 10}]}>Planned maintenance, approximately within 3 months is recommende </Text>
          <Text style={[styles.cell2, styles.rightBorder, {fontSize: 10}]}>No action is required</Text>
        </View>
        </View>

        <Text style={{fontWeight: "bold", fontSize: 12, marginTop: 25, marginBottom: 15}}>Maintenance Recommendations</Text>
        <View style={styles.table}>
          <View style={styles.row}>
            <Text style={[styles.headerCell3, styles.colEquipmentList, { fontSize: 10}]}>Equipment List </Text>
            <Text style={[styles.headerCell3, styles.colPriority, { fontSize: 10}]}>Priority</Text>
            <Text style={[styles.headerCell3, styles.colAction2, styles.rightBorder, { fontSize: 10}]}>Action</Text>
          </View>
          
          {recommendations.map((reco, i) => (
            <View key={i}>
            <Text style={[styles.headerCell3, styles.rightBorder, { fontSize: 10, borderTop: 0}]}>{reco.equipmentName}</Text>
          <View style={styles.row}>
            <Text style={[styles.cell3, styles.colEquipmentList, styles.colEquipmentList, { fontSize: 10}]}>{reco.component}</Text>
            <Text style={[styles.cell3, styles.colEquipmentList, styles.colPriority, { fontSize: 10, fontWeight: "bold", textAlign: "center"}]}>{reco.priority}</Text>
            <Text style={[styles.cell3, styles.colEquipmentList, styles.colAction2, styles.rightBorder, { fontSize: 10}]}><Text style={{fontWeight: "bold"}}>{reco.priority}: </Text>{reco.action} {'\n'}{'\n'}Date:  {reco.date}</Text>
          </View>
          </View>
          ))}
        </View>

    <View style={styles.pageNumber}>
        <Text style={{ fontSize: 10 }}>Pumps VA Report</Text>
        <Text style={{ fontSize: 10 }} render={({ pageNumber, totalPages }) => <Text>Page <Text style={{fontWeight: "bold"}}>{pageNumber}</Text> of <Text style={{fontWeight: "bold"}}>{totalPages}</Text></Text>}/>
      </View>
    </Page>
  </Document>
);

const PdfDownload = () => (
  <PDFDownloadLink document={<PdfDocument />} fileName="report.pdf">
    {({ loading }) => (
      <Button className="bg-main hover:bg-follow" disabled={loading}>PDF</Button>
    )}
  </PDFDownloadLink>
);

export default PdfDownload;



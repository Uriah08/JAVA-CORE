/* eslint-disable jsx-a11y/alt-text */
import { Button } from "@/components/ui/button";
import { Document, Page, Text, StyleSheet, PDFDownloadLink, Image, View } from "@react-pdf/renderer";

// const data = [
//   { symbol: "N", condition: "Normal", description: "Testing results on equipment are within acceptable limits. No indications of a defect are detected in data and no abnormalities are observed in the operation.", action: "No action is required", risk: "Low" },
//   { symbol: "M", condition: "Moderate", description: "Testing results on equipment are slightly higher than acceptable limits. Minor defects are detected in data and/or minor abnormalities are observed in operation.", action: "Continue routine monitoring", risk: "Low" },
//   { symbol: "S", condition: "Severe", description: "Testing results on equipment are significantly higher than acceptable limits. Alarming level of defect indications are detected in data and/or pronounced abnormalities are observed in operation.", action: "-Preventive action (e.g., greasing, tightening of bolts, etc.)\n-Corrective action (e.g., planned replacement).\n-Close monitoring interval while waiting for replacement.", risk: "High" },
//   { symbol: "C", condition: "Critical", description: "Testing results on equipment exceeded the maximum allowable limits. High probability of failure is likely to occur if left uncorrected.", action: "Immediate corrective action is required", risk: "Very High" },
//   { symbol: "X", condition: "Missed Points", description: "Data are not collected; equipment conditions are unknown.", action: "-Redesign guarding to allow access.\n-Install permanent accelerometer\n-Collect data if machine was not running on previous survey.", risk: "Unknown" }
// ];

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

    <Text style={{fontWeight: "bold", fontSize: 15}}>Introduction</Text>
      <Text style={[styles.details, {marginTop: 5}]}>
      A 4-weekly routine vibration survey was conducted to determine the conditions Pumps, to monitor any defect that was
      previously detected, and to recommend maintenance action based on the severity of machinery’s condition. Oil
      analysis results and bearing temperatures were also considered in the assessment of machinery’s overall health
      conditions.
      </Text>
      <Text style={{fontWeight: "bold", fontSize: 15, marginTop: 15}}>Methodology</Text>
      <View style={{ marginLeft: 10, marginTop: 5 }}>
        <Text style={{ fontSize: 12 }}>
          -  Vibration Analysis
        </Text>
        <Text style={{ fontSize: 12 }}>
          -  Oil Analysis
        </Text>
        <Text style={{ fontSize: 12 }}>
          -  Temperature Monitoring
        </Text>
      </View>
      <Text style={{fontWeight: "bold", fontSize: 15, marginTop: 15}}>Testing Equipment</Text>
      <View style={{ marginLeft: 10, marginTop: 5 }}>
        <Text style={{ fontSize: 12 }}>
          -  CSI 2140 Machinery Health Analyser (S/N B2140XXXXX) with AMS Suite Version 6.33 software
        </Text>
        <Text style={{ fontSize: 12 }}>
          -  100mV/g accelerometer
        </Text>
        <Text style={{ fontSize: 12 }}>
          -  accelerometer
        </Text>
        <Text style={{ fontSize: 12 }}>
          -  Milwaukee 2268-40 Laser Temp Gun
        </Text>
      </View>
      <Text style={{fontWeight: "bold", fontSize: 15, marginTop: 15}}>Condition Description</Text>

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



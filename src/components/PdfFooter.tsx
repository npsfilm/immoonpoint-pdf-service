import React from "react";
import { View, Text } from "@react-pdf/renderer";
import { styles } from "./PdfStyles";

export const PdfFooter: React.FC = () => (
  <View style={styles.footer}>
    <View style={styles.footerDivider} />
    <View style={styles.footerContent}>
      <View style={styles.footerCol}>
        <Text style={styles.footerTitle}>NPS Media GmbH</Text>
        <Text style={styles.footerText}>Klinkerberg 9</Text>
        <Text style={styles.footerText}>86152 Augsburg</Text>
      </View>
      <View style={styles.footerCol}>
        <Text style={styles.footerTitle}>Kontakt</Text>
        <Text style={styles.footerText}>info@immoonpoint.de</Text>
        <Text style={styles.footerText}>+49 821 999 820 71</Text>
      </View>
      <View style={styles.footerCol}>
        <Text style={styles.footerTitle}>Bankverbindung</Text>
        <Text style={styles.footerText}>Stadtsparkasse Augsburg</Text>
        <Text style={styles.footerText}>IBAN: DE21 7205 0000 0251 4487 78</Text>
      </View>
    </View>
  </View>
);

import React from "react";
import { View, Text } from "@react-pdf/renderer";
import { styles } from "./PdfStyles";
import { formatPrice } from "../utils/formatters";
import type { PdfPricing } from "../types";

interface Props {
  pricing: PdfPricing;
}

export const PdfSummary: React.FC<Props> = ({ pricing }) => (
  <View style={styles.summaryBox}>
    <Text style={styles.summaryTitle}>Ihre Investition</Text>
    
    <View style={styles.summaryRow}>
      <Text style={styles.summaryLabel}>Nettobetrag</Text>
      <Text style={styles.summaryValue}>{formatPrice(pricing.netPrice)} €</Text>
    </View>
    
    <View style={styles.summaryRow}>
      <Text style={styles.summaryLabel}>MwSt. (19%)</Text>
      <Text style={styles.summaryValue}>{formatPrice(pricing.vatAmount)} €</Text>
    </View>
    
    <View style={styles.summaryDivider} />
    
    <View style={styles.summaryTotal}>
      <Text style={styles.summaryTotalLabel}>Gesamtbetrag</Text>
      <Text style={styles.summaryTotalValue}>{formatPrice(pricing.grossPrice)} €</Text>
    </View>
  </View>
);

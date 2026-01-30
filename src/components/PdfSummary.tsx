// src/components/PdfSummary.tsx
import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { formatPrice } from '../utils/formatters';
import { PdfPricing } from '../types';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1e3a5f',
    padding: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 11,
    color: '#ffffff',
  },
  value: {
    fontSize: 11,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ffffff',
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  totalValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

interface Props {
  pricing: PdfPricing;
}

// Helper to parse price strings like "1.234,56" or "1234.56" to number
const parsePrice = (value: string | number): number => {
  if (typeof value === 'number') return value;
  // Handle German format: "1.234,56" -> 1234.56
  const cleaned = value.replace(/\./g, '').replace(',', '.');
  return parseFloat(cleaned) || 0;
};

export const PdfSummary: React.FC<Props> = ({ pricing }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ihre Investition</Text>
      
      <View style={styles.row}>
        <Text style={styles.label}>Nettobetrag</Text>
        <Text style={styles.value}>{formatPrice(parsePrice(pricing.netPrice))}</Text>
      </View>
      
      <View style={styles.row}>
        <Text style={styles.label}>MwSt. (19%)</Text>
        <Text style={styles.value}>{formatPrice(parsePrice(pricing.vatAmount))}</Text>
      </View>
      
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Gesamtbetrag (brutto)</Text>
        <Text style={styles.totalValue}>{formatPrice(parsePrice(pricing.grossPrice))}</Text>
      </View>
    </View>
  );
};

export default PdfSummary;

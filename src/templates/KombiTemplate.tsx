import React from 'react';
import { Document, Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import type { PdfData } from '../types';

const LOGO_URL = 'https://oqguansmlbkrtlkaddvu.supabase.co/storage/v1/object/public/email-assets/LOGO_IOP.png?v=1';

const styles = StyleSheet.create({
  page: { padding: 50, fontSize: 10, fontFamily: 'Helvetica', color: '#1a1a1a', backgroundColor: '#ffffff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30, paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: '#eef0f2' },
  logo: { width: 150, height: 35 },
  validityBadge: { backgroundColor: '#f0f4f8', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10 },
  validityText: { fontSize: 9, color: '#233C63' },
  title: { fontSize: 20, color: '#233C63', marginBottom: 20, fontWeight: 'bold' },
  greeting: { fontSize: 11, marginBottom: 15, lineHeight: 1.5 },
  savingsBadge: { backgroundColor: '#22c55e', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5, marginBottom: 15, alignSelf: 'flex-start' },
  savingsText: { color: '#ffffff', fontSize: 10, fontWeight: 'bold' },
  projectCard: { backgroundColor: '#f8fafc', padding: 20, borderRadius: 8, marginBottom: 20 },
  projectTitle: { fontSize: 12, fontWeight: 'bold', color: '#233C63', marginBottom: 10 },
  projectRow: { flexDirection: 'row', marginBottom: 5 },
  projectLabel: { width: 120, fontSize: 10, color: '#64748b' },
  projectValue: { fontSize: 10, color: '#1a1a1a', flex: 1 },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 12, fontWeight: 'bold', color: '#233C63', marginBottom: 10 },
  featureRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  checkmark: { color: '#22c55e', marginRight: 8, fontSize: 10 },
  featureText: { fontSize: 10 },
  pricingBox: { backgroundColor: '#233C63', padding: 20, borderRadius: 8, marginTop: 20 },
  pricingTitle: { fontSize: 14, fontWeight: 'bold', color: '#ffffff', marginBottom: 15 },
  pricingRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  pricingLabel: { fontSize: 10, color: '#ffffff' },
  pricingValue: { fontSize: 10, color: '#ffffff' },
  pricingTotal: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.3)', paddingTop: 10, marginTop: 10 },
  pricingTotalLabel: { fontSize: 14, fontWeight: 'bold', color: '#ffffff' },
  pricingTotalValue: { fontSize: 14, fontWeight: 'bold', color: '#ffffff' },
  footer: { position: 'absolute', bottom: 30, left: 50, right: 50, textAlign: 'center', fontSize: 8, color: '#64748b' },
});

const formatPrice = (price: number): string => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(price);

interface Props {
  data: PdfData;
}

export const KombiTemplate: React.FC<Props> = ({ data }) => {
  const validUntil = new Date();
  validUntil.setDate(validUntil.getDate() + 30);
  const validStr = validUntil.toLocaleDateString('de-DE');
  
  const features = [
    'Innenaufnahmen + Drohnenaufnahmen',
    'Kommerzielle Nutzungsrechte',
    'Verkaufspsychologische Bildoptimierung',
    'Blaue-Himmel-Garantie',
    'Hochstativ-Aufnahmen',
    '4K Drohnenqualität',
  ];

  const nettoPrice = data.pricing.totalPrice;
  const mwst = nettoPrice * 0.19;
  const bruttoPrice = nettoPrice * 1.19;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image src={LOGO_URL} style={styles.logo} />
          <View style={styles.validityBadge}>
            <Text style={styles.validityText}>Gültig bis {validStr}</Text>
          </View>
        </View>

        <Text style={styles.title}>Ihr Kombi-Paket Angebot</Text>
        
        <View style={styles.savingsBadge}>
          <Text style={styles.savingsText}>✨ Kombi-Vorteil: Sie sparen beim Paketpreis!</Text>
        </View>
        
        <Text style={styles.greeting}>
          Guten Tag {data.contact.salutation} {data.contact.lastName},{'\n\n'}
          vielen Dank für Ihr Interesse an unserem Kombi-Paket aus Innen- und Drohnenaufnahmen.
        </Text>

        <View style={styles.projectCard}>
          <Text style={styles.projectTitle}>📸 + 🚁 Kombi-Projektdetails</Text>
          <View style={styles.projectRow}>
            <Text style={styles.projectLabel}>Shooting-Art:</Text>
            <Text style={styles.projectValue}>{data.project.shootingType}</Text>
          </View>
          <View style={styles.projectRow}>
            <Text style={styles.projectLabel}>Paket:</Text>
            <Text style={styles.projectValue}>{data.project.packageName}</Text>
          </View>
          <View style={styles.projectRow}>
            <Text style={styles.projectLabel}>Adresse:</Text>
            <Text style={styles.projectValue}>{data.project.address}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Inklusivleistungen</Text>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureRow}>
              <Text style={styles.checkmark}>✓</Text>
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        {data.upgrades && data.upgrades.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Zusatzleistungen</Text>
            {data.upgrades.map((upgrade, index) => (
              <View key={index} style={styles.featureRow}>
                <Text style={styles.checkmark}>+</Text>
                <Text style={styles.featureText}>{upgrade.name} ({formatPrice(upgrade.price)})</Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.pricingBox}>
          <Text style={styles.pricingTitle}>Ihre Investition</Text>
          <View style={styles.pricingRow}>
            <Text style={styles.pricingLabel}>{data.project.packageName}</Text>
            <Text style={styles.pricingValue}>{formatPrice(data.pricing.packagePrice)}</Text>
          </View>
          {data.pricing.travelCost > 0 && (
            <View style={styles.pricingRow}>
              <Text style={styles.pricingLabel}>Anfahrtskosten</Text>
              <Text style={styles.pricingValue}>{formatPrice(data.pricing.travelCost)}</Text>
            </View>
          )}
          {data.pricing.upgradesTotal > 0 && (
            <View style={styles.pricingRow}>
              <Text style={styles.pricingLabel}>Zusatzleistungen</Text>
              <Text style={styles.pricingValue}>{formatPrice(data.pricing.upgradesTotal)}</Text>
            </View>
          )}
          <View style={styles.pricingRow}>
            <Text style={styles.pricingLabel}>Netto</Text>
            <Text style={styles.pricingValue}>{formatPrice(nettoPrice)}</Text>
          </View>
          <View style={styles.pricingRow}>
            <Text style={styles.pricingLabel}>MwSt. (19%)</Text>
            <Text style={styles.pricingValue}>{formatPrice(mwst)}</Text>
          </View>
          <View style={styles.pricingTotal}>
            <Text style={styles.pricingTotalLabel}>Gesamtbetrag (brutto)</Text>
            <Text style={styles.pricingTotalValue}>{formatPrice(bruttoPrice)}</Text>
          </View>
        </View>

        <Text style={styles.footer}>ImmoOnPoint GmbH • www.immoonpoint.de • info@immoonpoint.de</Text>
      </Page>
    </Document>
  );
};

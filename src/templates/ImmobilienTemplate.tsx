import React from 'react';
import { Document, Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { formatCurrency, formatPriceString, formatDate, cleanAddress, getSalutationDisplay, generateOfferNumber } from '../utils/formatters';
import type { PdfData } from '../types';

const LOGO_URL = 'https://oqguansmlbkrtlkaddvu.supabase.co/storage/v1/object/public/email-assets/LOGO_IOP.png?v=1';

const colors = {
  primary: '#233C63',
  primaryLight: '#2d4a7c',
  text: '#1a1a1a',
  muted: '#64748b',
  lightBg: '#f8fafc',
  border: '#e2e8f0',
  white: '#ffffff',
  accent: '#e0f2fe',
};

// HELPER: Holt die reine Bilderanzahl
const getImageCountText = (packageName: string, packageImages?: number): string => {
  // 1. Priorität: Wenn die Zahl direkt in den Daten liegt
  if (packageImages && packageImages > 0) {
    return `${packageImages} High-End Aufnahmen`;
  }

  // 2. Priorität: Suche nach einer Zahl im Namen
  const match = packageName.match(/(\d+)/);
  if (match) {
    return `${match[1]} High-End Aufnahmen`;
  }

  // 3. Priorität: Feste Zuordnungen für Namen ohne Zahlen
  const mappings: Record<string, string> = {
    'Home S': '6 High-End Aufnahmen',
    'Home M': '10 High-End Aufnahmen',
    'Home L': '15 High-End Aufnahmen',
    'Home XL': '20 High-End Aufnahmen',
    'Exklusiv': '25 High-End Aufnahmen',
  };

  for (const [key, value] of Object.entries(mappings)) {
    if (packageName.includes(key)) return value;
  }

  return packageName;
};

const formatShootingType = (type: string): string => {
  if (!type) return '';
  const lower = type.toLowerCase();
  if (lower.includes('kombi')) return 'Immobilien-Shooting & Drohne (Kombi)';
  if (lower.includes('drohne') || lower.includes('drone')) return 'Drohnen-Shooting';
  return 'Immobilien-Shooting';
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingHorizontal: 45,
    paddingBottom: 65,
    fontSize: 9,
    fontFamily: 'Helvetica',
    color: colors.text,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 35,
  },
  logo: { width: 100, height: 'auto', objectFit: 'contain' },
  headerRight: { alignItems: 'flex-end' },
  dateText: { fontSize: 8, color: colors.muted, marginBottom: 2 },
  offerNumber: { fontSize: 10, fontWeight: 'bold', color: colors.primary, marginBottom: 5 },
  badge: { backgroundColor: colors.accent, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4 },
  badgeText: { fontSize: 7, fontWeight: 'bold', color: colors.primary, textTransform: 'uppercase' },
  recipient: { marginBottom: 30 },
  recipientText: { fontSize: 9, lineHeight: 1.4 },
  title: { marginBottom: 20 },
  h1: { fontSize: 18, fontWeight: 'bold', color: colors.primary, marginBottom: 8 },
  greetingText: { fontSize: 10, lineHeight: 1.5 },
  projectCard: {
    borderLeftWidth: 2,
    borderLeftColor: colors.primary,
    backgroundColor: colors.lightBg,
    padding: 15,
    marginBottom: 20,
  },
  projectTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  projectGrid: { flexDirection: 'row' },
  projectColumn: { flex: 1 },
  projectItem: { marginBottom: 8 },
  projectLabel: { fontSize: 8, fontWeight: 'bold', color: colors.muted, textTransform: 'uppercase', marginBottom: 2 },
  projectValue: { fontSize: 9, fontWeight: 'bold' },
  section: { marginBottom: 20 },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 4,
  },
  featuresGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  featureItem: { flexDirection: 'row', alignItems: 'center', width: '50%', marginBottom: 5 },
  bullet: { width: 3, height: 3, backgroundColor: colors.primary, marginRight: 8 },
  featureText: { fontSize: 8.5 },
  flexibilityNote: {
    backgroundColor: '#eff6ff',
    padding: 10,
    borderRadius: 4,
    marginTop: 5,
    borderLeftWidth: 2,
    borderLeftColor: '#3b82f6',
  },
  flexibilityText: { fontSize: 8, color: '#1e40af' },
  pricingBox: { backgroundColor: colors.primary, padding: 18, borderRadius: 6, marginBottom: 20 },
  pricingTitle: { fontSize: 11, fontWeight: 'bold', color: colors.white, marginBottom: 12 },
  pricingRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  pricingLabel: { fontSize: 8.5, color: 'rgba(255,255,255,0.7)' },
  pricingValue: { fontSize: 8.5, fontWeight: 'bold', color: colors.white },
  pricingDivider: { height: 1, backgroundColor: 'rgba(255,255,255,0.15)', marginVertical: 10 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  totalLabel: { fontSize: 11, fontWeight: 'bold', color: colors.white },
  totalValue: { fontSize: 14, fontWeight: 'bold', color: colors.white },
  // NEU: Styles für Upgrade-Hinweise
  upgradeNote: {
    marginTop: 2,
    marginBottom: 6,
    marginLeft: 8,
    paddingLeft: 8,
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(255,255,255,0.3)',
  },
  upgradeNoteText: {
    fontSize: 7,
    color: 'rgba(255,255,255,0.7)',
    fontStyle: 'italic',
    lineHeight: 1.3,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 45,
    right: 45,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 10,
  },
  footerContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  footerText: { fontSize: 6.5, color: colors.muted, flex: 1, lineHeight: 1.4 },
});

interface Props {
  data: PdfData;
}

export const ImmobilienTemplate: React.FC<Props> = ({ data }) => {
  const packagePrice = data.pricing.packagePrice ?? data.project.packagePrice ?? 0;
  const travelCost = data.pricing.travelCost ?? 0;
  const combinedPackagePrice = packagePrice + travelCost;
  
  const portfolioText = getImageCountText(data.project.packageName, data.project.packageImages);
  const salutationDisplay = getSalutationDisplay(data.contact.salutation);
  const fullSalutation = salutationDisplay === 'Frau' ? 'Sehr geehrte Frau' : 'Sehr geehrter Herr';

  // Check für 24h Express
  const hasExpress = data.upgrades?.some(u => 
    u.name.toLowerCase().includes('24h') || u.name.toLowerCase().includes('express')
  );
  const deliveryLabel = hasExpress ? 'Lieferung in 24h' : 'Lieferung in 48h';

  const features = [
    'Prof. Bildbearbeitung',
    'Blauer-Himmel-Garantie',
    'Kommerzielle Nutzungsrechte',
    'High-Res Download',
    'ImmoScout Optimierung',
    deliveryLabel
  ];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Image src={LOGO_URL} style={styles.logo} />
          <View style={styles.headerRight}>
            <Text style={styles.offerNumber}>Angebot {generateOfferNumber()}</Text>
            <Text style={styles.dateText}>Datum: {formatDate(new Date())}</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>30 Tage gültig</Text>
            </View>
          </View>
        </View>

        {/* Empfänger */}
        <View style={styles.recipient}>
          {data.contact.company && <Text style={{...styles.recipientText, fontWeight: 'bold'}}>{data.contact.company}</Text>}
          <Text style={styles.recipientText}>{salutationDisplay} {data.contact.firstName} {data.contact.lastName}</Text>
          {data.contact.street && <Text style={styles.recipientText}>{data.contact.street}</Text>}
          {(data.contact.zipCode || data.contact.city) && (
            <Text style={styles.recipientText}>{data.contact.zipCode} {data.contact.city}</Text>
          )}
        </View>

        {/* Titel & Anrede mit gewünschtem Absatz */}
        <View style={styles.title}>
          <Text style={styles.h1}>Ihr persönliches Angebot</Text>
          <Text style={styles.greetingText}>
            {fullSalutation} {data.contact.lastName},
          </Text>
          <View style={{ marginBottom: 8 }} /> 
          <Text style={styles.greetingText}>
            vielen Dank für Ihre Kalkulation über unseren Online-Preisrechner.
          </Text>
          <Text style={styles.greetingText}>
            Basierend auf Ihren Angaben haben wir folgendes Angebot für Sie erstellt:
          </Text>
        </View>

        {/* Projektdaten */}
        <View style={styles.projectCard}>
          <Text style={styles.projectTitle}>Projektdaten im Überblick</Text>
          <View style={styles.projectGrid}>
            <View style={styles.projectColumn}>
              <View style={styles.projectItem}>
                <Text style={styles.projectLabel}>Objektadresse</Text>
                <Text style={styles.projectValue}>{cleanAddress(data.project.address)}</Text>
              </View>
              <View style={styles.projectItem}>
                <Text style={styles.projectLabel}>Shooting-Art</Text>
                <Text style={styles.projectValue}>{formatShootingType(data.project.shootingType)}</Text>
              </View>
            </View>
            <View style={styles.projectColumn}>
              <View style={styles.projectItem}>
                <Text style={styles.projectLabel}>Leistungsumfang</Text>
                <Text style={styles.projectValue}>{portfolioText}</Text>
              </View>
              <View style={styles.projectItem}>
                <Text style={styles.projectLabel}>Geplante Dauer</Text>
                <Text style={styles.projectValue}>{data.project.packageDuration || 'ca. 1.5 Std.'}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Inklusivleistungen */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Inklusivleistungen & Standards</Text>
          <View style={styles.featuresGrid}>
            {features.map((f, i) => (
              <View key={i} style={styles.featureItem}>
                <View style={styles.bullet} />
                <Text style={styles.featureText}>{f}</Text>
              </View>
            ))}
          </View>
          <View style={styles.flexibilityNote}>
            <Text style={styles.flexibilityText}>
              Hinweis: Wir berechnen am Ende nur die Bilder, die Sie wirklich für Ihre Vermarktung auswählen. Maximale Flexibilität für Ihr Budget.
            </Text>
          </View>
        </View>

        {/* Kostenübersicht */}
        <View style={styles.pricingBox} wrap={false}>
          <Text style={styles.pricingTitle}>Kostenübersicht:</Text>
          
          <View style={styles.pricingRow}>
            <Text style={styles.pricingLabel}>{data.project.packageName} (inkl. Anfahrt)</Text>
            <Text style={styles.pricingValue}>{formatCurrency(combinedPackagePrice)}</Text>
          </View>
          
          {/* AKTUALISIERT: Upgrades mit optionalem Hinweis (z.B. Blaue Stunde) */}
          {data.upgrades?.map((upgrade, index) => (
            <View key={index}>
              <View style={styles.pricingRow}>
                <Text style={styles.pricingLabel}>{upgrade.name}</Text>
                <Text style={styles.pricingValue}>{formatCurrency(upgrade.price)}</Text>
              </View>
              {/* Hinweis anzeigen wenn vorhanden (z.B. Blaue Stunde bei >30km) */}
              {upgrade.note && (
                <View style={styles.upgradeNote}>
                  <Text style={styles.upgradeNoteText}>
                    {upgrade.note}
                  </Text>
                </View>
              )}
            </View>
          ))}
          
          <View style={styles.pricingDivider} />
          
          <View style={styles.pricingRow}>
            <Text style={styles.pricingLabel}>Netto Gesamt</Text>
            <Text style={styles.pricingValue}>{formatPriceString(data.pricing.netPrice)}</Text>
          </View>
          <View style={styles.pricingRow}>
            <Text style={styles.pricingLabel}>MwSt. 19%</Text>
            <Text style={styles.pricingValue}>{formatPriceString(data.pricing.vatAmount || '0')}</Text>
          </View>
          <View style={styles.pricingDivider} />
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Gesamtbetrag</Text>
            <Text style={styles.totalValue}>{formatPriceString(data.pricing.grossPrice)}</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer} fixed>
          <View style={styles.footerContent}>
            <Text style={styles.footerText}>
              ImmoOnPoint ist eine Marke der NPS Media GmbH · Klinkerberg 9, 86152 Augsburg{'\n'}
              info@immoonpoint.de · Geschäftsführer: Nikolas Seymour · HRB 38388 · USt-IdNr.: DE359733225
            </Text>
            <Text style={{fontSize: 7, color: colors.muted}} render={({ pageNumber, totalPages }) => `Seite ${pageNumber} / ${totalPages}`} />
          </View>
        </View>
      </Page>
    </Document>
  );
};

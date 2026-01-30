import React from 'react';
import { Document, Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { formatCurrency, formatDate } from '../utils/formatters';
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
  secondary: '#22c55e',
};

// Helper functions (bleiben gleich)
const formatSalutation = (salutation: string) => {
  if (!salutation) return '';
  return salutation.charAt(0).toUpperCase() + salutation.slice(1).toLowerCase();
};

const formatShootingType = (type: string): string => {
  if (!type) return '';
  const cleaned = type.replace(/-shooting$/i, '').replace(/-/g, ' ');
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1).toLowerCase() + '-Shooting';
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingHorizontal: 45,
    paddingBottom: 65,
    fontSize: 9, // Leicht verkleinert für edleren Look
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
  logo: {
    width: 100,
    height: 'auto',
    objectFit: 'contain',
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  dateText: {
    fontSize: 8,
    color: colors.muted,
    marginBottom: 2,
  },
  offerNumber: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 5,
  },
  badge: {
    backgroundColor: colors.accent,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 7,
    fontWeight: 'bold',
    color: colors.primary,
    textTransform: 'uppercase',
  },
  recipient: {
    marginBottom: 30,
  },
  recipientText: {
    fontSize: 9,
    lineHeight: 1.4,
  },
  title: {
    marginBottom: 20,
  },
  h1: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 8,
  },
  greetingText: {
    fontSize: 10,
    lineHeight: 1.5,
  },
  // Projekt-Card Optimierung
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
  projectGrid: {
    flexDirection: 'row',
  },
  projectColumn: {
    flex: 1,
  },
  projectItem: {
    marginBottom: 6,
  },
  projectLabel: {
    fontSize: 7,
    color: colors.muted,
    textTransform: 'uppercase',
    marginBottom: 1,
  },
  projectValue: {
    fontSize: 9,
    fontWeight: 'bold',
  },
  // Inklusivleistungen
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 4,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 5,
  },
  bullet: {
    width: 3,
    height: 3,
    backgroundColor: colors.primary,
    marginRight: 8,
  },
  featureText: {
    fontSize: 8.5,
  },
  // Flexibility Note - Ohne Emoji, mit Design-Element
  flexibilityNote: {
    backgroundColor: '#eff6ff',
    padding: 10,
    borderRadius: 4,
    marginTop: 5,
    borderLeftWidth: 2,
    borderLeftColor: '#3b82f6',
  },
  flexibilityText: {
    fontSize: 8,
    color: '#1e40af',
  },
  // Pricing Box
  pricingBox: {
    backgroundColor: colors.primary,
    padding: 18,
    borderRadius: 6,
    marginBottom: 20,
  },
  pricingTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 12,
  },
  pricingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  pricingLabel: {
    fontSize: 8.5,
    color: 'rgba(255,255,255,0.7)',
  },
  pricingValue: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: colors.white,
  },
  pricingDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
    marginVertical: 10,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 11,
    fontWeight: 'bold',
    color: colors.white,
  },
  totalValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.white,
  },
  // Next Steps
  nextStepsBox: {
    padding: 15,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    marginBottom: 15,
  },
  nextStepsTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 12,
  },
  stepRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  stepNumber: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  stepNumberText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: colors.white,
  },
  stepText: {
    fontSize: 9,
    color: colors.text,
    flex: 1,
  },
  ctaBox: {
    backgroundColor: colors.secondary,
    padding: 12,
    borderRadius: 4,
    marginTop: 5,
    alignItems: 'center',
  },
  ctaText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.white,
  },
  // Footer
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 45,
    right: 45,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 10,
  },
  footerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 6.5,
    color: colors.muted,
    flex: 1,
    lineHeight: 1.4,
  },
});

export const ImmobilienTemplate: React.FC<Props> = ({ data }) => {
  const salutation = formatSalutation(data.contact.salutation);
  const packagePrice = data.pricing.packagePrice ?? data.project.packagePrice ?? 0;
  const travelCost = data.pricing.travelCost ?? 0;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image src={LOGO_URL} style={styles.logo} />
          <View style={styles.headerRight}>
            <Text style={styles.offerNumber}>Angebot #{Math.floor(Math.random() * 9000) + 1000}</Text>
            <Text style={styles.dateText}>Datum: {formatDate(new Date())}</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>30 Tage gültig</Text>
            </View>
          </View>
        </View>

        <View style={styles.recipient}>
          {data.contact.company && <Text style={{...styles.recipientText, fontWeight: 'bold'}}>{data.contact.company}</Text>}
          <Text style={styles.recipientText}>{salutation} {data.contact.firstName} {data.contact.lastName}</Text>
          <Text style={styles.recipientText}>{data.contact.street}</Text>
          <Text style={styles.recipientText}>{data.contact.zipCode} {data.contact.city}</Text>
        </View>

        <View style={styles.title}>
          <Text style={styles.h1}>Ihr persönliches Angebot</Text>
          <Text style={styles.greetingText}>
            Sehr geehrte(r) {salutation} {data.contact.lastName},{'\n'}
            vielen Dank für das angenehme Gespräch. Basierend auf Ihren Anforderungen haben wir folgendes Paket für Sie zusammengestellt:
          </Text>
        </View>

        <View style={styles.projectCard}>
          <Text style={styles.projectTitle}>Projektdaten im Überblick</Text>
          <View style={styles.projectGrid}>
            <View style={styles.projectColumn}>
              <View style={styles.projectItem}>
                <Text style={styles.projectLabel}>Objektadresse</Text>
                <Text style={styles.projectValue}>{data.project.address}</Text>
              </View>
              <View style={styles.projectItem}>
                <Text style={styles.projectLabel}>Leistungsumfang</Text>
                <Text style={styles.projectValue}>{formatShootingType(data.project.shootingType)}</Text>
              </View>
            </View>
            <View style={styles.projectColumn}>
              <View style={styles.projectItem}>
                <Text style={styles.projectLabel}>Gewähltes Paket</Text>
                <Text style={styles.projectValue}>{data.project.packageName}</Text>
              </View>
              <View style={styles.projectItem}>
                <Text style={styles.projectLabel}>Geplante Dauer</Text>
                <Text style={styles.projectValue}>{data.project.packageDuration || 'ca. 1.5 Std.'}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Inklusivleistungen & Standards</Text>
          <View style={styles.featuresGrid}>
            {['Prof. Bildbearbeitung', 'Blauer-Himmel-Garantie', 'Kommerzielle Rechte', 'High-Res Download', 'ImmoScout Optimierung', 'Lieferung in 48h'].map((f, i) => (
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

        <View style={styles.pricingBox} wrap={false}>
          <Text style={styles.pricingTitle}>Kostenübersicht</Text>
          <View style={styles.pricingRow}>
            <Text style={styles.pricingLabel}>{data.project.packageName} (Grundpreis)</Text>
            <Text style={styles.pricingValue}>{formatCurrency(packagePrice)}</Text>
          </View>
          {travelCost > 0 && (
            <View style={styles.pricingRow}>
              <Text style={styles.pricingLabel}>Anfahrtskosten</Text>
              <Text style={styles.pricingValue}>{formatCurrency(travelCost)}</Text>
            </View>
          )}
          <View style={styles.pricingDivider} />
          <View style={styles.pricingRow}>
            <Text style={styles.pricingLabel}>Netto Gesamt</Text>
            <Text style={styles.pricingValue}>{data.pricing.netPrice}</Text>
          </View>
          <View style={styles.pricingRow}>
            <Text style={styles.pricingLabel}>MwSt. 19%</Text>
            <Text style={styles.pricingValue}>{data.pricing.vatAmount}</Text>
          </View>
          <View style={styles.pricingDivider} />
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Gesamtbetrag</Text>
            <Text style={styles.totalValue}>{data.pricing.grossPrice}</Text>
          </View>
        </View>

        <View style={styles.nextStepsBox} wrap={false}>
          <Text style={styles.nextStepsTitle}>Nächste Schritte</Text>
          <View style={styles.stepRow}>
            <View style={styles.stepNumber}><Text style={styles.stepNumberText}>1</Text></View>
            <Text style={styles.stepText}>Terminbestätigung via E-Mail oder Telefon.</Text>
          </View>
          <View style={styles.stepRow}>
            <View style={styles.stepNumber}><Text style={styles.stepNumberText}>2</Text></View>
            <Text style={styles.stepText}>Shooting vor Ort – wir rücken Ihr Objekt ins rechte Licht.</Text>
          </View>
          <View style={styles.stepRow}>
            <View style={styles.stepNumber}><Text style={styles.stepNumberText}>3</Text></View>
            <Text style={styles.stepText}>Bildauswahl & Erhalt der fertigen Dateien innerhalb von 48h.</Text>
          </View>
          <View style={styles.ctaBox}>
            <Text style={styles.ctaText}>Jetzt Shooting verbindlich anfragen</Text>
          </View>
        </View>

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

import React from 'react';
import { Document, Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { formatCurrency, formatDate } from '../utils/formatters';
import type { PdfData } from '../types';

const LOGO_URL = 'https://oqguansmlbkrtlkaddvu.supabase.co/storage/v1/object/public/email-assets/LOGO_IOP.png?v=1';

const colors = {
  primary: '#233C63',
  text: '#1a1a1a',
  muted: '#64748b',
  lightBg: '#f8fafc',
  border: '#e2e8f0',
  white: '#ffffff',
};

const formatSalutation = (salutation: string) => {
  if (!salutation) return '';
  return salutation.charAt(0).toUpperCase() + salutation.slice(1).toLowerCase();
};

const formatShootingType = (type: string): string => {
  if (!type) return '';
  const cleaned = type.replace(/-shooting$/i, '').replace(/-/g, ' ');
  const capitalized = cleaned.charAt(0).toUpperCase() + cleaned.slice(1).toLowerCase();
  return `${capitalized}-Shooting`;
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 30,
    paddingHorizontal: 40,
    paddingBottom: 50,
    fontSize: 10,
    fontFamily: 'Helvetica',
    color: colors.text,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 110,
    height: 'auto',
    objectFit: 'contain',
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  dateText: {
    fontSize: 9,
    color: colors.text,
    marginBottom: 4,
  },
  badge: {
    backgroundColor: '#f0f4f8',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: colors.primary,
  },
  recipient: {
    marginBottom: 20,
  },
  recipientText: {
    fontSize: 9,
    lineHeight: 1.4,
  },
  title: {
    marginBottom: 15,
  },
  h1: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 10,
  },
  // FIX: Einheitliche Textfarbe und Font für Greeting
  greetingText: {
    fontSize: 10,
    color: colors.text, // Schwarz statt unterschiedliche Farben
    lineHeight: 1.5,
    marginBottom: 4,
  },
  // Projekt-Grid
  projectCard: {
    backgroundColor: colors.lightBg,
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  projectTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  projectGrid: {
    flexDirection: 'row',
  },
  projectColumn: {
    flex: 1,
  },
  projectItem: {
    marginBottom: 6, // FIX: +15% mehr Abstand (war 4, jetzt ~5-6)
  },
  projectLabel: {
    fontSize: 8,
    color: colors.muted,
    marginBottom: 2, // FIX: Kleiner Abstand zwischen Label und Value
  },
  projectValue: {
    fontSize: 9,
    fontWeight: 'bold',
  },
  // Leistungen-Grid
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 3,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 6,
  },
  bullet: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primary,
    marginRight: 6,
  },
  featureText: {
    fontSize: 8.5,
  },
  // Preis-Box
  pricingBox: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 20,
  },
  pricingTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 10,
  },
  pricingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  pricingLabel: {
    fontSize: 9,
    color: 'rgba(255,255,255,0.9)',
  },
  pricingValue: {
    fontSize: 9,
    fontWeight: 'bold',
    color: colors.white,
  },
  pricingDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginVertical: 8,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalLabel: {
    fontSize: 11,
    fontWeight: 'bold',
    color: colors.white,
  },
  totalValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.white,
  },
  footer: {
    position: 'absolute',
    bottom: 25,
    left: 40,
    right: 40,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 10,
  },
  footerText: {
    fontSize: 7.5,
    color: colors.muted,
    textAlign: 'center',
    lineHeight: 1.3,
  },
});

interface Props {
  data: PdfData;
}

export const ImmobilienTemplate: React.FC<Props> = ({ data }) => {
  const today = new Date();
  const validUntil = new Date();
  validUntil.setDate(validUntil.getDate() + 30);
  
  // FIX: Dynamische Features aus Paketdaten, Fallback nur wenn leer
  const features = data.project.packageFeatures?.length 
    ? data.project.packageFeatures 
    : [
        'Kommerzielle Nutzungsrechte',
        'Bildoptimierung',
        'ImmoScout Optimierung',
        'Blaue-Himmel-Garantie',
        'Schnelle Lieferung',
        'High-Res Dateien'
      ];
  
  const salutation = formatSalutation(data.contact.salutation);
  const shootingType = formatShootingType(data.project.shootingType);
  const packagePrice = data.pricing.packagePrice ?? data.project.packagePrice ?? 0;
  const travelCost = data.pricing.travelCost ?? 0;
  const imageCount = data.project.imageCount ?? data.project.packageImages ?? 0;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header mit Datum */}
        <View style={styles.header}>
          <Image src={LOGO_URL} style={styles.logo} />
          <View style={styles.headerRight}>
            <Text style={styles.dateText}>{formatDate(today)}</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Gültig bis {formatDate(validUntil)}</Text>
            </View>
          </View>
        </View>

        {/* Recipient */}
        <View style={styles.recipient}>
          {data.contact.company && <Text style={styles.recipientText}>{data.contact.company}</Text>}
          <Text style={styles.recipientText}>{salutation} {data.contact.firstName} {data.contact.lastName}</Text>
          {data.contact.street && <Text style={styles.recipientText}>{data.contact.street}</Text>}
          {data.contact.zipCode && <Text style={styles.recipientText}>{data.contact.zipCode} {data.contact.city}</Text>}
        </View>

        {/* Title & Greeting - FIX: Einheitliche Formatierung */}
        <View style={styles.title}>
          <Text style={styles.h1}>Ihr individuelles Angebot</Text>
          <Text style={styles.greetingText}>
            Guten Tag {salutation} {data.contact.lastName},{'\n'}
            vielen Dank für Ihr Interesse. Gerne unterbreiten wir Ihnen folgendes Angebot:
          </Text>
        </View>

        {/* Projektdetails */}
        <View style={styles.projectCard}>
          <Text style={styles.projectTitle}>Projektdetails</Text>
          <View style={styles.projectGrid}>
            <View style={styles.projectColumn}>
              <View style={styles.projectItem}>
                <Text style={styles.projectLabel}>Objekt</Text>
                <Text style={styles.projectValue}>{data.project.address}</Text>
              </View>
              <View style={styles.projectItem}>
                <Text style={styles.projectLabel}>Leistung</Text>
                <Text style={styles.projectValue}>{shootingType}</Text>
              </View>
            </View>
            <View style={styles.projectColumn}>
              <View style={styles.projectItem}>
                <Text style={styles.projectLabel}>Paket</Text>
                <Text style={styles.projectValue}>{data.project.packageName}</Text>
              </View>
              {imageCount > 0 && (
                <View style={styles.projectItem}>
                  <Text style={styles.projectLabel}>Bildanzahl</Text>
                  <Text style={styles.projectValue}>{imageCount} Bilder</Text>
                </View>
              )}
              {data.project.packageDuration && (
                <View style={styles.projectItem}>
                  <Text style={styles.projectLabel}>Dauer</Text>
                  <Text style={styles.projectValue}>{data.project.packageDuration}</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Inklusivleistungen - dynamisch aus Paketdaten */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Inklusivleistungen</Text>
          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <View style={styles.bullet} />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Zusatzleistungen */}
        {data.upgrades.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Zusatzleistungen</Text>
            <View style={styles.featuresGrid}>
              {data.upgrades.map((upgrade, index) => (
                <View key={index} style={styles.featureItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.featureText}>{upgrade.name}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* FIX: Titel geändert zu "Kostenaufstellung für Ihr Shooting" */}
        <View style={styles.pricingBox} wrap={false}>
          <Text style={styles.pricingTitle}>Kostenaufstellung für Ihr Shooting</Text>
          <View style={styles.pricingRow}>
            <Text style={styles.pricingLabel}>{data.project.packageName} {travelCost > 0 ? '(inkl. Anfahrt)' : ''}</Text>
            <Text style={styles.pricingValue}>{formatCurrency(packagePrice + travelCost)}</Text>
          </View>
          {/* Einzelne Upgrades mit Preisen */}
          {data.upgrades.map((upgrade, index) => (
            <View key={index} style={styles.pricingRow}>
              <Text style={styles.pricingLabel}>{upgrade.name}</Text>
              <Text style={styles.pricingValue}>{formatCurrency(upgrade.price)}</Text>
            </View>
          ))}
          <View style={styles.pricingDivider} />
          <View style={styles.pricingRow}>
            <Text style={styles.pricingLabel}>Netto</Text>
            <Text style={styles.pricingValue}>{data.pricing.netPrice}</Text>
          </View>
          <View style={styles.pricingRow}>
            <Text style={styles.pricingLabel}>zzgl. 19% MwSt.</Text>
            <Text style={styles.pricingValue}>{data.pricing.vatAmount}</Text>
          </View>
          <View style={styles.pricingDivider} />
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Gesamtbetrag (brutto)</Text>
            <Text style={styles.totalValue}>{data.pricing.grossPrice}</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            ImmoOnPoint ist eine Marke der NPS Media GmbH · Klinkerberg 9, 86152 Augsburg · info@immoonpoint.de · +49 1579 2388530{'\n'}
            Geschäftsführer: Nikolas Seymour · Registergericht: Augsburg HRB 38388 · USt-IdNr.: DE359733225
          </Text>
        </View>
      </Page>
    </Document>
  );
};

import React from 'react';
import { Document, Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { formatCurrency, formatDate } from '../utils/formatters';
import type { PdfData } from '../types';

const LOGO_URL = 'https://oqguansmlbkrtlkaddvu.supabase.co/storage/v1/object/public/email-assets/LOGO_IOP.png?v=1';

// Design System Colors - aligned with Kostenrechner CSS
const colors = {
  primary: '#233C63',        // --primary: 217 51% 33%
  primaryLight: '#2d4a7c',   // Lighter variant
  text: '#1a1a1a',           // --foreground
  muted: '#64748b',          // --muted-foreground
  lightBg: '#f8fafc',        // --background
  border: '#e2e8f0',         // --border
  white: '#ffffff',
  accent: '#e0f2fe',         // --accent light blue
  secondary: '#22c55e',      // --secondary green for CTA
};

// Helper: Format salutation
const formatSalutation = (salutation: string) => {
  if (!salutation) return '';
  return salutation.charAt(0).toUpperCase() + salutation.slice(1).toLowerCase();
};

// Helper: Format shooting type
const formatShootingType = (type: string): string => {
  if (!type) return '';
  const cleaned = type.replace(/-shooting$/i, '').replace(/-/g, ' ');
  const capitalized = cleaned.charAt(0).toUpperCase() + cleaned.slice(1).toLowerCase();
  return `${capitalized}-Shooting`;
};

// Helper: Generate offer number (IOP-YYMMDD-XXX)
const generateOfferNumber = (): string => {
  const now = new Date();
  const yy = now.getFullYear().toString().slice(-2);
  const mm = (now.getMonth() + 1).toString().padStart(2, '0');
  const dd = now.getDate().toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 900) + 100; // 100-999
  return `IOP-${yy}${mm}${dd}-${random}`;
};

// Helper: Clean address (remove Germany/Deutschland)
const cleanAddress = (address: string): string => {
  return address
    .replace(/, Germany$/i, '')
    .replace(/, Deutschland$/i, '')
    .trim();
};

// Helper: Check for express delivery
const hasExpressDelivery = (upgrades: Array<{ name: string }>) => 
  upgrades.some(u => u.name.toLowerCase().includes('24h') || u.name.toLowerCase().includes('express'));

// Helper: Get ordered features with dynamic delivery time
const getOrderedFeatures = (packageFeatures: string[] | undefined, hasExpress: boolean): string[] => {
  const defaultFeatures = [
    'Professionelle Bildbearbeitung',
    hasExpress ? '24 Stunden Lieferung' : '48 Stunden Lieferung',
    'ImmoScout24 Optimierung',
    'Blaue-Himmel-Garantie',
    'Kommerzielle Nutzungsrechte',
    'High-Res Dateien',
  ];
  
  if (!packageFeatures?.length) return defaultFeatures;
  
  // Replace delivery time in package features if express is selected
  return packageFeatures.map(feature => {
    if (feature.toLowerCase().includes('48 stunden') && hasExpress) {
      return '24 Stunden Lieferung';
    }
    return feature;
  });
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 30,
    paddingHorizontal: 40,
    paddingBottom: 60,
    fontSize: 10,
    fontFamily: 'Helvetica',
    color: colors.text,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
  offerNumber: {
    fontSize: 8,
    color: colors.muted,
    marginBottom: 4,
  },
  badge: {
    backgroundColor: colors.accent,
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
  greetingText: {
    fontSize: 10,
    color: colors.text,
    lineHeight: 1.5,
    marginBottom: 4,
  },
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
    marginBottom: 6,
  },
  projectLabel: {
    fontSize: 8,
    color: colors.muted,
    marginBottom: 2,
  },
  projectValue: {
    fontSize: 9,
    fontWeight: 'bold',
  },
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
  // Flexibility note styling
  flexibilityNote: {
    backgroundColor: colors.accent,
    padding: 8,
    borderRadius: 6,
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexibilityIcon: {
    fontSize: 10,
    marginRight: 6,
  },
  flexibilityText: {
    fontSize: 8,
    color: colors.primary,
    fontStyle: 'italic',
    flex: 1,
  },
  // Pricing box
  pricingBox: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 15,
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
  // Next Steps Section
  nextStepsBox: {
    backgroundColor: colors.lightBg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  nextStepsTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 10,
  },
  stepRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  stepNumber: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  stepNumberText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: colors.white,
  },
  stepContent: {
    flex: 1,
    justifyContent: 'center',
  },
  stepText: {
    fontSize: 9,
    color: colors.text,
  },
  ctaBox: {
    backgroundColor: colors.secondary,
    padding: 10,
    borderRadius: 6,
    marginTop: 8,
    alignItems: 'center',
  },
  ctaText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.white,
  },
  ctaSubtext: {
    fontSize: 8,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 2,
  },
  // Footer with page number
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 40,
    right: 40,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 8,
  },
  footerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 7,
    color: colors.muted,
    lineHeight: 1.3,
    flex: 1,
  },
  pageNumber: {
    fontSize: 8,
    color: colors.muted,
  },
});

interface Props {
  data: PdfData;
}

export const ImmobilienTemplate: React.FC<Props> = ({ data }) => {
  const today = new Date();
  const validUntil = new Date();
  validUntil.setDate(validUntil.getDate() + 30);
  const offerNumber = generateOfferNumber();
  
  const hasExpress = hasExpressDelivery(data.upgrades);
  const features = getOrderedFeatures(data.project.packageFeatures, hasExpress);
  
  const salutation = formatSalutation(data.contact.salutation);
  const shootingType = formatShootingType(data.project.shootingType);
  const cleanedAddress = cleanAddress(data.project.address);
  const packagePrice = data.pricing.packagePrice ?? data.project.packagePrice ?? 0;
  const travelCost = data.pricing.travelCost ?? 0;
  const imageCount = data.project.imageCount ?? data.project.packageImages ?? 0;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header with date and offer number */}
        <View style={styles.header}>
          <Image src={LOGO_URL} style={styles.logo} />
          <View style={styles.headerRight}>
            <Text style={styles.dateText}>{formatDate(today)}</Text>
            <Text style={styles.offerNumber}>Angebot {offerNumber}</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Gültig bis {formatDate(validUntil)}</Text>
            </View>
          </View>
        </View>

        {/* Recipient - with cleaned address */}
        <View style={styles.recipient}>
          {data.contact.company && <Text style={styles.recipientText}>{data.contact.company}</Text>}
          <Text style={styles.recipientText}>{salutation} {data.contact.firstName} {data.contact.lastName}</Text>
          {data.contact.street && <Text style={styles.recipientText}>{data.contact.street}</Text>}
          {data.contact.zipCode && <Text style={styles.recipientText}>{data.contact.zipCode} {data.contact.city}</Text>}
        </View>

        {/* Title & Greeting */}
        <View style={styles.title}>
          <Text style={styles.h1}>Ihr individuelles Angebot</Text>
          <Text style={styles.greetingText}>
            Guten Tag {salutation} {data.contact.lastName},{'\n'}
            vielen Dank für Ihr Interesse. Gerne unterbreiten wir Ihnen folgendes Angebot:
          </Text>
        </View>

        {/* Project Details - with cleaned address */}
        <View style={styles.projectCard}>
          <Text style={styles.projectTitle}>Projektdetails</Text>
          <View style={styles.projectGrid}>
            <View style={styles.projectColumn}>
              <View style={styles.projectItem}>
                <Text style={styles.projectLabel}>Objekt</Text>
                <Text style={styles.projectValue}>{cleanedAddress}</Text>
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
                  <Text style={styles.projectValue}>{imageCount} Bilder (Richtwert)</Text>
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

        {/* Features with flexibility note */}
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
          {/* Flexibility Note */}
          <View style={styles.flexibilityNote}>
            <Text style={styles.flexibilityIcon}>💡</Text>
            <Text style={styles.flexibilityText}>
              Finale Bildanzahl nach Bedarf – abgerechnet wird nur, was Sie tatsächlich nutzen.
            </Text>
          </View>
        </View>

        {/* Upgrades */}
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

        {/* Pricing Box */}
        <View style={styles.pricingBox} wrap={false}>
          <Text style={styles.pricingTitle}>Kostenaufstellung für Ihr Shooting</Text>
          <View style={styles.pricingRow}>
            <Text style={styles.pricingLabel}>{data.project.packageName} {travelCost > 0 ? '(inkl. Anfahrt)' : ''}</Text>
            <Text style={styles.pricingValue}>{formatCurrency(packagePrice + travelCost)}</Text>
          </View>
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

        {/* Next Steps Section */}
        <View style={styles.nextStepsBox} wrap={false}>
          <Text style={styles.nextStepsTitle}>So geht es weiter</Text>
          <View style={styles.stepRow}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepText}>Termin vereinbaren – flexibel nach Ihrem Zeitplan</Text>
            </View>
          </View>
          <View style={styles.stepRow}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepText}>Professionelles Shooting vor Ort (ca. {data.project.packageDuration || '1-2h'})</Text>
            </View>
          </View>
          <View style={styles.stepRow}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepText}>Ihre Bilder erhalten Sie innerhalb von {hasExpress ? '24' : '48'} Stunden</Text>
            </View>
          </View>
          <View style={styles.ctaBox}>
            <Text style={styles.ctaText}>Jetzt unverbindlich Termin anfragen</Text>
            <Text style={styles.ctaSubtext}>info@immoonpoint.de • +49 1579 2388530</Text>
          </View>
        </View>

        {/* Footer with page number */}
        <View style={styles.footer} fixed>
          <View style={styles.footerContent}>
            <Text style={styles.footerText}>
              ImmoOnPoint · NPS Media GmbH · Klinkerberg 9, 86152 Augsburg · HRB 38388 · USt-IdNr.: DE359733225
            </Text>
            <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
          </View>
        </View>
      </Page>
    </Document>
  );
};

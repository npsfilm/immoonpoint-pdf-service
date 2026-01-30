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

// Hilfsfunktion zur Formatierung der Anrede
const formatSalutation = (salutation: string) => {
  if (!salutation) return '';
  return salutation.charAt(0).toUpperCase() + salutation.slice(1).toLowerCase();
};

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontSize: 10,
    fontFamily: 'Helvetica',
    color: colors.text,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 140, // Breite beibehalten
    height: 'auto', // Höhe auf auto für richtige Perspektive
    objectFit: 'contain',
  },
  badge: {
    backgroundColor: '#f0f4f8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: colors.primary,
  },
  recipient: {
    marginBottom: 25,
  },
  recipientText: {
    fontSize: 10,
    lineHeight: 1.5,
  },
  title: {
    marginBottom: 20,
  },
  h1: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 15,
  },
  greeting: {
    fontSize: 11,
    marginBottom: 10,
  },
  intro: {
    fontSize: 10,
    color: colors.muted,
    lineHeight: 1.5,
  },
  projectCard: {
    backgroundColor: colors.lightBg,
    padding: 15, // Etwas kompakter
    borderRadius: 8,
    marginBottom: 20,
  },
  projectTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  projectRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Links-Rechts Darstellung
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
    paddingVertical: 4,
  },
  projectLabel: {
    width: 80, // Kleinerer Abstand durch definierte Breite
    fontSize: 9,
    color: colors.muted,
  },
  projectValue: {
    flex: 1,
    fontSize: 9,
    fontWeight: 'bold',
    textAlign: 'right', // Rechtsbündig für Tabellen-Look
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 5,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginRight: 8,
  },
  featureText: {
    fontSize: 9,
  },
  pricingBox: {
    backgroundColor: colors.primary,
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  pricingTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 15,
  },
  pricingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  pricingLabel: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.9)',
  },
  pricingValue: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.white,
  },
  pricingDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginVertical: 10,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.white,
  },
  totalValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.white,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 50,
    right: 50,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 15,
  },
  footerText: {
    fontSize: 8,
    color: colors.muted,
    textAlign: 'center',
    lineHeight: 1.4,
  },
});

interface Props {
  data: PdfData;
}

export const ImmobilienTemplate: React.FC<Props> = ({ data }) => {
  const validUntil = new Date();
  validUntil.setDate(validUntil.getDate() + 30);
  
  const features = [
    'Kommerzielle Nutzungsrechte',
    'Verkaufspsychologische Bildoptimierung',
    'Optimiert für ImmoScout & Co.',
    'Blaue-Himmel-Garantie',
  ];
  
  const salutation = formatSalutation(data.contact.salutation);
  
  // Calculate pricing values
  const packagePrice = data.pricing.packagePrice ?? data.project.packagePrice ?? 0;
  const travelCost = data.pricing.travelCost ?? 0;
  const upgradesTotal = data.pricing.upgradesTotal ?? 0;
  const imageCount = data.project.imageCount ?? data.project.packageImages ?? 0;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Image src={LOGO_URL} style={styles.logo} />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Gültig bis {formatDate(validUntil)}</Text>
          </View>
        </View>

        {/* Recipient */}
        <View style={styles.recipient}>
          {data.contact.company && (
            <Text style={styles.recipientText}>{data.contact.company}</Text>
          )}
          <Text style={styles.recipientText}>
            {salutation} {data.contact.firstName} {data.contact.lastName}
          </Text>
          {data.contact.street && (
            <Text style={styles.recipientText}>{data.contact.street}</Text>
          )}
          {data.contact.zipCode && data.contact.city && (
            <Text style={styles.recipientText}>{data.contact.zipCode} {data.contact.city}</Text>
          )}
        </View>

        {/* Title & Greeting */}
        <View style={styles.title}>
          <Text style={styles.h1}>Ihr individuelles Angebot</Text>
          <Text style={styles.greeting}>
            Guten Tag {salutation} {data.contact.lastName},
          </Text>
          <Text style={styles.intro}>
            vielen Dank für Ihr Interesse an unseren professionellen Immobilienfotografie-Leistungen. 
            Gerne unterbreiten wir Ihnen folgendes Angebot:
          </Text>
        </View>

        {/* Project Card */}
        <View style={styles.projectCard}>
          <Text style={styles.projectTitle}>Projektdetails</Text>
          
          <View style={styles.projectRow}>
            <Text style={styles.projectLabel}>Objekt</Text>
            <Text style={styles.projectValue}>{data.project.address}</Text>
          </View>
          
          <View style={styles.projectRow}>
            <Text style={styles.projectLabel}>Leistung</Text>
            <Text style={styles.projectValue}>{data.project.shootingType}</Text>
          </View>
          
          <View style={styles.projectRow}>
            <Text style={styles.projectLabel}>Paket</Text>
            <Text style={styles.projectValue}>{data.project.packageName}</Text>
          </View>
          
          {imageCount > 0 && (
            <View style={styles.projectRow}>
              <Text style={styles.projectLabel}>Bildanzahl</Text>
              <Text style={styles.projectValue}>{imageCount} Bilder</Text>
            </View>
          )}
          
          {data.project.packageDuration && (
            <View style={styles.projectRow}>
              <Text style={styles.projectLabel}>Dauer</Text>
              <Text style={styles.projectValue}>{data.project.packageDuration}</Text>
            </View>
          )}
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Inklusivleistungen</Text>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <View style={styles.bullet} />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        {/* Upgrades */}
        {data.upgrades.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Zusatzleistungen</Text>
            {data.upgrades.map((upgrade, index) => (
              <View key={index} style={styles.featureItem}>
                <View style={styles.bullet} />
                <Text style={styles.featureText}>
                  {upgrade.name} — {formatCurrency(upgrade.price)}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Pricing Box */}
        <View style={styles.pricingBox}>
          <Text style={styles.pricingTitle}>Ihre Investition</Text>
          
          <View style={styles.pricingRow}>
            <Text style={styles.pricingLabel}>
              {data.project.packageName} {travelCost > 0 ? '(inkl. Anfahrt)' : ''}
            </Text>
            <Text style={styles.pricingValue}>
              {formatCurrency(packagePrice + travelCost)}
            </Text>
          </View>
          
          {upgradesTotal > 0 && (
            <View style={styles.pricingRow}>
              <Text style={styles.pricingLabel}>Zusatzleistungen</Text>
              <Text style={styles.pricingValue}>{formatCurrency(upgradesTotal)}</Text>
            </View>
          )}
          
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
            ImmoOnPoint • Professionelle Immobilienfotografie{'\n'}
            E-Mail: info@immoonpoint.de • Web: www.immoonpoint.de{'\n'}
            Dieses Angebot ist 30 Tage gültig.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

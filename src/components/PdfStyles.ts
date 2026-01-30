import { StyleSheet } from "@react-pdf/renderer";

export const colors = {
  primary: "#233C63",
  text: "#1a1a1a",
  muted: "#64748b",
  lightBg: "#fafbfc",
  border: "#eef0f2",
  white: "#ffffff",
  badgeBg: "#f0f4f8",
  summaryBg: "#233C63",
};

export const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: colors.text,
    backgroundColor: colors.white,
  },
  
  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 160,
    height: 36,
  },
  validityBadge: {
    backgroundColor: colors.badgeBg,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  validityText: {
    fontSize: 9,
    fontWeight: "bold",
    color: colors.primary,
  },
  
  // Recipient
  recipientSection: {
    marginBottom: 20,
  },
  recipientLabel: {
    fontSize: 8,
    color: colors.muted,
    marginBottom: 8,
  },
  recipientName: {
    fontSize: 10,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 4,
  },
  recipientText: {
    fontSize: 10,
    color: colors.text,
    marginBottom: 2,
  },
  
  // Meta (offer number, date)
  metaSection: {
    position: "absolute",
    top: 130,
    right: 50,
  },
  metaRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  metaLabel: {
    fontSize: 9,
    color: colors.muted,
    width: 95,
  },
  metaValue: {
    fontSize: 9,
    fontWeight: "bold",
    color: colors.text,
  },
  
  // Title
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 12,
    marginTop: 30,
  },
  greeting: {
    fontSize: 10,
    color: colors.text,
    marginBottom: 8,
  },
  intro: {
    fontSize: 10,
    color: colors.text,
    lineHeight: 1.5,
    marginBottom: 20,
  },
  
  // Project Card
  projectCard: {
    backgroundColor: colors.lightBg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
    padding: 20,
    marginBottom: 20,
  },
  projectRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  projectCol: {
    width: "50%",
  },
  projectLabel: {
    fontSize: 9,
    color: colors.muted,
    marginBottom: 2,
  },
  projectValue: {
    fontSize: 9,
    fontWeight: "bold",
    color: colors.text,
  },
  
  // Features
  featuresSection: {
    marginBottom: 20,
  },
  featuresTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 10,
  },
  featureItem: {
    flexDirection: "row",
    marginBottom: 5,
  },
  featureBullet: {
    fontSize: 10,
    color: colors.primary,
    marginRight: 8,
  },
  featureText: {
    fontSize: 10,
    color: colors.text,
  },
  
  // Pricing Table
  pricingSection: {
    marginBottom: 20,
  },
  pricingTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 10,
  },
  pricingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  pricingLabel: {
    fontSize: 10,
    color: colors.text,
  },
  pricingValue: {
    fontSize: 10,
    color: colors.text,
    textAlign: "right",
  },
  
  // Summary Box
  summaryBox: {
    backgroundColor: colors.summaryBg,
    borderRadius: 4,
    padding: 20,
    marginBottom: 25,
  },
  summaryTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.white,
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  summaryLabel: {
    fontSize: 10,
    color: colors.white,
    opacity: 0.9,
  },
  summaryValue: {
    fontSize: 10,
    color: colors.white,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: colors.white,
    opacity: 0.3,
    marginVertical: 10,
  },
  summaryTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summaryTotalLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.white,
  },
  summaryTotalValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.white,
  },
  
  // Footer
  footer: {
    position: "absolute",
    bottom: 40,
    left: 50,
    right: 50,
  },
  footerDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginBottom: 15,
  },
  footerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerCol: {
    width: "30%",
  },
  footerTitle: {
    fontSize: 8,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 4,
  },
  footerText: {
    fontSize: 7,
    color: colors.muted,
    marginBottom: 2,
  },
});

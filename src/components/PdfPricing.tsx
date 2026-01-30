import React from "react";
import { View, Text } from "@react-pdf/renderer";
import { styles } from "./PdfStyles";
import { formatPrice } from "../utils/formatters";
import type { PdfProject, PdfUpgrade, PdfPricing as PricingType } from "../types";

interface Props {
  project: PdfProject;
  upgrades: PdfUpgrade[];
  pricing: PricingType;
}

export const PdfPricing: React.FC<Props> = ({ project, upgrades, pricing }) => (
  <View style={styles.pricingSection}>
    <Text style={styles.pricingTitle}>Kostenaufstellung</Text>
    
    {/* Package */}
    <View style={styles.pricingRow}>
      <Text style={styles.pricingLabel}>
        {project.packageName} ({project.shootingType})
      </Text>
      <Text style={styles.pricingValue}>{formatPrice(project.packagePrice)} €</Text>
    </View>
    
    {/* Travel Cost */}
    {pricing.travelCost && pricing.travelCost > 0 && (
      <View style={styles.pricingRow}>
        <Text style={styles.pricingLabel}>Anfahrtskosten</Text>
        <Text style={styles.pricingValue}>{formatPrice(pricing.travelCost)} €</Text>
      </View>
    )}
    
    {/* Upgrades */}
    {upgrades.map((upgrade, index) => (
      <View key={index} style={styles.pricingRow}>
        <Text style={styles.pricingLabel}>{upgrade.name}</Text>
        <Text style={styles.pricingValue}>{formatPrice(upgrade.price)} €</Text>
      </View>
    ))}
  </View>
);

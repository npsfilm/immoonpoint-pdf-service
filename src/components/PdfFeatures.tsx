import React from "react";
import { View, Text } from "@react-pdf/renderer";
import { styles } from "./PdfStyles";
import type { PdfUpgrade } from "../types";

interface Props {
  features: string[];
  upgrades: PdfUpgrade[];
}

export const PdfFeatures: React.FC<Props> = ({ features, upgrades }) => (
  <View style={styles.featuresSection}>
    <Text style={styles.featuresTitle}>Inklusivleistungen</Text>
    
    {features.slice(0, 4).map((feature, index) => (
      <View key={index} style={styles.featureItem}>
        <Text style={styles.featureBullet}>•</Text>
        <Text style={styles.featureText}>{feature}</Text>
      </View>
    ))}
    
    {upgrades.length > 0 && (
      <>
        <Text style={[styles.featuresTitle, { marginTop: 15 }]}>
          Ihre Zusatzleistungen
        </Text>
        {upgrades.map((upgrade, index) => (
          <View key={index} style={styles.featureItem}>
            <Text style={styles.featureBullet}>•</Text>
            <Text style={styles.featureText}>{upgrade.name}</Text>
          </View>
        ))}
      </>
    )}
  </View>
);

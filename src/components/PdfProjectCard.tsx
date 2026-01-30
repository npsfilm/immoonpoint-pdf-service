import React from "react";
import { View, Text } from "@react-pdf/renderer";
import { styles } from "./PdfStyles";
import { cleanAddress } from "../utils/formatters";
import type { PdfProject } from "../types";

interface Props {
  project: PdfProject;
}

export const PdfProjectCard: React.FC<Props> = ({ project }) => (
  <View style={styles.projectCard}>
    {/* Row 1: Objekt & Leistung */}
    <View style={styles.projectRow}>
      <View style={styles.projectCol}>
        <Text style={styles.projectLabel}>Objekt:</Text>
        <Text style={styles.projectValue}>{cleanAddress(project.address)}</Text>
      </View>
      <View style={styles.projectCol}>
        <Text style={styles.projectLabel}>Leistung:</Text>
        <Text style={styles.projectValue}>
          {project.shootingType} ({project.packageName})
        </Text>
      </View>
    </View>
    
    {/* Row 2: Umfang & Shooting/Anreise */}
    <View style={styles.projectRow}>
      <View style={styles.projectCol}>
        <Text style={styles.projectLabel}>Umfang:</Text>
        <Text style={styles.projectValue}>
          {project.packageImages || 10} High-End Aufnahmen
        </Text>
      </View>
      <View style={styles.projectCol}>
        {project.packageDuration ? (
          <>
            <Text style={styles.projectLabel}>Shooting:</Text>
            <Text style={styles.projectValue}>{project.packageDuration}</Text>
          </>
        ) : (
          <>
            <Text style={styles.projectLabel}>Anreise:</Text>
            <Text style={styles.projectValue}>Inklusive (Pauschal)</Text>
          </>
        )}
      </View>
    </View>
    
    {/* Row 3: Anreise (if duration was shown above) */}
    {project.packageDuration && (
      <View style={styles.projectRow}>
        <View style={styles.projectCol}>
          <Text style={styles.projectLabel}>Anreise:</Text>
          <Text style={styles.projectValue}>Inklusive (Pauschal)</Text>
        </View>
      </View>
    )}
  </View>
);

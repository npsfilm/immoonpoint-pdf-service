import React from "react";
import { View, Text, Image } from "@react-pdf/renderer";
import { styles } from "./PdfStyles";

const LOGO_URL = "https://oqguansmlbkrtlkaddvu.supabase.co/storage/v1/object/public/email-assets/LOGO_IOP.png?v=1";

interface Props {
  validUntil: string;
}

export const PdfHeader: React.FC<Props> = ({ validUntil }) => (
  <View style={styles.header}>
    <Image src={LOGO_URL} style={styles.logo} />
    <View style={styles.validityBadge}>
      <Text style={styles.validityText}>Gültig bis {validUntil}</Text>
    </View>
  </View>
);

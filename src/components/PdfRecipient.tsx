import React from "react";
import { View, Text } from "@react-pdf/renderer";
import { styles } from "./PdfStyles";
import type { PdfContact } from "../types";

interface Props {
  contact: PdfContact;
  offerNumber: string;
  date: string;
}

export const PdfRecipient: React.FC<Props> = ({ contact, offerNumber, date }) => (
  <>
    <View style={styles.recipientSection}>
      <Text style={styles.recipientLabel}>Angebots-Empfänger:</Text>
      {contact.company && (
        <Text style={styles.recipientName}>{contact.company}</Text>
      )}
      <Text style={styles.recipientText}>
        {contact.firstName} {contact.lastName}
      </Text>
      {contact.street && (
        <Text style={styles.recipientText}>{contact.street}</Text>
      )}
      {(contact.zipCode || contact.city) && (
        <Text style={styles.recipientText}>
          {contact.zipCode} {contact.city}
        </Text>
      )}
    </View>
    
    <View style={styles.metaSection}>
      <View style={styles.metaRow}>
        <Text style={styles.metaLabel}>Angebotsnummer:</Text>
        <Text style={styles.metaValue}>{offerNumber}</Text>
      </View>
      <View style={styles.metaRow}>
        <Text style={styles.metaLabel}>Datum:</Text>
        <Text style={styles.metaValue}>{date}</Text>
      </View>
    </View>
  </>
);

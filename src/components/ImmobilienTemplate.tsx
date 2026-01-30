import React from "react";
import { Document, Page, View, Text } from "@react-pdf/renderer";
import { PdfHeader } from "../components/PdfHeader";
import { PdfRecipient } from "../components/PdfRecipient";
import { PdfProjectCard } from "../components/PdfProjectCard";
import { PdfFeatures } from "../components/PdfFeatures";
import { PdfPricing } from "../components/PdfPricing";
import { PdfSummary } from "../components/PdfSummary";
import { PdfFooter } from "../components/PdfFooter";
import { styles } from "../components/PdfStyles";
import { formatDate, extractCity, getSalutationDisplay } from "../utils/formatters";
import type { PdfData } from "../types";

const features = [
  "Kommerzielle Nutzungsrechte",
  "Verkaufspsychologische Bildoptimierung",
  "Optimiert für ImmoScout & Co.",
  "Blaue-Himmel-Garantie",
];

export const ImmobilienTemplate: React.FC<{ data: PdfData }> = ({ data }) => {
  const today = new Date();
  const validUntil = new Date(today);
  validUntil.setDate(validUntil.getDate() + 30);
  
  const dateStr = formatDate(today);
  const validStr = formatDate(validUntil);
  const offerNo = `IOP-${dateStr.split(".").reverse().join("").slice(2)}-${Math.floor(Math.random() * 900) + 100}`;
  
  const city = extractCity(data.project.address);
  const salutation = getSalutationDisplay(data.contact.salutation);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <PdfHeader validUntil={validStr} />
        <PdfRecipient 
          contact={data.contact} 
          offerNumber={offerNo} 
          date={dateStr} 
        />
        
        <Text style={styles.title}>Ihr individuelles Angebot</Text>
        <Text style={styles.greeting}>
          Guten Tag {salutation} {data.contact.lastName},
        </Text>
        <Text style={styles.intro}>
          vielen Dank für Ihr Interesse an unseren Leistungen. Für Ihr Objekt in {city} haben wir folgendes Angebot für Sie zusammengestellt:
        </Text>
        
        <PdfProjectCard project={data.project} />
        <PdfFeatures features={features} upgrades={data.upgrades} />
        <PdfPricing 
          project={data.project}
          upgrades={data.upgrades}
          pricing={data.pricing}
        />
        <PdfSummary pricing={data.pricing} />
        <PdfFooter />
      </Page>
    </Document>
  );
};

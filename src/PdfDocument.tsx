import React from 'react';
import { ImmobilienTemplate } from './templates/ImmobilienTemplate';
import { DrohnenTemplate } from './templates/DrohnenTemplate';
import { KombiTemplate } from './templates/KombiTemplate';
import { StagingTemplate } from './templates/StagingTemplate';
import type { PdfData } from './types';

interface Props {
  data: PdfData;
}

export const PdfDocument: React.FC<Props> = ({ data }) => {
  const shootingType = data.project.shootingType.toLowerCase();
  
  if (shootingType.includes('drohne') && !shootingType.includes('kombi')) {
    return <DrohnenTemplate data={data} />;
  }
  if (shootingType.includes('kombi')) {
    return <KombiTemplate data={data} />;
  }
  if (shootingType.includes('staging')) {
    return <StagingTemplate data={data} />;
  }
  
  // Default: Immobilien
  return <ImmobilienTemplate data={data} />;
};

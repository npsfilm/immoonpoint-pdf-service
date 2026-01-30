export const formatPrice = (price: string | number): string => {
  const num = typeof price === "string" ? parseFloat(price) : price;
  return num.toLocaleString("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const cleanAddress = (address: string): string => {
  return address.replace(/, Deutschland$/i, "").trim();
};

export const extractCity = (address: string): string => {
  const parts = address.split(",").map((p) => p.trim());
  if (parts.length >= 2) {
    const cityPart = parts[parts.length - 2] || parts[parts.length - 1];
    return cityPart.replace(/^\d{5}\s*/, "").trim();
  }
  return address;
};

export const getSalutationDisplay = (salutation: string): string => {
  const lower = salutation.toLowerCase();
  if (lower.includes("herr")) return "Herr";
  if (lower.includes("frau")) return "Frau";
  return "Herr";
};

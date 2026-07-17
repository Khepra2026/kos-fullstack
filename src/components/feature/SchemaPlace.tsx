import { useEffect } from 'react';

interface SchemaPlaceProps {
  name: string;
  description: string;
  url: string;
  geoCoordinates?: {
    latitude: number;
    longitude: number;
  };
  addressCountry?: string;
  addressRegion?: string;
}

export default function SchemaPlace({ name, description, url, geoCoordinates, addressCountry, addressRegion }: SchemaPlaceProps) {
  useEffect(() => {
    const siteUrl = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';
    
    const placeSchema = {
      '@context': 'https://schema.org',
      '@type': 'Place',
      name,
      description,
      url: `${siteUrl}${url}`,
      ...(geoCoordinates && {
        geo: {
          '@type': 'GeoCoordinates',
          latitude: geoCoordinates.latitude,
          longitude: geoCoordinates.longitude
        }
      }),
      ...(addressCountry && {
        address: {
          '@type': 'PostalAddress',
          addressCountry,
          ...(addressRegion && { addressRegion })
        }
      })
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(placeSchema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [name, description, url, geoCoordinates, addressCountry, addressRegion]);

  return null;
}

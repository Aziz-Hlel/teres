export const atmosphereEnum = {
  STANDARD_TABLE: 'Standard Table',
  PRIVATE_LOUNGE: 'Private Lounge',
  PANORAMIC_VIEW: 'Panoramic View',
};

export type AtmosphereEnum = (typeof atmosphereEnum)[keyof typeof atmosphereEnum];

export const InquirySubjectEnum = {
  TABLE_RESERVATION: 'Table Reservation',
  SPACE_PRIVATIZATION: 'Space Privatization',
  PRESS_INQUIRY: 'Press Inquiry',
  OTHER: 'Other',
} as const;

export type InquirySubjectEnum = keyof typeof InquirySubjectEnum;

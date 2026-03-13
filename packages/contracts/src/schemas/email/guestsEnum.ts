export const guestsEnum = {
  TWO: '2',
  FOUR: '4',
  SIX: '6',
  EIGHT: '8',
};

export type GuestsEnum = (typeof guestsEnum)[keyof typeof guestsEnum];

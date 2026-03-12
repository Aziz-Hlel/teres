import capitalize from '@/utils/capitalize';

export const MODULE_NAME = 'events';

export const CARD_DATA = {
  title: capitalize(MODULE_NAME),
  description: `Manage your ${MODULE_NAME} and their details here.`,
  addButton: {
    label: `Add New ${capitalize(MODULE_NAME)}`,
  },
};

export const ADD_DIALOG_DATA = {
  title: `Add New ${capitalize(MODULE_NAME)}`,
  description: `Fill the form below to create a new ${MODULE_NAME}.`,
};

export const EDIT_DIALOG_DATA = {
  title: `Edit ${capitalize(MODULE_NAME)}`,
  description: `Fill the form below to edit the ${MODULE_NAME}.`,
};

export const DELETE_DIALOG_DATA = {
  title: `Delete ${capitalize(MODULE_NAME)}`,
  description: `Are you sure you want to delete this ${MODULE_NAME}?`,
};

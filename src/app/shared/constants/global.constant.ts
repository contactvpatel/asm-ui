/**
 * This constant file is used for development environment
 * Summary: All constant values
 */

export const deviceId = '000-000-0000';
export const headerTitle = 'ASM';
export const footerCompanyName = 'ASM';
export const itemsPerPage = 50;
export const regExp = {
  emailRegEx: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, // valid email id
  passwordRegEx: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$-_\.*]).{8,}$/, // allow a-z,A-Z,0-9 and @#$.-_ only
  numberRegEx: /^[0-9]+$/, // number 0-9 only
  mobileNumberRegEx: /^[+][0-9]{1}[ ][0-9]{3}[-][0-9]{3}[-][0-9]{4}$/, // mobile numer validation pattern, Ex = +1 123-123-1234
  landlineNumberRegEx: /^[(][0-9]{3}[)][ ][0-9]{3}[-][0-9]{4}$/, // landline number validation pattern, Ex = (123) 123-1234
  url: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)+[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
  phoneNumberRegx: /^\d{3}\-\d{3}-\d{4}$/
};

export const msgType = {
  success: 'success',
  info: 'info',
  warning: 'warn',
  error: 'error'
};
export const msgTitle = {
  success: 'Success',
  info: 'Info',
  warning: 'Warning',
  error: 'Error'
};
export const commonMessages = {
  insertSuccess: 'Record insert successfully',
  insertFailed: 'Record insert failed',
  updateSuccess: 'Record updated successfully',
  updateFailed: 'Record update failed',
  removeSuccess: 'Record(s) remove successfully',
  removeFailed: 'Record(s) remove failed',
  operationFailed: 'Operation has been failed'
};

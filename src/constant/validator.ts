import { Express } from 'express';
export function isEmailRequired(email: string): boolean {
  if (email.includes('@') && email.includes('.')) {
    return true;
  } else {
    return false;
  }
}

export function isPasswordRequired(password: string): boolean {
  if (password.length > 3) {
    return true;
  } else {
    return false;
  }
}

export function isPhoneNumber(phoneNum: string): boolean {
  const regex = /^[0-9]+$/;
  if (phoneNum.match(regex)) {
    return true;
  } else {
    return false;
  }
}

export function isRequired(name: string): boolean {
  if (name === undefined || name === '') {
    return false;
  } else {
    return true;
  }
}

export function isRegexValidator(regexCode: string, data: string): boolean {
  const regex = new RegExp(regexCode);
  if (data.match(regex)) {
    return true;
  } else {
    return false;
  }
}

export function isTokenRequired(token: string): boolean {
  if (token === undefined || token === '') {
    return false;
  } else {
    return true;
  }
}

export function isLocaleValid(locale: string): boolean {
  const localeData = ['en', 'id', 'de', 'fr', 'por', 'es', 'ned'];

  if (localeData.includes(locale)) {
    return true;
  } else {
    return false;
  }
}

// export function isFileNoNull(file: Express.Request['file']): boolean {
//   if (file === undefined || file === null) {
//     return false;
//   } else {
//     return true;
//   }
// }

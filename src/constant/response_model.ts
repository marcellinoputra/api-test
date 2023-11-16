export interface ResponseModelWithData {
  status: number;
  error: false;
  data: any;
  message: string;
}

export interface ResponseModelOnlyMessage {
  status: number;
  error: false;
  message: string;
}

export interface ResponseWhenError {
  status: number;
  error: true;
  message: string;
}

export interface ResponseModelWithToken {
  status: number;
  token: string;
  message: string;
  error: false;
}

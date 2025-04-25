export type ApiResp<SuccessData = any, ErrorData = any> =
  | {
    isError: false;
    data: SuccessData;
    headers: object;
  }
  | {
    isError: true;
    data: ErrorData;
    headers: null;
  };

  export type PostApiResp<SuccessData = any, ErrorData = any> =
  | {
    isError: false;
  }
  | {
    isError: true;
  };
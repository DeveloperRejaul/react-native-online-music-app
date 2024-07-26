
export interface GetParams { 
  endPoint?: string;
  token?: string
}

export interface PostParams { 
  endPoint?: string;
  body: string;
  'Content-type'?: string;
}

export interface Cat{
    id: string;
    tags:string[];
    mimetype:string;
    url:string;
}

export interface Navigate{
  navigate: (page: string) => void;
}

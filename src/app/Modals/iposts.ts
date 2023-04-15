export interface IPosts {
  postid: number;
  postTitle: string;
  postuserid: number;
  postusername: string;
  postDate: Date;
  comments: [
    {
      item1: string;
      item2: number;
      item3: string;
      item4: Date;
    }
  ];
}

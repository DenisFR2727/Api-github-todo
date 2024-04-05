type User = {
    html_url: string;
};
export interface IIssue  {
    id: number;
    title: string;
    number: number,
    comments: number,
    user: User,
    completed: boolean;
};



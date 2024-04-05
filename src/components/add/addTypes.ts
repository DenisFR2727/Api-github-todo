type User = {
    html_url: string;
};
interface Issues  {
    id: number;
    title: string;
    number: number;
    comments: number,
    user: User,
};
export type Data = Array<Issues>;


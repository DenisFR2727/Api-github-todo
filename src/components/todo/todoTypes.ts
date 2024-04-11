type User = {
    html_url: string;
};
type TodoStatus = 'todos' | 'inProgress' | 'completed';
export interface IIssue {
    id: number;
    title: string;
    number: number;
    comments: number;
    user: User;
    status: TodoStatus;
    completed: boolean;
}

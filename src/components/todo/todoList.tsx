import { IIssue } from './todoTypes';

interface TodoListProps {
    todos: IIssue[];
    onCheckboxChange: (id: number, status: string) => void;
    isInProgress: boolean;
}

function TodoList({ todos, onCheckboxChange, isInProgress }: TodoListProps) {
    return (
        <ul className="border-issue">
            {Array.isArray(todos) &&
                todos.map((issue) => (
                    <li key={issue.id}>
                        <div>
                            <p>{issue.title}</p>
                            <span># {issue.number}</span>
                            <p>
                                <a
                                    className="admin"
                                    href={issue.user?.html_url}
                                >
                                    Admin
                                </a>{' '}
                                | Comments: {issue.comments}
                            </p>
                        </div>
                        <label htmlFor="inProgress">
                            {isInProgress ? 'Done' : 'In Progress'}
                        </label>
                        <input
                            id="inProgress"
                            type="checkbox"
                            onChange={() =>
                                onCheckboxChange(issue.id, issue.status)
                            }
                        />
                    </li>
                ))}
        </ul>
    );
}
export default TodoList;

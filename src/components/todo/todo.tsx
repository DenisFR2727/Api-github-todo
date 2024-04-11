import { useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    todosList,
    inProgressList,
    completedTodosList,
    setStatus,
} from './todoSlice';
import TodoList from './todoList';
import './todo.scss';

function Todo() {
    const dispatch = useDispatch();
    const issues = useSelector(todosList);
    const progress = useSelector(inProgressList);
    const completed = useSelector(completedTodosList);

    const moveTodo = useCallback(
        (id: number, status: string) => {
            let newStatus = 'inProgress';
            if (status === 'todos') {
                newStatus = 'inProgress';
            } else if (status === 'inProgress') {
                newStatus = 'completed';
            } else if (status === 'completed') {
                newStatus = 'inProgress';
            }
            dispatch(setStatus({ id, status: newStatus }));
        },
        [dispatch]
    );

    const issuesList = useMemo(
        () => (
            <TodoList
                todos={issues}
                onCheckboxChange={(id, status) => moveTodo(id, status)}
                isInProgress={false}
            />
        ),
        [issues, moveTodo]
    );
    const progressList = useMemo(
        () => (
            <TodoList
                todos={progress}
                onCheckboxChange={(id, status) => moveTodo(id, status)}
                isInProgress={true}
            />
        ),
        [progress, moveTodo]
    );

    if (issues.length === 0) {
        return <p className="issue-unfound">No issues found</p>;
    }
    return (
        <div className="todos">
            <div className="general-block">
                <h3>ToDo</h3>
                <div className="block">{issuesList}</div>
            </div>
            <div className="general-block">
                <h3>In Progress</h3>
                <div className="block">{progressList}</div>
            </div>
            <div className="general-block">
                <h3>Done</h3>
                <div className="block">
                    <ul className="border-issue">
                        {Array.isArray(completed) &&
                            completed.map((issue, index) => (
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
                                        In Progress
                                    </label>
                                    <input
                                        type="checkbox"
                                        onChange={() =>
                                            moveTodo(issue.id, 'completed')
                                        }
                                    />
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
export default Todo;

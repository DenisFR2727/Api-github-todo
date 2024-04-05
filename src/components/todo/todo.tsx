import { useMemo, useCallback,} from "react";
import { useDispatch, useSelector } from "react-redux";
import { todosList, 
         inProgressList, 
         completedTodosList, 
         doneTodoMove, 
         doneToProgress} from "./todoSlice";
import { moveInProgress } from "./todoSlice";
import TodoList from "./todoList";
import "./todo.scss";

function Todo() {
   const dispatch = useDispatch();
   const issues = useSelector(todosList);
   const progress = useSelector(inProgressList);
   const completed = useSelector(completedTodosList);
   

const progressMove = useCallback((issueID: number) => {
    dispatch(moveInProgress(issueID));
}, [dispatch]);

const doneMove = useCallback((issueID: number) => {
    dispatch(doneTodoMove(issueID));
}, [dispatch]);

const doneToInProgress = useCallback((issueID: number) => {
    dispatch(doneToProgress(issueID));
},[dispatch])

const issuesList = useMemo(() => 
     <TodoList todos={issues} 
               onCheckboxChange={progressMove}
               isInProgress={false} />, [issues, progressMove]);
const progressList = useMemo(() => 
     <TodoList todos={progress} 
               onCheckboxChange={doneMove} 
               isInProgress={true}/>, [progress, doneMove]);

if(issues.length === 0){
    return <p className="issue-unfound">No issues found</p>
}
    return (
         <div className="todos"> 
             <div className="general-block">
             <h3>ToDo</h3>
                  <div className="block">
                       {issuesList}
                  </div>
             </div>
             <div className="general-block">
             <h3>In Progress</h3>
                  <div className="block">
                       {progressList}
                  </div>
             </div>
             <div className="general-block">
             <h3>Done</h3>
                  <div className="block">
                  <ul className="border-issue">
                    {
                    Array.isArray(completed) && completed.map((issue) => (
                             <li key={issue.id}>
                                <div>
                                    <p>{issue.title}</p>
                                    <span># {issue.number}</span>
                                     <p>
                                        <a className="admin" 
                                           href={issue.user.html_url}>
                                           Admin
                                        </a> | Comments: {issue.comments}
                                     </p>
                                </div>
                                <label htmlFor="inProgress">In Progress</label>
                                <input type="checkbox" onChange={() => doneToInProgress(issue.id)} />
                             </li>
                         ))
                    }
                     </ul>
                  </div>
             </div>
         </div>
    );
  }  
export default Todo;
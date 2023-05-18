import React, { useState } from 'react';
import './XStateTodo.scss'
import { useMachine } from "@xstate/react";
import { todosMachine } from "./machines/todoAppMachine";

// https://www.youtube.com/watch?v=xVhHej3LpWw&list=PLvWgkXBB3dd4ocSi17y1JmMmz7S5cV8vI&index=4

// const todos = new Set<string>(['TASK 1']);
const todos = new Set<string>([]);

const XStateTodo = () => {
  const [state, send] = useMachine(todosMachine, {
    services: {
      loadTodos: async () => {
        // throw new Error('asdf')
        return Array.from(todos);
      },
      saveTodo: async (context, event) => {
        todos.add(context.createNewTodoFormInput)
      },
      deleteTodo: async (context: any, event: any) => {
        // throw new Error('Delete Failed')
        todos.delete(event.todo);
      },
    }
  })

  return (
    <div className="XStateTodo">
      <pre>{JSON.stringify(state.value)}</pre>
      <pre>{JSON.stringify(state.context)}</pre>
      <div>
        {state.matches('Todos Loaded') && (
            <>
            {state.context.todos.map((todo) => (
              <div
                key={todo}
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <p>{todo}</p>
                <button
                  onClick={() => {
                    send({
                      type: "Delete",
                      todo,
                    });
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
            <button 
              onClick={() => {
                send({
                  type: "Create new",
                })
              }}
            >
              Create New
            </button>
          </>
        )}
      </div>
      {state.matches("Deleting todo errored") && (
        <>
          <p>Something went wrong: {state.context.errorMessage}</p>
          <button
            onClick={() => {
              send({
                type: "Speed up",
              });
            }}
          >
            Go back to list
          </button>
        </>
      )}
      {state.matches("Creating new todo.Showing form input") && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send({
              type: "Submit",
            });
          }}
        >
          <input
            onChange={(e) => {
              send({
                type: "Form input changed",
                value: e.target.value,
              });
            }}
          ></input>
        </form>
      )}
      {/* <p>{JSON.stringify(state.value)}</p>
      <button 
        onClick={() => send({
          type: 'Todos loaded',
          todos: ["Take bins out"],
        })}
      >Todos loaded</button>
      <button 
        onClick={() => send({
          type: 'Loading todos failed',
          errorMessage: 'Oh no!'
        })}
      >Loading todos failed</button> */}
    </div>
  )
}

// const todos = new Set<string>(['TASK 1']);

// const XStateTodo = () => {
//   const [state, send] = useMachine(todosMachine, {
//     services: {
//       loadTodos: async () => {
//         return Array.from(todos);
//       },
//       saveTodo: async (context : any, event: any) => {
//         todos.add(context.createNewTodoFormInput);
//       },
//       deleteTodo: async (context: any, event: any) => {
//         todos.delete(event.todo);
//       },
//     },
//   } as any);

//   return (
//     <div>
//       <pre>{JSON.stringify(state.value)}</pre>
//       <pre>{JSON.stringify(state.context)}</pre>
//       <div>
//         {state.matches("Todos Loaded") && (
//           <>
//             {state.context.todos.map((todo) => (
//               <div
//                 key={todo}
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                 }}
//               >
//                 <p>{todo}</p>
//                 <button
//                   onClick={() => {
//                     send({
//                       type: "Delete",
//                       todo,
//                     });
//                   }}
//                 >
//                   Delete
//                 </button>
//               </div>
//             ))}
//           </>
//         )}
//         {state.matches("Todos Loaded") && (
//           <button
//             onClick={() => {
//               send({
//                 type: "Create new",
//               });
//             }}
//           >
//             Create new
//           </button>
//         )}
//         {state.matches("Deleting todo errored") && (
//           <>
//             <p>Something went wrong: {state.context.errorMessage}</p>
//             <button
//               onClick={() => {
//                 send({
//                   type: "Speed up",
//                 });
//               }}
//             >
//               Go back to list
//             </button>
//           </>
//         )}
//         {state.matches("Creating new todo.Showing form input") && (
//           <form
//             onSubmit={(e) => {
//               e.preventDefault();
//               send({
//                 type: "Submit",
//               });
//             }}
//           >
//             <input
//               onChange={(e) => {
//                 send({
//                   type: "Form input changed",
//                   value: e.target.value,
//                 });
//               }}
//             ></input>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

export default XStateTodo;
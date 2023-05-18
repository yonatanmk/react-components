import { createMachine, assign } from "xstate";

export const todosMachine =
  createMachine(
    {
      /** @xstate-layout N4IgpgJg5mDOIC5QBcD2FUAIC2BDAxgBYCWAdmAHQAyquEZUmAKuqrAMQbkVkBuqAa0poMOAiW406DZq1gI+qfLmTFUpANoAGALradiUAAc2xVesMgAHogC0AdgCsFABxaAbE4BM7nwE57NwBGABoQAE87IIBmCnsvABYveKCEv19ooICAX2ywkSw8IjJKKXpSRhYMDi5KRSEKArFiyVpyyrkFUn5lc01dDSCDJBATWDM1UksbBFsE5xitLy0XaLX1zISwyNnUvwpfR1z81maJUraZKrZ2MAAnO9Q7iiMAGxUAMyfsRtOi8+olwqsmqXR6Kkm+n0ljGEwsIxmti8LgScWR7iC7j8flWSQS0W2iC8OIo6T8y2iLhx7miCWOICa-xKFGusEwZUg7AAwncwCowJhyAB3aEjWF9aZRZyOBJBOVYnG0xLRLyEhDJLxxLT2BIuRypFw0ul5Bl-cTM1nstqcgAiYFeYGQYFFxlMEoRiCCjncFGijnsKq0ji0mP9-rVQWJFEcjj8WgS9ncuqNS3pjPN3B5fNUwOFmAKFAAyoRUEKZF87thMGQjABXZDsABi32rpDryEwRFwFUgLtGbsmkoQWQocv1ay0IfcYfsavcWlietjXh8ydpQTTZpalCzENzYCF+dYRZLZeBFarNfr7ELtYARtgzH3xYOPeqF76fNqg1OZ2qEgBaKZEEIZrsaJyiEyma8nujB5gWha4LwMgFJw6h1N0gjCFuAK7jmcEHkeGBFkhKGsGCSgQuoUK6DCA7wqAMzRJOaIeCGTihk4s4RESvi+rqcqgYatKbpBGY7jB+GCoRCGkcCqH3I8zxvJ83y-GJ24UHhMjwceiHIfJ5GKL0kIDLRYr0VMb7JC4FDxi48SePq05cWqMY+vi9h+I4lLUuuomFOJFB2g6UmobUPCYQ06aaSFjpkRgFEmdRZnDK64zuoxiCZJqTjpEmXjOX+PGzE4pIBPYXrxu4ngoi4AVnMycVhawtwPE8LzvMgF7qYFsX2vFhmJcZVH9Ho5npXCVlZQgaw+o4xJZDGv6uSVfixMGK4ot5axeF6XgNVBlDNQlWCKU8nKFkYYCQJgtZGM+llDrS+wyssMbpMsW0RuSFAAWSPiOC4yJefYh1BSdQ1ne1vIQOwViwMg-IULgHxOncAAUhWTgAlOwMUApDjBNOdsOPRlr4zSBPpygmaw4sDvncTsXi0q4KxBjEQMriGRz0qQ6BwJYBMlHRFMMdYdhKnZDnYlkip4gSJVItE9ijok2IJEsKpveDmllFcchi1NQ5In4qIrF5fjy7iypuc41soiuSbCVrB0miL3CWhyEDG5lkuzKzFDvUEXlpLb+I-Zq-2eKuruph7OHMgbUNsqTkB+5TAdm0Erjkp45sK3bJUxqi61eT5VKuxuicabhkk6TJrCZxLiKARzoeFxHSs7LSzjIqHC5V0aev19mjeHghp7li2V7IC300B7E1s4u9K3enqbkgeVq4xH5sqj8y2n7pPelycTzcWeLi8zPiFsOYE5JFatOz4rlLiD75ruH9wRNEagC8hzJC0NGb0Pkn6cXDMrL05V7CVWDAkGqgRdQ-2OgNFqoh06+yvibN8QNbKMyfrtda5IIypDRC4YG85EiFRlPVXI2QgA */
      tsTypes: {} as import("./todoAppMachine.typegen").Typegen0,
      schema: {
        services: {} as {
          loadTodos: {
            data: string[];
          };
          saveTodo: {
            data: void;
          }
          deleteTodo: {
            data: void;
          };
        },
        events: {} as 
          | { type: 'Create new' }
          | { type: 'Form input changed'; value: string }
          | { type: 'Submit' }
          | { type: 'Delete'; todo: string }
          | { type: 'Speed up' }
      },
      context: {
        todos: [] as string[],
        errorMessage: undefined as string | undefined,
        createNewTodoFormInput: '',
      },
      id: "todo machine",
      initial: 'Loading Todos',
      states: {
        "Loading Todos": {
          invoke: {
            src: "loadTodos",
            onDone: [
              {
                target: "Todos Loaded",
                actions: 'assignTodosToContext',
                cond: "Has todos"
              },
              {
                target: "Creating new todo",
              }
            ],
            onError: {
              target: "Loading todos errored",
              actions: "assignErrorToContext",
            }
          }
        },

        "Todos Loaded": {
          on: {
            "Create new": "Creating new todo",
            Delete: "Deleting todo"
          }
        },

        "Loading todos errored": {},

        "Creating new todo": {
          states: {
            "Showing form input": {
              on: {
                "Form input changed": {
                  target: "Showing form input",
                  internal: true,
                  actions: 'assignFormInputToContext',
                },

                Submit: "Saving todo"
              }
            },

            "Saving todo": {
              invoke: {
                src: "saveTodo",
                onDone: "#todo machine.Loading Todos",
                onError: {
                  target: "Showing form input",
                  actions: "assignErrorToContext",
                }
              }
            }
          },

          initial: "Showing form input"
        },

        "Deleting todo": {
          invoke: {
            src: "deleteTodo",
            onError: {
              target: "Deleting todo errored",
              actions: 'assignErrorToContext'
            },
            onDone: "Loading Todos"
          }
        },

        "Deleting todo errored": {
          after: {
            "2500": {
              target: "Todos Loaded",
            },
          },
          on: {
            "Speed up": "Todos Loaded"
          }
        }
      },
    },
    {
      guards: {
        "Has todos": (context, event) => {
          return event.data.length > 0;
        },
      },
      actions: {
        assignTodosToContext: assign((context, event) => {
          return {
            todos: event.data,
          }
        }),
        assignErrorToContext: assign((context, event) => {
          return {
            errorMessage: (event.data as Error).message,
          }
        }),
        assignFormInputToContext: assign((context, event) => {
          return {
            createNewTodoFormInput: event.value,
          }
        })
      }
    }
  );

// export const todosMachine =
//   /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAIC2BDAxgBYCWAdmAHQAyquEZUmaGsAxBuRWQG6oDWlZljxEylGnQZN0qWAh6p8uAC7FUpANoAGALqJQAB1nFV6-SAAeiALQAmLQHYKAZgCcAVlvu3WgCwBGX2dbZwAaEABPG2dfXwp3ADYE118E-39nBy1XBIBfXPChHAISTgl6UkYhNjAAJ1rUWooDABsVADNG7AoikVLxWgqqmTkFJVNNXXMjWBM1UnMrBGtfB1sKAA53Xw2HBNsdjI2N8KjlhPcXLS9XWwcN1wffa-zCmWLRTmrMcshWAGFamAVGBMOQAO7TYwTRaIfwHTbHTzudwOZ5aDbOMKRRDOLQUPbpfwbfxaQJEravEC9EpiHojH6DP4AETALTAyjAUNmMKQllxqQJGx2thJGxCN3cpxsotcFCSJMyjncHge7ipNM+lEBwNUlTBYHBmGUMgoAGVCKhwVJOrVsJgyAYAK7KVgAMS6DtIzuUmCIuEqkG5czMfKW1nSGwo8JVaP2rgcselCBi+KODmJcay-g17z6dJ1KikEONpotVptnsdLtYZqdACNsCZg7zQEt-ImKH53BsEg4UndMwlk15LomHg5E2i-K4tM5cxgPv0KIW9YwSyaMObcNwpJvUOx1JQFAJ6Yv85xV8XDaWt2ad3uZPJSLxxvNtHo+TMQwsw4gDnE7hkr4nhit4njJis-jRh4Kq+LYITHGS6oFNSea0peQJFvqG5lg++r7qwdQNE0rQdF0Z7CBh2pYWuBpGvu267gRT5jEW6gfi28ywggpJRloCTZMEqQZgJqLJqm8oJKszgKgEtgpAuVFahQrLsnRhEcMeL78II6EqWpHKPhgz6vuxkyfoY0LcX+yzOMSLgPEhgn2SE2JnNYiTrM4GxaAJCl7CiqJKUudKGRpMhEfUjTNG0yi2t0mrLuFxmoKZijmZxX7WaGbaIN4UZ7PsOwZjExzDjiyxeNBk7+EkdXbKsfgbCFF6UClLGLsRjR-GaBhgJAmBOgYXG5fyKYqtGwpxhi5WCRVHnEnKySuf5xwkq11GqWyRmdVg3VAhArAWLAygghQuDtJytQABReH5ACUrBJWFO0RV10WHaNv55SmziXPYCQPHOvlogpkHwgkFCPIEuwdrsDyivkqGkOgcDmC9ZSDFI1TfTxKy+fECRYuKaRpEB-iQfYcrkmsZIeGirgxJtKnfL8EB47ZHgEvZpP2ImPYHBDOQwVkWIBDEzwtahmMDJIe2wJgB1BtlPI2b9Kwi+iuw+UJCZC5VPaOf9s62H2Wx3F4LPLleOE3ox5bWvqCVej6nMayiFB3CBiMhB2GKuCO-3Q7ODyPMT-3pPOMv6TbtHXgxeHMYw+7u+NCnrI4MkKWVsk5EHTh+IJs7Er2OyeNbBbx3bicYGn4aBOsMYJqkAVJpVdXOF2tgdhkWieApjWV5wHUpzI9e4p7CbSY4zdAWikE7FGs4xHsc79ii0tvOeW2j7e+2fSrVlq2NSzuB28SovGmK+Qh7k2BkXe+B4-iohT447MPXKqz++OePi2sHC6yZvrSCxNLgxCZtcOciFsjI1yEAA */
//   createMachine(
//     {
//       context: {
//         todos: [] as string[],
//         errorMessage: undefined as string | undefined,
//         createNewTodoFormInput: "",
//       },
//       tsTypes: {} as import("./todoAppMachine.typegen").Typegen0,
//       schema: {
//         services: {} as {
//           loadTodos: {
//             data: string[];
//           };
//           saveTodo: {
//             data: void;
//           };
//           deleteTodo: {
//             data: void;
//           };
//         },
//         events: {} as
//           | {
//               type: "Create new";
//             }
//           | {
//               type: "Form input changed";
//               value: string;
//             }
//           | {
//               type: "Submit";
//             }
//           | {
//               type: "Delete";
//               todo: string;
//             }
//           | {
//               type: "Speed up";
//             },
//       },
//       id: "Todo machine",
//       initial: "Loading Todos",
//       states: {
//         "Loading Todos": {
//           invoke: {
//             src: "loadTodos",
//             onDone: [
//               {
//                 actions: "assignTodosToContext",
//                 cond: "Has todos",
//                 target: "Todos Loaded",
//               },
//               {
//                 target: "Creating new todo",
//               },
//             ],
//             onError: [
//               {
//                 actions: "assignErrorToContext",
//                 target: "Loading todos errored",
//               },
//             ],
//           },
//         },
//         "Todos Loaded": {
//           on: {
//             "Create new": {
//               target: "Creating new todo",
//             },
//             Delete: {
//               target: "Deleting todo",
//             },
//           },
//         },
//         "Loading todos errored": {},
//         "Creating new todo": {
//           initial: "Showing form input",
//           states: {
//             "Showing form input": {
//               on: {
//                 "Form input changed": {
//                   actions: "assignFormInputToContext",
//                 },
//                 Submit: {
//                   target: "Saving todo",
//                 },
//               },
//             },
//             "Saving todo": {
//               invoke: {
//                 src: "saveTodo",
//                 onDone: [
//                   {
//                     target: "#Todo machine.Loading Todos",
//                   },
//                 ],
//                 onError: [
//                   {
//                     actions: "assignErrorToContext",
//                     target: "Showing form input",
//                   },
//                 ],
//               },
//             },
//           },
//         },
//         "Deleting todo": {
//           invoke: {
//             src: "deleteTodo",
//             onDone: [
//               {
//                 target: "Loading Todos",
//               },
//             ],
//             onError: [
//               {
//                 actions: "assignErrorToContext",
//                 target: "Deleting todo errored",
//               },
//             ],
//           },
//         },
//         "Deleting todo errored": {
//           after: {
//             "2500": {
//               target: "Todos Loaded",
//             },
//           },
//           on: {
//             "Speed up": {
//               target: "Todos Loaded",
//             },
//           },
//         },
//       },
//     },
//     {
//       guards: {
//         "Has todos": (context, event) => {
//           return event.data.length > 0;
//         },
//       },
//       actions: {
//         assignTodosToContext: assign((context, event) => {
//           return {
//             todos: event.data,
//           };
//         }),
//         assignErrorToContext: assign((context, event) => {
//           return {
//             errorMessage: (event.data as Error).message,
//           };
//         }),
//         assignFormInputToContext: assign((context, event) => {
//           return {
//             createNewTodoFormInput: event.value,
//           };
//         }),
//       },
//     },
//   );
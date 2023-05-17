import './XState.scss';
import { useMachine } from "@xstate/react";
import { myMachine } from "./machines/myFirstMachine";

function XState() {
  const [state, send] = useMachine(myMachine)

  return (
    <div className="XState">
      <p>{JSON.stringify(state.value)}</p>
      <button onClick={() => send('MOUSEOVER')}>Mouse Over</button>
      <button onClick={() => send('MOUSEOUT')}>Mouse Out</button>
    </div>
  )
}



export default XState;
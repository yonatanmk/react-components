import "./ReduxLayout.scss";
import store, { IStoreState } from './store'
import { Provider } from 'react-redux'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, incrementByAmount } from './counterSlice'

function ReduxLayout() {


  return (
    <div className="ReduxLayout">
      <Provider store={store}>
        <h1>Redux Layout</h1>
        <P1 />
      </Provider>
    </div>
  );
}

function P1() {
  const count = useSelector((state: IStoreState) => state.counter.value)
  const dispatch = useDispatch()
  return (
    <div className="P1">
      <p>P1: {count}</p>
      <button
        aria-label="P1 Increment value"
        onClick={() => dispatch(increment())}
      >
        P1 Increment
      </button>
      <button
        aria-label="P1 Decrement value"
        onClick={() => dispatch(decrement())}
      >
        P1 Decrement
      </button>
      <C1 />
    </div>
  );
}

function C1() {
  const count = useSelector((state: IStoreState) => state.counter.value)
  const dispatch = useDispatch()
  return (
    <div className="P1">
      <p>C1: {count}</p>
      <button
        aria-label="C1 Increment value"
        onClick={() => dispatch(increment())}
      >
        C1 Increment
      </button>
      <button
        aria-label="C1 Decrement value"
        onClick={() => dispatch(decrement())}
      >
        C1 Decrement
      </button>
      <C2 />
    </div>
  );
}

function C2() {
  const count = useSelector((state: IStoreState) => state.counter.value)
  const dispatch = useDispatch()
  return (
    <div className="P1">
      <p>C2: {count}</p>
      <button
        aria-label="C2 Increment value"
        onClick={() => dispatch(increment())}
      >
        C2 Increment
      </button>
      <button
        aria-label="C2 Decrement value"
        onClick={() => dispatch(decrement())}
      >
        C2 Decrement
      </button>
      <button
        aria-label="C2 Increment value"
        onClick={() => dispatch(incrementByAmount(3))}
      >
        C2 Increment By 3
      </button>
    </div>
  );
}

export default ReduxLayout;

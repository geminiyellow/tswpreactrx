/// <reference path="../typings/tsd.d.ts" />

import * as Rx from "rx";
import * as React from "react";
import {createRxComponent, funcSubject} from "react-rx-component";

const { CounterContainer } = createRxComponent<number>((props$: Rx.Observable<{}>) => {
  const increment$ = funcSubject<number>(); // handleIncrement
  const count$ = increment$
    .startWith(0) // state = { count: 0 }
    .scan<number>((count: number) => count + 1); // this.setState((state) => ({ count: count + 1 }))

  return Rx.Observable.combineLatest<any, number, any>(props$, count$, (props: {}, count: number) => ({ props, increment: increment$, count }));
}, Counter);

function Counter(props) {
  const { count, increment } = props;
  return (
    <div>
      {count}
      <button onClick={increment}>Increment</button>
    </div>
  );
}

export default class App extends React.Component<{}, {}> {
    render(): React.ReactElement<{}> {
        return  <div>
                    <CounterContainer />
                </div>;
    }
}
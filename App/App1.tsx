/// <reference path="../typings/tsd.d.ts" />

import * as Rx from "rx";
import * as React from "react";
import {createRxComponent, funcSubject} from "react-rx-component";

interface IProps {
    count:  number;
    increment: () => void;
}

let counterView: (props: IProps) => JSX.Element = (props: IProps) => {
  return (
    <div>
      <span>{props.count}</span>
      <button onClick={props.increment}>Click me</button>
    </div>
  );
};

const { CC }: JSX.ElementClass = createRxComponent<number>(
    (props$: Rx.Observable<{}>) => {
        const increment$: Rx.Observable<number> = funcSubject<number>();
        const count$: Rx.Observable<number> = increment$.startWith(0).scan<number>((count: number) => count + 1);

        return Rx.Observable.combineLatest<{}, number, {}>(
            props$,
            count$,
            (props: {}, count: number) => (
                { props, increment: increment$, count }
            ));
    },
    counterView);

export default class App extends React.Component<{}, {}> {
    render(): React.ReactElement<{}> {
        return  <div>
                    <CC />
                </div>;
    }
}
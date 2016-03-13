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
      <span>I like Rx {props.count} time{props.count ? "" : "s"}</span>
      <button onClick={props.increment}>Click me</button>
    </div>
  );
};

const CC: () => React.Component<{}, {}> = () => createRxComponent<number>(
    (props$: Rx.Observable<{}>) => {
        const increment$: Rx.Observable<number> = funcSubject<number>();
        const count$: Rx.Observable<number> = increment$.startWith(10).scan(
            (acc: number, val: number) => acc + 1);

        return Rx.Observable.combineLatest<{}, number, {}>(
            props$,
            count$,
            (props: {}, count: number) => (
                { increment: increment$, count }
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
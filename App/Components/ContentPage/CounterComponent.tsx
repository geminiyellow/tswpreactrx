/// <reference path="../../../typings/tsd.d.ts" />

interface ICounterProps {
    count:  number;
    increment: () => void;
}

let counterView: (props: ICounterProps) => JSX.Element = (props: ICounterProps) => {
  return (
    <div>
      <span>I like Rx {props.count} time{props.count ? "" : "s"}</span>
      <button onClick={props.increment}>Click me</button>
    </div>
  );
};

export class CounterComponent extends React.Component<ICounterProps, {}> {

    private rxc: React.Component<{}, {}>;

    constructor(props, context) {
        super(props, context);
        rxc = createRxComponent<number>(
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
            }, counterView);
    }

    render(): React.ReactElement<{}> {
        return rxc.render();
    }
};
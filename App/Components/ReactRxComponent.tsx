/// <reference path="../../typings/tsd.d.ts" />

import * as Rx from "rx";
import * as React from "react";
import {funcSubject} from "react-rx-component";

export default class ReactRxComponent<TProps, TContext> extends React.Component<TProps, TContext> {

    private receive$: any;
    private props$: TProps;
    private childProps$: any;
    private context$: any;
    private subscription: any;
    private componentHasMounted: boolean;

    constructor((mapProps: (props: Rx.Observable<TProps>) => Rx.Observable<TProps>, render: (props: any) => JSX.Element): React.Component<TProps, TContext>, context: TContext) {

      super({}, context);

      // Used to receive props and context from owner
      this.receive$ = funcSubject();

      this.props$ = this.receive$.map(x => x[0]).startWith(props);
      this.context$ = this.receive$.map(x => x[1]).startWith(context);

      // Sequence of child props
      this.childProps$ = mapProps(this.props$, this.context$);

      // Keep track of whether the component has mounted
      this.componentHasMounted = false;

      // Subscribe to child prop changes so we know when to re-render
      this.subscription = this.childProps$.subscribe(
        childProps =>
          !this.componentHasMounted
            ? this.state = childProps
            : this.setState(childProps)
      );
    }

    componentDidMount(): void {
      this.componentHasMounted = true;
    }

    componentWillReceiveProps(nextProps, nextContext): void {
      // Receive new props and context from the owner
      this.receive$([ nextProps, nextContext ]);
    }

    shouldComponentUpdate = shouldPureComponentUpdate;

    componentWillUnmount(): void {
      // Clean-up subscription before un-mounting
      this.subscription.dispose();
    }

    render(): React.ReactElement<TProps> {
      const childProps = this.state;
      return render(childProps);
    }
};

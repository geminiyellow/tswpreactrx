// Type definitions for react-rx-component
// Project: https://github.com/acdlite/react-rx-component/

/// <reference path="../react/react.d.ts" />
/// <reference path="../rx/rx.d.ts" />

declare module ReactRxComponent {

      export function createRxComponent<T>(mapProps: (props: Rx.Observable<T>) => Rx.Observable<{}>, renderOrComponent: (props: any) => JSX.Element): __React.Component<{},{}>;

      export function funcSubject<T>(): Rx.Observable<T>;
}

declare module "react-rx-component" {
    export = ReactRxComponent;
}

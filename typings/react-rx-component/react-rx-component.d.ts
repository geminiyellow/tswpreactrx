// Type definitions for react-rx-component
// Project: https://github.com/acdlite/react-rx-component/

declare module ReactRxComponent {

      export function createRxComponent(mapProps: any, renderOrComponent: any): any;

      export function funcSubject(): (any) => any;
}

declare module "react-rx-component" {
    export = ReactRxComponent;
}

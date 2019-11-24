/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface MpSideDrawer {
    'open': () => void;
    'opened': boolean;
    'title': string;
  }
  interface MyComponent {
    /**
    * The first name
    */
    'first': string;
    /**
    * The last name
    */
    'last': string;
    /**
    * The middle name
    */
    'middle': string;
  }
}

declare global {


  interface HTMLMpSideDrawerElement extends Components.MpSideDrawer, HTMLStencilElement {}
  var HTMLMpSideDrawerElement: {
    prototype: HTMLMpSideDrawerElement;
    new (): HTMLMpSideDrawerElement;
  };

  interface HTMLMyComponentElement extends Components.MyComponent, HTMLStencilElement {}
  var HTMLMyComponentElement: {
    prototype: HTMLMyComponentElement;
    new (): HTMLMyComponentElement;
  };
  interface HTMLElementTagNameMap {
    'mp-side-drawer': HTMLMpSideDrawerElement;
    'my-component': HTMLMyComponentElement;
  }
}

declare namespace LocalJSX {
  interface MpSideDrawer {
    'opened'?: boolean;
    'title'?: string;
  }
  interface MyComponent {
    /**
    * The first name
    */
    'first'?: string;
    /**
    * The last name
    */
    'last'?: string;
    /**
    * The middle name
    */
    'middle'?: string;
  }

  interface IntrinsicElements {
    'mp-side-drawer': MpSideDrawer;
    'my-component': MyComponent;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      'mp-side-drawer': LocalJSX.MpSideDrawer & JSXBase.HTMLAttributes<HTMLMpSideDrawerElement>;
      'my-component': LocalJSX.MyComponent & JSXBase.HTMLAttributes<HTMLMyComponentElement>;
    }
  }
}



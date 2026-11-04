import * as React from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        alt?: string;
        "camera-controls"?: boolean | string;
        "touch-action"?: string;
        "shadow-intensity"?: string | number;
        exposure?: string | number;
        "interaction-prompt"?: string;
        loading?: "auto" | "lazy" | "eager";
        poster?: string;
        autoplay?: boolean | string;
        [key: string]: unknown;
      };
    }
  }
}

export {};


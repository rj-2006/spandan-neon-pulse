/// <reference types="vite/client" />

declare namespace JSX {
  interface IntrinsicElements {
    "model-viewer": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        src?: string;
        alt?: string;
        "auto-rotate"?: boolean;
        "camera-controls"?: boolean;
        "disable-zoom"?: boolean;
        "rotation-per-second"?: string;
        "environment-image"?: string;
        "exposure"?: string;
        style?: React.CSSProperties;
      },
      HTMLElement
    >;
  }
}

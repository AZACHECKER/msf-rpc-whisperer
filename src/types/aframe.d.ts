
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'a-scene': any;
      'a-camera': any;
      'a-cursor': any;
      'a-entity': any;
      'a-box': any;
      'a-plane': any;
      'a-text': any;
      'a-light': any;
      'a-sky': any;
      'a-assets': any;
      'a-asset-item': any;
      'a-animation': any;
    }
  }

  interface Window {
    AFRAME: any;
  }
}

export {};

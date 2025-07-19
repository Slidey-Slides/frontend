"use client";

import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { useEffect } from "react";

export const SlideEditor = ({
  defaultSlideData,
}: {
  defaultSlideData: any;
}) => {
  const { editor, onReady } = useFabricJSEditor();

  console.log(defaultSlideData[0]);

  useEffect(() => {
    editor?.canvas
      .loadFromJSON(defaultSlideData[0])
      .then((canvas) => canvas.requestRenderAll());
  }, [editor?.canvas, defaultSlideData]);

  //   editor?.canvas.set("backgroundColor", "white");
  //   editor?.canvas.requestRenderAll();

  return (
    <FabricJSCanvas
      className="sample-canvas h-[80vh] w-full border-2 border-black"
      onReady={onReady}
    />
  );
};

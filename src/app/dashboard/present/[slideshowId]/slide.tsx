"use client";
import { useEffect, useCallback } from "react";
import * as fabric from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";

import { usePresentationSocket } from "./hook";

type LoadJSONArg = Parameters<fabric.Canvas["loadFromJSON"]>[0];

const Slide = (props: { slideData: LoadJSONArg[] }) => {
  const { editor, onReady } = useFabricJSEditor();

  const nextSlide = useCallback(() => {}, []);
  const prevSlide = useCallback(() => {}, []);

  const { isReady, slideNumber } = usePresentationSocket({
    code: 123456789,
    slideshowData: JSON.stringify(props.slideData),

    onNextSlide: nextSlide,
    onPrevSlide: prevSlide,
  });

  useEffect(() => {
    console.log(slideNumber);
    editor?.canvas
      .loadFromJSON(
        props.slideData[Math.min(slideNumber, props.slideData.length - 1)],
      )
      .then((canvas) => canvas.requestRenderAll());
  }, [editor?.canvas, props.slideData, slideNumber]);

  return (
    <>
      {isReady ? (
        <FabricJSCanvas
          className="sample-canvas h-[100vh] border-2 border-[#373937] bg-[#030507]"
          onReady={onReady}
        />
      ) : (
        <>NOT READY</>
      )}
    </>
  );
};

export default Slide;

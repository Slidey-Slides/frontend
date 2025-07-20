"use client";
import { useEffect, useCallback } from "react";
import { usePresentationSocket } from "./hook";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Slide = (props: { slideData: any }) => {
  const { editor, onReady } = useFabricJSEditor();
  //   const slideIndex = 0;

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

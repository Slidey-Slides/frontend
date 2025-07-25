"use client";

import * as fabric from "fabric";
import { useEffect, useCallback, useRef } from "react";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

import { usePresentationSocket } from "./hook";

type LoadJSONArg = Parameters<fabric.Canvas["loadFromJSON"]>[0];

const Slide = (props: { slideData: LoadJSONArg[] }) => {
  const handle = useFullScreenHandle();
  const randomRoomCode = useRef(
    Math.floor(100000000 + Math.random() * 900000000),
  );
  const { editor, onReady } = useFabricJSEditor();

  const nextSlide = useCallback(() => {}, []);
  const prevSlide = useCallback(() => {}, []);

  const { isReady, slideNumber } = usePresentationSocket({
    code: randomRoomCode.current,
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

  if (!isReady) {
    return <>Not yet connected to socket server!</>;
  }

  return (
    <div>
      <div className="flex justify-between">
        <button className="hover:cursor-pointer" onClick={handle.enter}>
          Enter fullscreen
        </button>
        <h1>Room Code: {randomRoomCode.current}</h1>
      </div>

      <FullScreen handle={handle}>
        <FabricJSCanvas
          className="sample-canvas h-[100vh] border-2 border-[#373937] bg-[#030507]"
          onReady={onReady}
        />
      </FullScreen>
    </div>
  );
};

export default Slide;

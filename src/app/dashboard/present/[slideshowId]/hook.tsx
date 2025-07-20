import { useEffect, useRef, useState } from "react";

type PresentationSocketOptions = {
  code: number;
  onNextSlide: () => void;
  onPrevSlide: () => void;
  slideshowData: string;
};

type ServerMessage =
  | {
      event: "motion";
      source: "server";
      angle: number;
    }
  | {
      event: "command";
      source: "server";
      change: "forward" | "backward";
    };

export function usePresentationSocket({
  code,
  onNextSlide,
  onPrevSlide,
  slideshowData,
}: PresentationSocketOptions) {
  const [angle, setAngle] = useState<number | null>(null);
  const [slideNumber, setSlideNumber] = useState<number>(0);
  const [isReady, setIsReady] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);

  const [triggerState, setTriggerState] = useState({
    forward: false,
    backward: false,
  });
  const [threshold, setThreshold] = useState(false);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000");
    socketRef.current = ws;

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          event: "create",
          source: "presenter",
          slideshowData,
          code,
        }),
      );
      setIsReady(true);
      console.log("WebSocket connection established");
    };

    ws.onmessage = (event) => {
      let data: ServerMessage;
      try {
        data = JSON.parse(event.data);
      } catch (e) {
        console.error("Invalid JSON from server", e);
        return;
      }
      console.log(data);

      if (data.source !== "server") return;

      if (data.event === "motion") {
        setAngle(data.angle);

        // if (data.angle > 2.5) {
        //   console.log("above threshold +ve");
        //   setThreshold(true);
        // } else if (data.angle < 2.5 && data.angle > 0 && threshold) {
        //   console.log("switch next");
        //   ws.send(
        //     JSON.stringify({
        //       event: "data",
        //       source: "presenter",
        //       code: code,
        //       slideNumber: slideNumber + 1,
        //     }),
        //   );
        //   setSlideNumber((slideNumber) => slideNumber + 1);
        //   onNextSlide();
        //   setThreshold(false);
        // }

        // Positive direction
        if (data.angle > 2.5 && !triggerState.forward) {
          console.log("Trigger: NEXT slide");
          setTriggerState({ forward: true, backward: false });
          ws.send(
            JSON.stringify({
              event: "data",
              source: "presenter",
              code: code,
              slideNumber: slideNumber + 1,
            }),
          );
          setSlideNumber((n) => n + 1);
          onNextSlide();
        }

        // Negative direction
        else if (data.angle < -2.5 && !triggerState.backward) {
          console.log("Trigger: PREV slide");
          setTriggerState({ forward: false, backward: true });
          ws.send(
            JSON.stringify({
              event: "data",
              source: "presenter",
              code: code,
              slideNumber: Math.max(slideNumber - 1, 0),
            }),
          );
          setSlideNumber((n) => Math.max(n - 1, 0));
          onPrevSlide();
        }

        // Reset trigger state when angle returns to neutral
        else if (
          data.angle > -1 &&
          data.angle < 1 &&
          (triggerState.forward || triggerState.backward)
        ) {
          console.log("Reset trigger state");
          setTriggerState({ forward: false, backward: false });
        }

        // if (data.angle < -2.5) {
        //   console.log("above threshold -ve");
        //   setThreshold(true);
        // } else if (data.angle > -2.5 && data.angle < 0 && threshold) {
        //   console.log("switch prev");
        //   ws.send(
        //     JSON.stringify({
        //       event: "data",
        //       source: "presenter",
        //       code: code,
        //       slideNumber: Math.max(slideNumber - 1, 0),
        //     }),
        //   );
        //   setSlideNumber((slideNumber) => Math.max(slideNumber - 1, 0));
        //   onPrevSlide();
        //   setThreshold(false);
        // }
      } else if (data.event === "command") {
        if (data.change === "forward") {
          console.log("forward event");
          ws.send(
            JSON.stringify({
              event: "data",
              source: "presenter",
              code: code,
              slideNumber: slideNumber + 1,
            }),
          );
          setSlideNumber((slideNumber) => slideNumber + 1);
          onNextSlide();
        } else if (data.change === "backward") {
          console.log("back event");
          ws.send(
            JSON.stringify({
              event: "data",
              code: code,
              source: "presenter",
              slideNumber: Math.max(slideNumber - 1, 0),
            }),
          );
          setSlideNumber((slideNumber) => Math.max(slideNumber - 1, 0));
          onPrevSlide();
        }
      }
    };

    ws.onclose = () => {
      setIsReady(false);
      console.warn("WebSocket connection closed");
    };

    ws.onerror = (err) => {
      console.error("WebSocket error", err);
    };

    return () => {
      ws.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, onNextSlide, onPrevSlide]);

  return { angle, isReady, slideNumber };
}

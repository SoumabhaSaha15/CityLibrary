import React, { forwardRef } from "react";
import { useRipple } from "use-ripple-hook";

type RippleButtonProps = React.ComponentPropsWithoutRef<"button">;

const RippleButton = forwardRef<HTMLButtonElement, RippleButtonProps>(
  ({ children, onPointerDown, ...props }, forwardedRef) => {
    const [rippleRef, rippleHandler] = useRipple({
      color: "currentColor",
      timingFunction: "ease-in-out",
    });

    const setRef = (node: HTMLButtonElement | null) => {
      (rippleRef as React.RefObject<HTMLButtonElement | null>).current = node; // Attach the node to the ripple hook
      if (typeof forwardedRef === "function") {
        forwardedRef(node); // Forward the ref to the parent
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    };

    return (
      <button
        {...props}
        ref={setRef}
        onPointerDown={(e) => {
          rippleHandler(e);
          onPointerDown?.(e);
        }}
      >
        {children}
      </button>
    );
  },
);

RippleButton.displayName = "RippleButton";

export default RippleButton;

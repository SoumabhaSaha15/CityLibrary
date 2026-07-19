import React, { forwardRef, useCallback } from "react";
import { useRipple } from "use-ripple-hook";

type RippleButtonProps = React.ComponentPropsWithoutRef<"button">;

const RippleButton = forwardRef<HTMLButtonElement, RippleButtonProps>(
  ({ children, onPointerDown, ...props }, forwardedRef) => {
    // 1. Pass the generic to the hook if supported by your version
    const [rippleRef, rippleHandler] = useRipple<HTMLButtonElement>({
      color: "currentColor",
      timingFunction: "ease-in-out",
    });

    // 2. Wrap in useCallback so the ref doesn't bounce (detach/attach) on every render
    const mergedRef = useCallback(
      (node: HTMLButtonElement | null) => {
        // Safely update the hook's ref (cast to MutableRefObject to bypass TS readonly strictness)
        if (rippleRef) {
          (rippleRef as React.RefObject<HTMLButtonElement | null>).current =
            node;
        }

        // Forward the ref to the parent
        if (typeof forwardedRef === "function") {
          forwardedRef(node);
        } else if (forwardedRef) {
          forwardedRef.current = node;
        }
      },
      [rippleRef, forwardedRef],
    );

    return (
      <button
        {...props}
        ref={mergedRef}
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

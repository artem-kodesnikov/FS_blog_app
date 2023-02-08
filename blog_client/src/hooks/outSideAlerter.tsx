import React, { useRef, useEffect, ReactElement } from "react";
// import PropTypes from "prop-types";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref:any, action: () => void) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event:any) {
      if (ref.current && !ref.current.contains(event.target)) {
        alert("You clicked outside of me!");
        action();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

/**
 * Component that alerts if you click outside of it
 */
interface Props {
  props: ReactElement;
  action: () => void;
}
export const OutsideAlerter: React.FC<Props> = (props:any, action) => {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, action);
  return <div ref={wrapperRef}>{props.children}</div>;
};

// OutsideAlerter.propTypes = {
//   children: PropTypes.element.isRequired,
//   action: PropTypes.
// };

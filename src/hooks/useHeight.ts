import React, { Dispatch, useCallback, useEffect } from "react";
import useResize from "./useResize";

const useHeight = (
  ref: React.RefObject<HTMLElement>,
  dispatch: Dispatch<number>,
  payload = 0
) => {
  const getHeight = useCallback(() => {
    if (dispatch) {
      const lastHeight = ref.current!.getBoundingClientRect().height;
      dispatch(lastHeight + payload);
    }
  }, [ref, dispatch, payload]);

  useEffect(() => {
    getHeight();
  }, [getHeight]);

  useResize(getHeight);
};

export default useHeight;

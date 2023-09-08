"use client";

import { useEffect, useState } from "react";

const UseOrgin = () => {
  const [isMounted, setIsMounted] = useState(false);
  const orgin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return "";
  } else {
    return orgin;
  }
};

export default UseOrgin;

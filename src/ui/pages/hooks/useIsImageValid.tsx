import React from "react";

const useIsImageValid = (src: string) => {
  const [isValid, setIsValid] = React.useState<boolean>(false);

  const checkImage = React.useCallback(async () => {
    try {
      const response = await fetch(src, { method: "HEAD" });
      if (response.ok) {
        const contentType = response.headers.get("Content-Type");
        return !!contentType?.startsWith("image/");
      }
    } catch {
      return false;
    }
  }, [src]);

  React.useEffect(() => {
    checkImage().then((result) => setIsValid(result || false));
  }, [checkImage]);

  return !isValid;
};
export default useIsImageValid;

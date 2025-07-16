import { forwardRef } from "react";

const RoundInput = forwardRef(({
  onInputAction,
  onFocusAction,
  onKeyDownAction,
  type,
  maxLength,
  customStyles = "",
  disabled
}, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      disabled={disabled}
      maxLength={maxLength}
      onInput={(event) => {
        if (onInputAction) onInputAction(event);
      }}
      onFocus={(event) => {
        if (onFocusAction) onFocusAction(event);
      }}
      onKeyDown={(event) => {
        if (onKeyDownAction) onKeyDownAction(event);
      }}
      className={`appearance-none w-10 aspect-square outline-0 rounded-full bg-black text-white text-center border focus:border-white ${customStyles}`}
    />
  );
});

export default RoundInput;

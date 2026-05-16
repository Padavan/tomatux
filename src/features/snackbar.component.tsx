import * as React from "react";

export const Snackbar = (props: SnackbarProps) => {
  if (!props.show) {
    return null;
  }

  return (
    <div className="snackbar">
      <p>{props.message}</p>
    </div>
  );
};

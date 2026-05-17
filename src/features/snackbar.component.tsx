import * as React from "react";

type SnackbarProps = {
  show: boolean;
  message: string;
};

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

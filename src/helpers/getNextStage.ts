function getNextStage(stage: "pomodoro" | "pause"): "pomodoro" | "pause" {
  if (stage === "pomodoro") {
    return "pause";
  } else {
    return "pomodoro";
  }
}

export { getNextStage };

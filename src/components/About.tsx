import * as React from 'react';
import { VFC } from 'react';

export const About = (): VFC => {
  return (
    <section>
      <p>
        This is simple pomodoro timer using react+redux+react-router
      </p>
      <p>
        Source code is there: <a
          href="https://github.com/Padavan/tomatux"
          norefferer="true"
          target="_blank">
            github.com/Padavan/tomatux
        </a>
      </p>
    </section>
  );
}

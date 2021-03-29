import React, { useState, useEffect } from 'react';

import { stopwatch$, actions$ } from './observables/stopwatch.observables';
import { formatTime } from './utils/time.utils';
import './App.css';

export const App = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const sub = stopwatch$.subscribe(setTime);

    return () => sub.unsubscribe();
  }, []);

  return (
    <div className="screen">
      <div className="figure">
        <div className="watch">{formatTime(time)}</div>
        <div className="controls">
          <div className="btn" role="button" onClick={() => actions$.next('start')}>
            Start
          </div>
          <div className="btn" role="button" onClick={() => actions$.next('stop')}>
            Stop
          </div>
          <div className="btn" role="button" onClick={() => actions$.next('wait')}>
            Wait
          </div>
          <div className="btn" role="button" onClick={() => actions$.next('reset')}>
            Reset
          </div>
        </div>
      </div>
    </div>
  );
};

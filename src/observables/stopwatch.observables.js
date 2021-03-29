import { Subject, merge, interval } from 'rxjs';
import { filter, takeUntil, map, mergeMap, debounceTime, buffer, scan } from 'rxjs/operators';

export const actions$ = new Subject();

const wait$ = actions$.pipe(filter((action) => action === 'wait'));
const buffer$ = wait$.pipe(debounceTime(299));
const shouldWait$ = wait$.pipe(
  buffer(buffer$),
  map((list) => list.length),
  filter((x) => x === 2),
);

const stop$ = actions$.pipe(filter((action) => action === 'stop'));

const reset$ = actions$.pipe(filter((action) => action === 'reset'));

const start$ = actions$.pipe(filter((action) => action === 'start'));

export const stopwatch$ = merge(
  start$.pipe(
    mergeMap(() =>
      interval(1000).pipe(
        takeUntil(shouldWait$),
        takeUntil(stop$),
        map(() => 1),
      ),
    ),
  ),
  reset$.pipe(map(() => 0)),
  stop$.pipe(map(() => 0)),
).pipe(scan((acc, val) => (val === 0 ? 0 : acc + val)));

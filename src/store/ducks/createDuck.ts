type DuckAction<TPayload = unknown> = {
  type: string;
  payload?: TPayload;
};

type DuckHandlers<TState> = Record<
  string,
  (state: TState, action: DuckAction<unknown>) => TState
>;

export function createDuck(prefix: string) {
  const defineType = (type: string) => `${prefix}/${type}`;

  const createAction = <TPayload = void>(type: string) => {
    return (payload?: TPayload) =>
      (payload === undefined ? { type } : { type, payload }) as DuckAction<TPayload>;
  };

  const createReducer = <TState>(handlers: DuckHandlers<TState>, initialState: TState) => {
    return (state: TState = initialState, action: DuckAction<unknown>) => {
      const handler = handlers[action.type];
      return handler ? handler(state, action) : state;
    };
  };

  return { defineType, createAction, createReducer };
}

export type { DuckAction, DuckHandlers };

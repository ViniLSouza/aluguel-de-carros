export function createDuck(prefix: string) {
  const defineType = (type: string) => `${prefix}/${type}`;

  const createAction = (type: string) => {
    return (payload?: unknown) =>
      payload === undefined ? { type } : { type, payload };
  };

  const createReducer = (
    handlers: Record<string, (state: unknown, action: { type: string; payload?: unknown }) => unknown>,
    initialState: unknown,
  ) => {
    return (state = initialState, action: { type: string }) => {
      const handler = handlers[action.type];
      return handler ? handler(state, action) : state;
    };
  };

  return { defineType, createAction, createReducer };
}

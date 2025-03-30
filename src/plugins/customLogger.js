export function createCustomLogger(options) {
  const defaultOptions = {
    collapsed: true,
    logActions: true,
    logMutations: true,
    logState: false,
    logger: console,
    ...options,
  };

  return (store) => {
    if (defaultOptions.logMutations) {
      store.subscribe((mutation, state) => {
        if (defaultOptions.filter && !defaultOptions.filter(mutation, {}))
          return;

        const { type, payload } = mutation;
        const message = `%c mutation %c ${type}`;

        defaultOptions.logger.groupCollapsed?.(
          message,
          ...getStyles(defaultOptions.collapsed)
        );
        defaultOptions.logger.log(
          "%c payload",
          "color: #9E9E9E; font-weight: bold",
          payload
        );

        if (defaultOptions.logState) {
          defaultOptions.logger.log(
            "%c state",
            "color: #4CAF50; font-weight: bold",
            state
          );
        }

        defaultOptions.logger.groupEnd?.();
      });
    }

    if (defaultOptions.logActions) {
      store.subscribeAction({
        before: (action, state) => {
          if (defaultOptions.filter && !defaultOptions.filter({}, action))
            return;

          const { type, payload } = action;
          const message = `%c action %c ${type} %c @ ${new Date().toLocaleTimeString()}`;

          defaultOptions.logger.groupCollapsed?.(
            message,
            ...getStyles(defaultOptions.collapsed),
            "color: #666; font-weight: normal;"
          );
          defaultOptions.logger.log(
            "%c payload",
            "color: #9E9E9E; font-weight: bold",
            payload
          );

          if (defaultOptions.logState) {
            defaultOptions.logger.log(
              "%c current state",
              "color: #4CAF50; font-weight: bold",
              state
            );
          }
        },
        after: (action, state) => {
          defaultOptions.logger.log(
            "%c next state",
            "color: #4CAF50; font-weight: bold",
            state
          );
          defaultOptions.logger.groupEnd?.();
        },
      });
    }
  };
}

function getStyles(collapsed) {
  return [
    `color: ${collapsed ? "#999" : "#222"}; font-weight: bold`,
    "color: #03A9F4; font-weight: bold;",
  ];
}

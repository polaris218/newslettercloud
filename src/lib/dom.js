
/**
 * Collects recursively all actions from clicked element (event.target) to root element (the element which event listener is bind on )
 * Actions must be passed as 'data' attributes and must have at least 'data-action' attribute name.
 * All 'data' attributes from element are collected in one action.
 * @param {Dom Element} rootEl - element which element listener is bind to
 * @param {Dom Element} target - clicked element. It is parent of root element ot root element itself.
 */
export const collectActionsFromAttributes = (rootEl, target) => {
  const actions = [];
  const collect = (root, target) => {
    if (target.dataset.action) actions.push({...target.dataset, target});
    if (root !== target) collect(root, target.parentNode);
  };

  collect(rootEl, target);

  return actions;
};

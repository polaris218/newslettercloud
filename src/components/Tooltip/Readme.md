# Tooltip component

## Properties

- position:
  - TOP _default position_
  - LEFT
  - RIGHT
  - BOTTOM

- content:
  - HTML element
  - ReactJS component

  _Text nodes are not allowed. It must have at least `<span>` element_

## Example
```
import Tooltip, { TooltipPosition } from '../../Tooltip';

...

<Tooltip content="Text here." position={TooltipPosition.LEFT}>
```
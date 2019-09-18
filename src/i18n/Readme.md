# Internationalization

### Useful inks:
- https://github.com/yahoo/react-intl
- https://github.com/yahoo/react-intl/wiki

## How to Internationalize simple string
__1. Add translated messages in `{project}/src/i18n/en.js` and `{project}/src/i18n/sv.js` folder with corresponding `id`.__

```
// {project}/i18n/en.js

export default {
  'lists.addListBtn': 'Add list',
};


// {project}/i18n/sv.js

export default {
  'lists.addListBtn': 'Skapa ny lista'
};
```

__2. Use message by `id`:__

```
import { FormattedMessage } from 'react-intl';

...

<FormattedMessage id="lists.addListBtn" />
```

__Result is:__
- en -> Add list
- sv -> Skapa ny lista

## How to use with variables

__1. Add message with placeholder__
```
// {project}/i18n/en.js

export default {
  'messages.count': 'You have {msgCount} messages!'
}
```

__2. And use in component__
```
  const myVar = 7;

  ...

  <FormattedMessage 
    id="messages.count"
    variables={{msgCount: myVar}}
  />
```

__Result is:__
- en -> You have 7 messages!
- sv -> ...

## How to use with plurals

__1. Add message with variable (e.g. msgCount) end type `plural`__
```
// {project}/i18n/en.js

export default {
  'messages.count': {msgCount, plural,
    =0 'You do not have any messages!'
    one 'You have one message!'
    other 'You have {msgCount} messages!'
  }
}
```

__2. And use in component__
```
  const myVar = 7;

  ...

  <FormattedMessage 
    id="messages.count"
    variables={{msgCount: myVar}}
  />
```

__Result is:__
- en ->
  - myVar === 0 -> You do not have any messages!
  - myVar === 1 -> You have one message!
  - myVar === 14 -> You have 14 messages!

- sv -> 
  - myVar === 0 -> ...
  - myVar === 1 -> ...
  - myVar === 14 ->...
  
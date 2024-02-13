# Watch

A developer friendly utility and stylish console to watch data/variable runtime to debug React Application fast.

## Install

> npm i @xkeshav/watch

## Usage

### <Watch>

use `<Watch>` in JSX/TSX code to see data in console

it accepts 2 optional props name as `from` and `kind`

possible value of `kind` is `log | table | dir | warn | error | info`

#### Example

```tsx
import { Watch } from "@xkeshav/watch";
import { useState } from "react";

export const Demo = () => {
  const [date, setDate] = useState<Date>(new Date());

  const setNextHour = () => {
    const nextHour = date.getHours() + 1;
    setDate(new Date(new Date().setHours(nextHour)));
  };

  return (
    <>
      <h1>Demo</h1>
      <button onClick={setNextHour}>Next</button>
      <p>See date in console:</p> <Watch>{{ date }}</Watch>
      <Watch from="Demo Component" kind="dir">
        {{ date }}
      </Watch>
    </>
  );
};
```

#### Output

![Watch Demo](https://github.com/xkeshav/watch/blob/main/assets/images/Watch_demo.png)

### watchThis()

use `watchThis()` method outside of jsx and it print in console.

first parameter will be what variable we need to debug
second parameter will be kind (optional), possible value is same as `kind`
third parameter will be additional info

```js
watchThis(whatToDebug);
watchThis(variable);
watchThis(whatToDebug, "info", "from filename");
watchThis(whatToDebug, undefined, filename);
```

### WatchJson

This is another method to see output within the page in a panel.

use `<WatchJson>` in following format. and we can write as many as props

we can pass complete object and it will pretty print on the page

it have show and hide panel using show/hide button


```tsx
const WatchDemo = () => {
  const data = { name: "Keshav", country: "India", year: "2024" };
  return (<WatchJson what="Watch" data={data} date={new Date()} />;
};
```

#### Output as

![WatchJson Demo](https://github.com/xkeshav/watch/blob/main/assets/images/watchJson_demo.png)

`what` is special prop which is used at title of the panel.

## License

[**MIT**](https://github.com/xkeshav/watch/blob/main/LICENSE)

## Author

- [_@xkeshav_](https://twitter.com/xkeshav)

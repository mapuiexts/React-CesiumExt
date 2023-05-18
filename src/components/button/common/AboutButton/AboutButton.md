Click in the _About Button_ to see the result:

```js
import { useMemo } from 'react';
import AboutButton from './AboutButton';

const AboutButtonExample = () => {
    const content = useMemo(() => {
        return(
            <div>
                <h3>My About Button Example</h3>
                <p style={{color:"cyan"}}>Please, check more in the documentation about this amazing library!!!</p>
            </div>
        );
    });
    return(
        <AboutButton type="primary" content={content}>My About</AboutButton>
    );
}

<AboutButtonExample/>
```
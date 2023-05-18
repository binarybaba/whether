# Handelsweather

An app which let's you see the weather of any location on the planet.
> Powered by Tomorrow.io and Maps.co


### Run locally
- Get your Api key from [Tomorrow.io](https://www.tomorrow.io/)
- Install [pnpm](https://pnpm.io/) (yarn/npm might work)
- clone this repo
- copy the `.env.template` into a `.env` file and paste your API key
- `pnpm start` (or `yarn start`/ `npm run start`)

> Be mindful of developing in watch mode.
> Tomorrow.io is very sensitive to rate-limits. I know how I walked on eggshells to make this app.

### Tests 
Not the best in class but there are minimal tests added which I thknk should be there at the least

### See live
Head over to [this link to see](https://whether-ten.vercel.app) this app live in action :)


-----
## Approach, comments and opinions

### On choosing web services

OpenAPI needed my card details and I didn't want to provide it.

Hence, I had a hard time figuring out which webservice would be optimum.

At first, I thought a single service would be enough but as soon as I started thinking of
adding a search feature, I had to dig in more.

Hence, I landed on 
 - Maps.co (free geocode and reverse lookup)
 - Tomorrow.io

### On Architecture

##### Smart components aka features
Since every react component _is_ infact a component, I used to call store-ful components as 
smart components or sometimes containers (and store-less components as dumb components).

This went on for a couple of years until I decided to stop this pattern and started
dividing components based on OKRs and KPIs:
 - Smart components became `features`
 - Dumb components became `components`
 - Container keyword is now an html structure specific


##### Services and Providers
When fetching data, I like to divide things into 2 layers:
- a service
- a provider

Ideally, I prefer reverse dependency and no source code dependency. Consider:
```
// weatherProvider.ts
const getWeather = async (getter: () => Promise<WeatherResponse>) => {
 await getter(rest)
}

// Weather.tsx
...

const weather = useQuery(
queryKey, () => getWeather(() => fetchWeatherService(weatherParams)))
)
..

// weatherProvider.spec.js
import { getWeather } from 'src/providers'
...
const mockResponse = await getWeather(() => mockFetcher())
```

Advantages:
 - We can now unit test the provider while mocking the service without spying
 - It becomes easy to switch services
 - Scales :tm:
 
This is inspired from [Uncle Bob's clean architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

I didn't prefer doing it in this assignment since I thought it might be an overkill. But now I regret it :sob:

#### Reinventing the wheel and staying lazy

If it can be reused, reuse it. If it is a part of a larger ecosystem, no need to test.

#### State management
I use context whenever things are small.
But I do not like that it doesn't have out of the box middleware support that Redux has.
I usually put analytics in middlewares.


### On Regrets and do-overs

If I had more time, these are the things I would have done differently:

#### [Vite](https://vitejs.dev/) 
I spent so much time scaffolding this CRA project. Vite would have helped. Test support out of the box and it's pretty fast because of the rust compiler.

#### TDD?
Not sure if that's what's called TDD but I usually write test specs and then break them and then start 
coding things while making the tests work.
It's been a while since I did that (I miss it).

#### Cypress
If my axios mocking wasn't so flaky, I would have put in fixtures and did some e2e tests.

#### Toasts
I really wanted to implement some toast notifications for invalid coordinates and edge cases
but i decided to implement favoriting feature and search instead.

#### Commit messages
My commit messages are really long. I follow [commitizen](https://bitspeicher.blog/how-to-be-a-good-commitizen/) and have also
made a [Raycast](https://www.raycast.com/) extension which helps me write it. 
At the end of making a feature, I would have squashed things into a single one.

But since this is an assignment, I didn't.

Thank you for reading this long essay.
# nutcache-challenge-IkaroSouza

## Technical details

A detailed explanation about some of the choices I made while building the project

### The API

The API was built with [NestJS](https://nestjs.com) because it is the most elegant backend framework in the Javascript ecosystem. Its architecture is second to no other and it helps in everyway possible in quickly implementing an API that follows SOLID principles and design patterns like Inversion of Dependency and Decorator(heavy use of it).
To exemplify: To declare which classes will be instantiated by the DI Container you just need to put the class in the module's providers array and mark such classes as injectable and you do this using the @Injectable decorator on the class.
This example shows how, by using the decorator design pattern, Nest obeys the Open-Closed Principle because you don't need to imperatively inject classes in the DI - as you need to in C# for example - and avoid issues like the one the Liskov Substitution Principal aims to solve, with just 2 lines of code.

![nest module declaration](readme_assets%5Cmodule.png)
![nest injectable class](readme_assets%5Cservice.png)

### The web application

There are 4 main aspects to this web app for me to explain so I'm going to list them.

- The build tool: I chose [Vite](https://vitejs.com) over [CRA](https://create-react-app.dev/) because of speed. Comparing Vite to CRA is like that story of [the hare and the tortoise](https://read.gov/aesop/025.html), except in this case the hare wins in the end.
  Because of that the development experience is much better since instead of waiting 5 seconds to perform a hot reload you'll only need to wait 2, making your work way more productive for free.
- Styling: I'm using [Tailwind CSS](https://tailwindcss.com/) because it works best with frameworks like React when compared to Bootstrap for example because it only gives you a bunch of css classes, you have build the functionality of each component yourself. It allowed me to follow the instruction to avoid using component libraries without compromising on the visual quality of the application.
- State management: I chose NOT to use [redux](https://redux.js.org/) and instead use a combination of the hooks useContext and useReducer together with the library [react-query](https://react-query.tanstack.com/). I did this because in my experience Redux brought more problems than it solved, I just kept using it because of the tooling, but react-query has a very good tooling as well and I can implement what Redux does with the useContext and useReducer hooks. Also react-query is helps you easily (and locally) react to state changes in the communication with the back-end, keep the data on the app in sync with the back-end (with what it calls mutations), caching responses, etc.
- Structure: Inspired by Nest, I chose to build most of the app inside a modules folder so the application becomes more modular, making it easier to work with micro-frontends to name an advantage of this approach. Not using a global state management solution like Redux also helps with it since each piece of what would compose an application state is isolated and being managed closer to the components that need it.

## Running the project

You just need to do 2 things before building and running the application.

1. Create an API key: The back-end uses the services of [Crud crud](https://crudcrud.com) to mock a database. You just need to click the link, grab the url showed in the website and paste it to the `API_URL` variable in the .env file in the api folder. (Optional) You can change the port used by the back-end too, just set the desired port number on the `PORT` variable in the .env file, but you'll need to change it in the `VITE_API_URL` in the .env file in the app folder as well.
2. With the api key and port set, open a terminal in the app folder, another one in the api folder and on both type in the command `yarn` or `npm install`.

You can run either the debug builds or the production builds:

- Debug: Open a terminal in the app folder and type in the command `yarn dev` or `npm run dev` then press F5, it will start the build of the back-end and attach the debuggers for both the front and back-end processes.
- Production: Open a terminal in the api folder and type in the command `yarn build; yarn start:prod` or `npm run build; npm run start:prod`.
  Open a terminal in the app folder and type in the command `yarn build; yarn preview` or `npm run build; npm run preview`.

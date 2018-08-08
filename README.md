# Requirements

The application should have a form with the following fields:

- First name
- Last name
- Age
- Score (out of 100)
- Button to add an entry to a list.

The list should appear on the same screen and be sorted by one of it's columns whenever an entry is added. There should be a UI element to select the sort column and another UI element to set ascending or descending.

## Notes

- This application was created using [knockout-es6-components-webpack-boilerplate](https://github.com/abdennour/knockout-es6-components-webpack-boilerplate)
- The application is continuously integrated using [Netlify](https://www.netlify.com/).
- The live version can be found [here](https://peaceful-ritchie-153a6c.netlify.com/).

## Implementation assumptions and choices

- We are using a list to display the values because it was requested, some other elements may be better fit, like cards or a responsive table.
- Design is responsive but it does not look good, we assume that the important part is the app itself.
- Tryied to concentrate the state in one place and making most of the components 'dumb' components with the exception of the application itself.

# Prerequiestes

- Node 8.11.1 LTS

# Getting Started

**Install dependencies**

```
npm install
```

**Start application**

```
npm start
```

**Build application**

```
npm run build
```

The output is `dist/` directory

**Run unit-tests**

```
npm test
```

```
npm run test:watch
```

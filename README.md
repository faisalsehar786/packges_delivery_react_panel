# HmHy admin panel

This repository is for the admin dashboard, used internally in HmHy. It uses the same backend as the org dashboard, allowing us to view, modify, and delete any production data. All PRs should target the dev branch.

## Required extensions

[Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

[Eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

## Sites

[Production](https://admin.stotte.no/dashboard)

[Test](https://testadmin.stotte.no/dashboard)

## Local Development Env variables

```
PORT=3012
REACT_APP_BACKEND_API_URL=http://localhost:8002/api/v1
REACT_APP_ENV=development
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
Alternativly, you can use the included debugger in vscode to use breakpoints

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn format`

Runs prettier on all files and fixes them

### `yarn pretty`

Runs prettier on all files without fixing them

### `yarn lint`

Runs eslint on all files and fixes the issues it can fix

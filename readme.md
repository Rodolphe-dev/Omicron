# Omicron CMS V0.2

## Description

Omicron is a little CMS made with NX, Angular, Symfony, API Platform, Tailwind CSS and DaisyUI.

This is open source and free to use.

## How to install ?

We use monorepo NX and this come with a new CLI => https://nx.dev/

Serve the apps:

```
nx serve front
nx serve back
nx serve api
```

Stop the apps:

```
nx stop api
```

Build the apps:

```
nx build front
nx build back
nx build api
```

Environments need to be rewrite with the new path in the angular apps, the path in apps front and back is ```src/environments``` for production

A proxy is used for local machine in root of each angular apps ```src/proxy.conf.json``` and already configured to be used with nx serve command

A fixture need to be executed for create the data needed to be working on both local and online => ```php bin/console doctrine:fixtures:load``` (This will be auto in the futur)

Admin panel

```
_username:_ admin
_password:_ password
```

This must be change for your safety

every thing else is like a regular symfony app and angular app

## TODO

[ ] Fix ESLint error and warning inside all httpRequest and service

[ ] Clean the code

[ ] Make all the tests

[ ] Configure CI workflow

[ ] Make a simple dashboard

This list will grow up soon ...
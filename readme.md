# Omicron CMS V0.2.5

## Description

Omicron is a CMS made with NX, Angular, Symfony, API Platform, Tailwind CSS and DaisyUI.

This is open source and free to use.

## How to install ?

We use monorepo NX and this come with a new CLI => https://nx.dev/

Serve the apps:

```
nx serve front --ssl true
nx serve back --ssl true
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

Fixture need to be executed for create the data needed to be working on both local and online => ```php bin/console doctrine:fixtures:load``` (This will be auto in the futur)

We used JWT token for authentification so you gonna need to generate your key (This will be auto in the futur)


Admin panel

```
_username:_ admin
_password:_ password
```

This must be change for your safety

every thing else is like a regular symfony app and angular app

## TODO

[ ] Refactor items logic in navbar

[ ] Refactor items logic in sidebar

[ ] Make all the tests

[ ] Add block doc

[ ] Configure CI workflow

[ ] Create a logo

[ ] Make a simple dashboard

[ ] UI Component for page

[ ] Theme system for front and back

[ ] Account system for front
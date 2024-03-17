# Omicron CMS v1.0.0

## Description

Omicron is a little CMS made with NX, Angular, Symfony, API Platform, Tailwind CSS and DaisyUI.
This is open source and free to use.

## How to install ?

We use monorepo NX and this come with a new CLI => https://nx.dev/
You need to build the angular apps with NX
Environments need to be rewrite with the new path in the angular apps, the path in apps front and back is ```src/environments```

A fixture need to be execute for create the data needed to be working => ```doctrine:fixtures:load```

Admin panel

_ _username:_ _ admin

_ _password:_ _ password

This must be change for your safety

every thing else is like a regular symfony app and angular app

## Important Note

Only the first navbar and first footer will work for the moment, you will need to only have one

## TODO

[ ] Make 404 error page for back and front

[ ] Add a system for navbar, sidebar, footer to active only one like a button active, disabled in admin panel

[ ] Add sidebar in front or hide it if none are active

[ ] Make the test

This list will grow up soon ...
# How to install
As ``prettier`` is part of the dependencies, it can be automaticly dowloaded with
```
npm install
```
Execute it in the root folder (above src/).

# How to use 
Use the following commands to check or rewrite/reformat paths.
```
    npx prettier --check PATH
    npx prettier --write PATH
```
Execute it in the root or in the /src/digitalIdentity-frontend folder. Otherwise it will not 

# Format on pre-commit/pre-push

Sadly, this stetting can not be setup by one person and distributed via git/GitHub. You can either modify git hooks on your own or you can use a package like ``husky``. Both will modify/adjust files within the .git folder which is and should not tracked in the Git Hub.

# Install on your editor

Read [this](https://prettier.io/docs/en/editors.html).
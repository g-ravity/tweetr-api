# Tweetr API

Node &amp; GraphQL API for a twitter clone, built for a hackathon assignment

**Note** : This project requires Node **v12**. There is a bug in apollo-server which runs an infinite loop in multi-part file upload in latest Node version. Check this [thread](https://github.com/apollographql/apollo-server/issues/3508) to stay updated.

### If you have another version of Node installed, follow the steps below:

- Download and install a software called **nvm**. It's available for Mac/Linux [here](https://github.com/nvm-sh/nvm/tags) and for Windows [here](https://github.com/coreybutler/nvm-windows/tags)
- Use `nvm list` to check out all the node versions installed in your system.
- `nvm install [version] [arch]` to install desired Node.js version
- `nvm use [version] [arch]` to use the installed Node.js version
- Finally, you can check the the Node version in your system using `node -v`

### Steps to run the project

- Inside the project directory, run `yarn` to install all the dependencies
- Add a .env file in the root directory with MongoDB credentials, Firebase storage credentials & JWT Secret
- Inside the src directory, add a serviceAccountKey.json file with firebase service account credentials
- Now run `yarn dev` at the root directory to start the project

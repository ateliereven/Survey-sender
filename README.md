# MySender App

A RESTful MERN web app that allows business users to create and send feedback-surveys to their clients, and receive data on their responses. Featuring OAuth (JWT, Google), payments (Stripe) and emailing services (Sendgrid). Frontend written with React.js, using React-router, Redux, Redux-form, Charts.js, Materialize CSS. Backend written in JavaScript, hosted in Node.js and express. Data is stored and managed in MongoDB via Mongoose.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### View [Deployment](https://quiet-bayou-08292.herokuapp.com/) 

![Alt text](client/src/img/my-sender.png?raw=true "MySender Home Page")

## Available Scripts & Prerequisites:

1. In the root directory, install package dependencies:
    ### `npm i`

2. The app requires API keys for the following services:

    Google Auth: [https://console.cloud.google.com]
  
    Stripe: [https://www.stripe.com]
  
    Sendgrid: [https://signup.sendgrid.com]
  
    MongoDB Atlas: [https://www.mongodb.com/cloud/atlas]

    **Insert required keys to the dev.js file in the config directory**

#

In the root directory, to run both server and react app:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.


To run the server only:

### `npm run server`


In the root directory, to run the client only:
### `npm run client`
Alternatively, in the client directory:
### `npm run start`

In the client directory, you can also run:

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the React documentation section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments. 



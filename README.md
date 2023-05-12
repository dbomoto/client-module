# CLIENT MODULE OF CHAT APP

### REQUIREMENTS:

- Install NodeJS Version 14 downloaded here: [https://nodejs.org/en/blog/release/v14.17.3](https://nodejs.org/en/blog/release/v14.17.3)

- Editor of your choice.

- Updated Chrome browser. This app was tested on ***Version 113.0.5672.93 (Official Build) (64-bit)***.

### INSTALLATION INSTRUCTIONS:

- Download the ***client-module*** on your machine.

- Add the environment variables (.env file)
    - `REACT_APP_SERVER_URL=The URL of the server module` e.g. http://localhost:4000
    - `PORT=Your prefered port` 
        - e.g. 5000
        - Note: This variable only works for development.

- Before running the app, make sure the server is already running and connected to the database.

- Two ways to run the app.
    1. Development build:
        - Open the app on your editor
        - Install all the dependencies. Type `npm install` on the terminal.
        - Type `npm run start` on the terminal. It will run on the port you declared in the .env file.
        - The app should open directly on your default browser.
    2. Production build:
        - Open the app on your editor
        - Install all the dependencies. Type `npm install` on the terminal.
        - Type `serve -s build` on the terminal. This will serve your app on port ***3000*** by default.
        - Open the app in your browser on `http://localhost:3000`

### REFERENCES USED IN BUILDING THE APP:

- https://stackabuse.com/handling-cors-with-node-js/
- https://reactrouter.com/en/main
- https://www.w3schools.com/default.asp
- https://expressjs.com/
- https://axios-http.com/docs/intro
- https://ui.dev/react-router-pass-props-to-components
- https://dirask.com/posts/Node-js-atob-btoa-functions-equivalents-1Aqb51
- https://stackoverflow.com/questions/68707553/uncaught-referenceerror-buffer-is-not-defined
- https://www.edureka.co/community/71981/delete-localstorage-item-when-the-browser-window-tab-closed#:~:text=onbeforeunload%20%3D%20function()%20%7B%20localStorage.,the%20close%20window%2Ftab%20action.
- https://stackoverflow.com/questions/37959945/how-to-destroy-jwt-tokens-on-logout
- https://morioh.com/p/e0d460ace6fa
- https://stackoverflow.com/questions/54858622/sweet-alert-2-link-in-confirmbuttontext-button
- https://medium.com/weekly-webtips/how-to-add-an-emoji-picker-to-an-input-field-in-react-app-d41a2966fcc1
- https://stackoverflow.com/questions/62795299/join-multiple-rooms-at-once-socket-io
- https://github.com/ankitkarna99/chat-cosey-back
- https://ui.dev/react-router-pass-props-to-link
- https://stackoverflow.com/questions/44617825/passing-headers-with-axios-post-request
- https://axios-http.com/docs/post_example
- https://stackoverflow.com/questions/8303900/mongodb-mongoose-findmany-find-all-documents-with-ids-listed-in-array
- https://stackoverflow.com/questions/26838965/sweet-alert-display-html-code-in-text
- https://upmostly.com/tutorials/how-to-use-environment-variables-in-reactjs-applications
- https://www.copycat.dev/blog/reactjs-build-production/
- https://www.markdownguide.org/basic-syntax/#emphasis

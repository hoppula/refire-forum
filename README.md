# refire-forum

Serverless discussion forum built with React, Redux and Firebase using [refire](https://github.com/hoppula/refire) and [refire-app](https://github.com/hoppula/refire-app).

Base UI components are from excellent [Elemental UI](http://elemental-ui.com/).

## Live demo

[https://refire.firebaseapp.com](https://refire.firebaseapp.com)

## Features

* Categories, boards and threads
* Paging for boards and threads
* Quoting when replying to posts
* Thread and Post previews
* Markdown support
* Emoji support using `:emoji:` syntax :fire:
* User profile pages
* Login with Google account
* Admin tools (delete threads & single posts, lock/unlock threads)
* CSS-in-JS styled components, fully themeable
* Dark & light color themes
* Upvoting single posts

## Roadmap

* Allowing boards and threads to be bookmarked properly
* Search using redux-search
* Image attachment upload to Firebase
* More social logins (Facebook, Github & Twitter)
* Allowing users to edit their own thread titles and posts
* Single post linking
* Show list of available emojis
* Sticky threads
* Thread and post tagging
* Notifications
* Reactions to posts with emojis
* Improved admin section
* Moderating
* User editable theme

## Deploying your own instance

1. Create your new app in [Firebase dashboard](https://console.firebase.google.com/)

2. Copy and paste `apiKey` from your Firebase app console's `Overview > Add Firebase to your web app` to `src/config.js`

3. Enable `Google` Authentication in your Firebase app console's `Auth > Sign-in method` settings

4. Change `projects.default` value to your app name in `.firebaserc`

5. Run `npm install` and `npm run build`

6. Run `npm run login` to login to Firebase

7. Run `npm run bootstrap` to copy the initial data structure to Firebase

8. Run `npm run deploy` to deploy the app and security rules to Firebase

## Running locally

`npm start` will start the development server on `localhost:4000`

## Adding admin users

Create `adminUsers` path in your Firebase and set your admin user's `uid` as key and `true` as value:

```
"adminUsers": {
  "google:123456789": true
}
```

## Customizing settings

You can edit default paging settings by changing `settings/BOARD_PAGE_SIZE`, `settings/THREAD_PAGE_SIZE` and `settings/THREAD_PAGE_LIMIT`.

You can configure date format by changing `settings/DATE_FORMAT`.

## Custom forum name

Export `siteName` in `./src/config.js`.

```js
export const siteName = "My forum"
```

## Security rules

Firebase security rules are defined in `security-rules.bolt`.

Use `npm run build:rules` to generate `security-rules.json` after making changes.

Use `npm run deploy:rules` to deploy security rules.

## License

MIT

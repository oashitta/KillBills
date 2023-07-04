# KillBills
KillBills is a full stack application using the PERN stack that aims to solve the problem of forgetting or missing bill payments.

## Video
https://github.com/oashitta/KillBills/assets/29328364/ce153b89-d70e-4713-9fcf-582127db4b60

## Screenshots
!["screenshot of Landing page"](https://github.com/oashitta/KillBills/blob/feature/readme.md/docs/landing-page.png?raw=true)
!["screenshot of Main page"](https://github.com/oashitta/KillBills/blob/feature/readme.md/docs/main-page.png?raw=true)
!["screenshot of Dark mode"](https://github.com/oashitta/KillBills/blob/master/docs/dark-mode.png?raw=true)
!["screenshot of Insights page"](https://github.com/oashitta/KillBills/blob/master/docs/insights-page.png?raw=true)
!["screenshot of Add bill modal"](https://github.com/oashitta/KillBills/blob/feature/readme.md/docs/addbill-modal.png?raw=true)
!["screenshot of Add payee modal"](https://github.com/oashitta/KillBills/blob/feature/readme.md/docs/addpayee-modal.png?raw=true)
!["screenshot of Edit bill modal"](https://github.com/oashitta/KillBills/blob/feature/readme.md/docs/editbill-modal.png?raw=true)

## Dependencies
- React
- React-dom
- React-router-dom
- React-scripts
- Auth0
- Material-react-table
- React-chartjs-2
- React-toastify
- React-toggle-dark-mode
- Tailwindcss
- Axios
- Node.js
- Express
- Express-oauth2-jwt-bearer
- Cors
- Dotenv
- PG
- Dayjs

## Getting Started
1. Clone repo from Github
2. Install dependencies with `npm install` in each respective `/client` and `/server` folder
3. Create a new account at https://www.auth0.com
4. Copy `.env.example` in `/server` to `.env` and edit it with your database and Auth0 details
5. Run `npm run db:reset` in `/server` to create, load and seed database
6. Copy `.env.example` in `/client` to `.env` and edit it with your Auth0 details
7. Run `npm run local` in `/server` to run the backend Express server
8. Run `npm start` in `/client` to start the frontend webpack development server
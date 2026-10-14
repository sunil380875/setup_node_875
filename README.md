# InsuredMine Backend Service

Node.js backend for managing insurance policy data. It supports CSV uploads, policy search, data aggregation, scheduled posts, and CPU monitoring.

## Features

* Upload insurance data from CSV files.
* Process large CSV files using Node.js Worker Threads.
* Store insurance data in MongoDB.
* Search policies by user name.
* Get policy summary for users using MongoDB aggregation.
* Schedule posts/messages using Agenda.
* Monitor CPU usage and restart the server when CPU stays above 70%.
* Helmet for basic security headers.
* CORS support.
* Swagger API documentation.
* Dynamic loading of routes from `src/routes`.

## Tech Used

* Node.js
* Express.js
* MongoDB
* Mongoose
* Agenda
* Worker Threads
* Jest
* Swagger
* Helmet

## Environment Setup

Create `.env.development` in the project root.

```env
PORT=4000
NODE_ENV=development
SWAGGER_ENABLED=true
MONGO_URI=mongodb://localhost:27017/insuredmine_dev
CORS_ORIGIN=*
```

## Installation

Install the dependencies:

```bash
npm install
```

Make sure MongoDB is running.

Default database:

```text
mongodb://localhost:27017/insuredmine_dev
```

## Run the Project

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

## Run Tests

The project uses Jest with ES Modules.

```bash
npm test
```

Tests cover:

* CSV upload validation
* Invalid file types
* User and policy search
* Policy aggregation
* Post scheduling
* Past date validation
* CPU spike endpoint
* Routes and 404 handling

## Swagger

After starting the server, open:

```text
http://localhost:4000/api-docs
```

## API Endpoints

| Method | Endpoint                            | Description                       |
| ------ | ----------------------------------- | --------------------------------- |
| POST   | `/api/v1/upload`                    | Upload CSV insurance data         |
| GET    | `/api/v1/users/search-policy`       | Search policies by first name     |
| GET    | `/api/v1/users/aggregated-policies` | Get policy summary by user        |
| POST   | `/api/v1/post/schedule`             | Schedule a post/message           |
| GET    | `/api/v1/post`                      | Get scheduled and published posts |
| GET    | `/api/v1/test/cpu-spike`            | Test CPU monitoring               |

## CSV Upload

CSV files are processed using Worker Threads so that large file processing does not block the main Node.js process.

The data is stored in separate collections such as:

* User
* Agent
* UserAccount
* LOB
* Policy

## Scheduled Posts

Posts can be scheduled by providing a day and time.

Example:

```text
day: 2026-08-30
time: 14:30
message: Meeting at 2:30 PM
```

Agenda handles the scheduled job and inserts the post into MongoDB at the specified time.

## CPU Monitoring

The server checks CPU usage every 3 seconds.

Current settings:

* CPU limit: 70%
* Check interval: 3 seconds
* Consecutive checks: 3

If CPU usage stays above 70% for 3 checks, the application starts a graceful shutdown.

In development, nodemon detects the process exit and starts the server again.

### Test CPU Monitoring

You can use the test endpoint:

```bash
curl "http://localhost:4000/api/v1/test/cpu-spike?duration=10"
```

This creates CPU load using Worker Threads and can be used to test the CPU monitoring logic.

## Project Structure

```text
src/
├── routes/
├── workers/
│   └── uploadWorker.js
├── utils/
│   └── cpuMonitor.js
├── modules/
└── app.js
```

The routes inside `src/routes` are loaded automatically when the application starts.

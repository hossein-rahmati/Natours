# README (Demo)

#Natours

## Overview

This Node.js backend API powers a tour website, offering endpoints for managing tours, and user data. It serves as the application's core, built with Express.js for routing, MongoDB for data storage, and Mongoose for database interactions.

## Prerequisites

- Node.js and npm (or yarn) installed
- MongoDB Atlas account (or a local MongoDB instance)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/hossein-rahmati/Natours.git
```

2. Navigate to the project directory:

```bash
cd natours
```

3. Install dependencies:

```bash
npm install
```

## API Endpoints

### tours

- GET /api/v1/tours: Retrieve all tours.

response:

```bash
JSON
[
  {
    "id": "669169d400736a1f840a8f95",
    "name": "The Forest Hiker",
    "price": 397,
    // ... other tour properties
  },
  // ... other tours
]
```

- GET /api/v1/tours/:id: Fetch a specific tour by ID.

resopne:

```bash
JSON
{
  "id": "669169d400736a1f840a8f95",
  "name": "The Forest Hiker",
  "price": 397,
  // ... other tour properties
}
```

- POST /api/v1/tours: Create a new tour.

response:

```bash
JSON
{
  "status": "success",
  "data": {
    "tour": {
      "id": "64f1b27c7d4b723c67234568",
      "name": "New Tour",
      // ... other tour properties
    }
  }
}
```

- PATCH /api/v1/tours/:id: Update a specific tour.

response:

```bash
{
  "status": "success",
  "data": {
    "tour": {
      "id": "64f1b27c7d4b723c67234568",
      "name": "The Forest Hiker",
      "price": 400,
      // ... other tour properties
    }
  }
}
```

- DELETE /api/v1/tours/:id: Delete a specific tour.

response:

```bash
JSON
{
  "status": "success",
  "data": null
}
```

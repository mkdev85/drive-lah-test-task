# Drivelah Test App

## Table of Contents
- [About](#about)
- [Project Setup](#project-setup)
- [Libraries Used](#libraries)
- [Code Style](#code-style)
- [App flow](#app-flow)
- [Technical point and assumptions](#technical-points-and-assumptions)

## About

In this app, we have designed UI screens and implemented the functionalities accordingly as per the below design links:
- https://xd.adobe.com/view/a713682f-3952-44fd-9785-a1ab8267d313-f240/screen/ee444f93-dbd7-4d95-ae53-9b2a9f36dbcf/
- https://xd.adobe.com/view/0e1ef7ed-0d67-4508-8565-bdc247bc3bad-5b4d/screen/f722c5b0-37e7-4eca-92c4-8b801c22acba/

This App is responsive. 

Deployed App URL: 

## Project Setup

- `npm i`: For installing the dependencies.
- `npm run dev`: To start the project in development environment. 
- `npm run test`: To run all the test cases.

## Libraries Used

- `Vite`: For setting up and bundling the React project from scratch. It provides fast 
   builds and hot module replacement.
- `Redux`: For state management, helping to manage application-level state in a predictable way.
- `Redux-Saga`: As middleware for Redux, handling side effects like asynchronous 
   actions in a more readable and testable way.
- `Sass`: To configure the preprocessor for more advanced styling features like variables and nesting.
- `TypeScript`: For static typing in JavaScript, improving code quality and providing better development experience.
-  `React Router DOM`: For handling routing in the React application, allowing for navigation 
    between different components and views.
-  `ESLint, Prettier, and Husky`: To maintain consistent code style and enforce best practices, 
   with linting, formatting, and pre-commit hooks.
- `@testing-library/react and Jest`: For writing unit and integration test cases, ensuring 
   code quality and reliability.   

## Code Style

This project follows consistent code style guidelines enforced by the following tools:

- Prettier: For code formatting.
- ESLint: For linting JavaScript and TypeScript code.
- Husky: For running linting and formatting checks before each commit.

## App flow:

This is a Single Page Application (SPA) with routing implemented for all the following options:

- Location
- About
- Features
- Rules
- Pricing
- Promotion
- Pictures
- Insurance
- Subscription
- Device
- Early Access

Currently, all options except Subscription and Device are marked as coming soon, as these two options are 
within the scope of this task.

All options are initially set as `completed`, indicated by a tick mark, except for the `Subscription` and `Device` options.

### Device option

- The `Device` section includes the following:
  - There are 4 fields: `device-1`, `device-2`, `device-3`, and `device-4`.
  - The form expects inputs as per the design specifications.
  - The `Serial Number` field is required and is only visible when the user selects the "Bring your own device" option.
  - There is also an option to upload an image.
  - `All fields are optional` except for the `Serial Number` field, as per the latest Adobe XD design.
  - All device details are saved when the user clicks on the `Next` button.
  - Details are persistent using `local storage`, so the submitted details remain even after refreshing the page.

### Subscription Option

- The Subscription section includes:
  - All fields are displayed as specified in the Adobe XD design.
  - Only valid details are saved to local storage when the user clicks on the Next button.
  - Like the Device section, all submitted details remain persistent and are visible after a page refresh.


### Validations and Error Handling

- Validations have been implemented for both the Device and Subscription sections.
- Error messages are displayed appropriately based on validation results.


## Technical points

- We are using Redux and Redux-Saga for centralized store management, enhancing the application 
  flow and ensuring a smooth user experience.

- The following flow is implemented for adding or updating items in local storage:

  - Action Dispatch: An action is dispatched from a component.
  - Reducer: The reducer listens for the dispatched action.
  - Saga: Redux-Saga processes the watched action and calls the respective service methods.
  - Success and Failure Actions: After processing, it triggers the respective success or failure actions.

This approach allows us to encapsulate all local storage methods within the services, facilitating easy integration of 
APIs in the future without the need to modify the components or Redux code.

- Initially, we are loading all setting options by dispatching an actions. I assumed that the item completed status 
  would come from backend side and some setting options can be dynamic configured as per the user roles.
  
- We have added various `unit` and `integration` test cases.  

- All success and failure conditions managed from sagas only.


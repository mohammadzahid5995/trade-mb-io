Question 1 : Where do you start?
Answer :
With the app's release date only two weeks away and no QA processes yet implemented, the first thing I’d do is get to know the product and find the biggest pain points.

I would first meet the product manager and the developers to learn about the trading flow, which features would be included in the initial release, and which aspects of the product are still in flux. At the same time, I would install the app on both platforms, and use the app as a customer to learn about the customer journey.

Because this is a fintech app that deals with customer funds, instead of a traditional testing approach, I would develop a risk-based testing approach. I would prioritize the following testing areas in the application:
Account creation and login
Verification of user identity, if applicable
Funds in the application (Wallet Balance, Deposit, withdrawal, Tradnsaction history, etc.)
Buying/ Selling of assets
Test for application behavior and response (Notifications and Error)

During my time testing the application, I would capture the key user journeys and report any critical issues that I found. I would also create the first regression test cases and focus on core application functionality.


Question 2 : How would you approach testing this app?
Answer : 
I will apply risk-based testing, directing my attention to features that may threaten customer capital, security, or confidence.

Here’s how I will test:

Functional Testing : I will ensure all business flows are validated from start to finish.

Examples include : Creation of account, login/logout, trading, deposits and withdrawals, portfolio refresh and order historyAPI Testing

Since most of the mobile functionality is dependent on APIs, I’d check for : Correct status codes / Positive and negative response verifications of the application / Possible edge cases and invalid requestsAuth and error testingExhaustive Exploratory Testing

I will do plenty of exploratory testing.

Security Checks : Even if there is a security team, QA needs to check : Session timeouts / Unauthorised access of APIs / Exposure of sensitive data / Handling and leakage of tokens / Permission testing

Mobile Testing : Testing of both Android and iOS mobile versions means testing of : 
Different screen sizes, different OS versions, background apps, multiple connectivity options, offline modes, push notifications, device rotation

Performance and Regression Testing : I will build a regression suite continuously to ensure that the application’s performance is not impacted by newly developed features.


Question 3 : What does QA look like inside a sprint, from ticket creation through to regression?
Answer :
QA should actively participate throughout the sprint instead of only once the development is finalized.

When a ticket is created, I join Product and Engineering in reviewing the requirements to make sure acceptance criteria are unambiguous, and to spot any scenario, they may be overlooked, at an early stage.

While development is ongoing, I provide clarification on edge cases, review the API contracts as required, and write the test cases in advance of the feature completion.

After the development is finalized, I conduct feature testing, validate the APIs, and do exploratory testing to confirm the acceptance criteria are completely satisfied.

When something is found, I help the developers in the understanding the issue, and I provide a clearly defined bug report that includes either a log, a screenshot, or both. I also help to confirm when the bug is fixed.

I also conduct regression testing for high priority business flows, and I conduct smoke testing for acceptance of the release.

Once the release is in production, I conduct a sanity check to confirm that basic critical business flows work in the production environment.


Question 4 : What does your ideal regression suite look like?
Answer : 
I want regression testing to always occur on critical business functionality in my CI/CD pipeline.

Here’s what this ideal regression test suite would consist of:

Smoke Tests (5 – 10 min)

Run every deployment.
Examples:
Login
User Registration
Home screen
Capturing Critical Regression

Run every release.
Examples:
Complete Trading Flow
Trade Order execution (Buy, Sell)
Deposits
Withdrawals
Balance and Portfolio Updates
Transaction History
API Regression
Tests all backend API’s and Independent UI.
Cross Platform Regression
Verifies that functionality is working on both Android and iOS.

Regression test suite will include tests designed to reduce unnecessary testing dependencies, use stable locators, and provide detailed and useful failure reports (including screenshots, logs, and recordings).


Question 5 : What would keep you up at night about this app specifically and releasing to the public?
Answer:
The biggest worry is anything that affects the customers money or trust.

Examples :
Account balances
Failed trades that appear successful
Duplicate trade execution
Deposit or withdrawal inconsistencies
Incorrect portfolio calculations
Security vulnerabilities exposing customer data
Race conditions causing transactions
API failures leaving the app in an inconsistent state
Poor handling of network interruptions during trading
Crashes during transactions

This is a trading application so even a small issue could result in the customer losing money or losing trust in the application.

Before we release the application I want to be sure that the important parts of the application are tested very well watched closely when the application is being used and have good logging and alerting so we can find and fix problems quickly.

We need to test the trading application well to avoid any problems with the customers account balances, trades, deposits or withdrawals.

The trading application needs to be secure and safe for the customer to use so we need to make sure there are no security vulnerabilities that could expose the customers data.
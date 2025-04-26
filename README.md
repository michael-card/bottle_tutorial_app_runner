# Tutorial to run Python bottle tutorial in App Runner

App Runner will be default run your APIs as https, but there is no support in CDK at the current time to associate a custom domain with your service. You can associate a custom domain with your service via the App Runner console or Cloudformation, but not via CDK. Therefore this tutorial will not cover custom domains.

## Prerequisites

- AWS account
- AWS CLI installed and configured
- Node.js and npm installed
- Python 3.13.3
- Docker

## Setup

1. Clone this repository
2. Install Node.js and npm
3. Install typescript
4. Install the AWS CLI
5. Install the CDK
6. Run `cdk bootstrap` if necessary to set up cdk for your account

## Deploy

1. Run `cdk deploy --all` at the command prompt
2. To test go to the URL returned by the cdk deploy command, if you just visit the URL returned you will get a help message. Add `/hello/NAME` to the URL to see the results of exercising the hello API

## Cleanup

1. Run `cdk destroy --all` at the command prompt to destroy the stack

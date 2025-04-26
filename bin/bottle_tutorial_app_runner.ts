#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { BottleTutorialEcsStack } from '../lib/bottle-tutorial-ecs-stack';
import { BottleTutorialAppRunnerStack } from '../lib/bottle-tutorial-app-runner-stack';

const repositoryName = 'bottle-tutorial-repo';
const imageName = 'bottle-tutorial-image';
const serviceName = 'bottle-tutorial-app-runner-service';

const app = new cdk.App();

// Create the ECS stack first
const ecsStack = new BottleTutorialEcsStack(app, 'BottleTutorialEcsStack', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
  repositoryName,
  imageName
});

// Create the App Runner stack with a dependency on the ECS stack
const appRunnerStack = new BottleTutorialAppRunnerStack(app, 'BottleTutorialAppRunnerStack', {
  imageName,
  repositoryName,
  serviceName,
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
});

// Add explicit dependency - App Runner stack will only deploy after ECS stack
appRunnerStack.addDependency(ecsStack);

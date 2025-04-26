import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as apprunner from '@aws-cdk/aws-apprunner-alpha';
import * as ecr from 'aws-cdk-lib/aws-ecr';

interface BottleTutorialAppRunnerStackProps extends cdk.StackProps {
  imageName: string;
  repositoryName: string;
  serviceName: string;
}

export class BottleTutorialAppRunnerStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: BottleTutorialAppRunnerStackProps) {
    super(scope, id, props);
 
    // Reference an existing ECR repository
    const repository = ecr.Repository.fromRepositoryArn(this, props.repositoryName, `arn:aws:ecr:${props.env?.region}:${props.env?.account}:repository/${props.repositoryName}`);
 
    // Create an App Runner service
    const service = new apprunner.Service(this, props.serviceName, {
      source: apprunner.Source.fromEcr({
        repository: repository,
        imageConfiguration: {
          port: 8080 // Your app's port
        },
        tagOrDigest: props.imageName, // Or specify a digest if you want an immutable deployment
      }),
    });
 
    // Optional: Output the URL
    new cdk.CfnOutput(this, 'bottle-tutorial-app-runner-url', {
      value: service.serviceUrl,
    });
  }
 }
 
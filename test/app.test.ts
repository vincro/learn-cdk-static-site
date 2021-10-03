import {
  expect as expectCDK,
  haveResource
} from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import { StaticSiteBucketStack } from '../lib/bucket';
import { AppConfig } from '../bin/learn-cdk-static-site';

const config: AppConfig = {
  env: {
    account: '123456789',
    region: 'eu-west-2'
  },
  host: 'www',
  domain: 'testdomain.xyz'
};

describe('App', () => {
  const app = new cdk.App();

  test('BucketStack', () => {
    // WHEN
    const bucketStack = new StaticSiteBucketStack(
      app,
      'TestBucketStack',
      config
    );

    // THEN
    expectCDK(bucketStack).to(
      haveResource('AWS::S3::Bucket', {
        BucketName: 'www.testdomain.xyz',
        WebsiteConfiguration: {
          ErrorDocument: 'error.html',
          IndexDocument: 'index.html'
        }
      })
    );
  });
});

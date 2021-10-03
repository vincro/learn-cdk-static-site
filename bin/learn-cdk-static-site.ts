#!/usr/bin/env node
import * as dotenv from 'dotenv';
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { StaticSiteDomainStack } from '../lib/domain';
import { StaticSiteBucketStack } from '../lib/bucket';

dotenv.config()

interface EnvConfig {
    account?: string
    region?: string
}

export interface AppConfig {
    env: EnvConfig,
    host: string
    domain: string
}

const env  = {
  account: process.env.CDK_DEPLOY_ACCOUNT || process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEPLOY_REGION || process.env.CDK_DEFAULT_REGION
};

const config : AppConfig = {
    env,
    host: 'www',
    domain: 'cdkstaticwebsite.xyz'
}

const app = new cdk.App();

const staticBucketStack = new StaticSiteBucketStack(app, 'LearnCdkStaticSiteBucketStack', {
    ...config
});

new StaticSiteDomainStack(app, 'LearnCdkStaticSiteDomainStack', {
    ...config,
    bucket: staticBucketStack.bucket
});

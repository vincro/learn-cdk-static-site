#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { StaticSiteDomainStack } from '../lib/domain';
import { StaticSiteBucketStack } from '../lib/bucket';

interface EnvConfig {
    account: string
    region: string
}

interface AppConfig {
    env: EnvConfig,
    host: string
    domain: string
}

const env  = {
    account: '',
    region: ''
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

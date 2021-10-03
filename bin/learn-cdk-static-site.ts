#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { StaticSiteDomainStack } from '../lib/domain';

const app = new cdk.App();

new StaticSiteDomainStack(app, 'LearnCdkStaticSiteDomainStack', {
    domain: 'cdkstaticwebsite.xyz'
});

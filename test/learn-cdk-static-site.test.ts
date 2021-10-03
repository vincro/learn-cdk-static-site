import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as LearnCdk from '../lib/learn-cdk-static-site-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new LearnCdk.LearnCdkStaticSiteStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});

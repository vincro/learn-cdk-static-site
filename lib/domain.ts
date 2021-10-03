import * as cdk from '@aws-cdk/core';
import * as route53 from '@aws-cdk/aws-route53';

interface DomainStackProps extends cdk.StackProps {
  domain: string;
}

export class StaticSiteDomainStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: DomainStackProps) {
    super(scope, id, props);

    new route53.PublicHostedZone(this, 'StaticSiteHostedZone', {
      zoneName: props.domain
    });
  }
}

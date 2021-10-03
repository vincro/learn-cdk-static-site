import * as cdk from '@aws-cdk/core';
import * as route53 from '@aws-cdk/aws-route53';
import * as s3 from '@aws-cdk/aws-s3';
import * as alias from '@aws-cdk/aws-route53-targets';

interface DomainStackProps extends cdk.StackProps {
  host: string;
  domain: string;
  bucket: s3.Bucket
}

export class StaticSiteDomainStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: DomainStackProps) {
    super(scope, id, props);

    const zone = new route53.PublicHostedZone(this, 'StaticSiteHostedZone', {
      zoneName: props.domain
    });

    new route53.ARecord(this, 'StaticSiteAliasRecord', {
      zone,
      recordName: props.host,
      target: route53.RecordTarget.fromAlias(new alias.BucketWebsiteTarget(props.bucket)),
    });
  }
}

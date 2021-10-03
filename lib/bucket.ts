import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';

interface BucketStackProps extends cdk.StackProps {
  host: string;
  domain: string;
}

export class StaticSiteBucketStack extends cdk.Stack {
  public readonly bucket: s3.Bucket;

  constructor(scope: cdk.Construct, id: string, props: BucketStackProps) {
    super(scope, id, props);


    const { host: recordName, domain: domainName } = props;
    const bucketName = [recordName, domainName].join('.');

    this.bucket = new s3.Bucket(this, 'StaticWebsiteBucket', {
      bucketName,
      publicReadAccess: true,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'error.html',
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    new cdk.CfnOutput(this, "StaticWebsiteBucketOutput", {
      value: this.bucket.bucketName,
      description: 'S3 Bucket Name',
      exportName: 'StaticWebsiteBucketName',
    });
  }
}

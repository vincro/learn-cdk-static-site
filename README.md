# Build a Static Site using CDK

In this learning in public project, we will build a CDK static site using the following steps:

- Initialise project
- Setup and use custom domain with Route 53
- Create S3 buckets for hosting & artifacts
- Configure logging for the site
- Setup SSL using ACM and CloudFront
- Setup a Code Pipeline to build and deploy
- ... and probably other things along the way.

## Changelog

| Version | Comments |
|---|---|
| 0.3.0 | Add bucket stack for hosting files and link to domain |
| 0.2.0 | Add domain setup & notes to the README |
| 0.1.0 | Add CDK |
| 0.0.1 | Initial commit |

## Lesson Notes & Thoughts

Thoughts and things I learned along the way which might be of note.

### Requirements
It goes without saying that you need setup already:

- A non-root AWS account with API access
- the latest version of CDK installed `npm i -g aws-cdk@latest`
- ~/.aws-confi

### Setting Up Domains

- Registered domain with namecheap.com
- Must deploy stack to get the NS records in Route53
- These can then be copied to namecheap domain management setup
- To setup an A record you need a target, which means setting up an S3 bucket simultaneously
- When creating multiple stacks you need to define readonly public properties to use between stacks
- Deploying S3 cannot be done using region-agnosticism, must set { account, region } property named `env` in props of stack
- Was able to re-deploy after destruction, but the nameservers changed, and had to amend in namecheap.com

### Setting Up Buckets

- Unable to destroy/delete buckets when they are not empty.  Had to empty them in console first.
- Had to export bucket to use with Route53 setup in domain stack.

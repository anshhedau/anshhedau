provider "aws" {
  region = var.region
  access_key = "AKIAWCOLNPA7WLMEKGFH" 
  secret_key = "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"
}

module "iam" {
  source = "../../modules/iam"

  users = ["dev-user1","dev-user2","dev-user3"]

  group_name = "dev-group"

  group_policy_arn = "arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess"

  user_policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ReadOnlyAccess"
}

module "vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name = "dev-vpc"
  cidr = var.vpc_cidr

  azs             = ["ap-south-1a","ap-south-1b"]
  public_subnets  = ["10.0.1.0/24","10.0.2.0/24"]
  private_subnets = ["10.0.3.0/24","10.0.4.0/24"]

  enable_nat_gateway = true
  enable_vpn_gateway = false
}

module "ec2" {
  source = "../../modules/ec2"

  ami           = var.ami
  instance_type = var.instance_type
  subnet_id     = module.vpc.public_subnets[0]
}
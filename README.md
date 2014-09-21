[![Code Climate](https://codeclimate.com/github/hoschi/sweetp-service-github-issues/badges/gpa.svg)](https://codeclimate.com/github/hoschi/sweetp-service-github-issues) [![Test Coverage](https://codeclimate.com/github/hoschi/sweetp-service-github-issues/badges/coverage.svg)](https://codeclimate.com/github/hoschi/sweetp-service-github-issues) [![Build Status](https://travis-ci.org/hoschi/sweetp-service-github-issues.svg?branch=develop)](https://travis-ci.org/hoschi/sweetp-service-github-issues)

Sweetp service for Github issues.

# Development

Install development dependencies.

## Create test project to work with

Folder `sweetptest` is already ignored by git, but you must create and populate it:
```
github-issues > mkdir sweetptest
github-issues > cd sweetptest
sweetptest > sweetp -init test-github-issues
# add 'github_issues' property
sweetptest > vim .sweetp/config.json
sweetptest > cat .sweetp/config.json
{
    "name": "test-github-issues",
    "github_issues":{
    }
}
sweetptest > sweetp password manager createSafe
Password safe created successfully.
sweetptest > sweetp -Pkey=github -Pusername=YOURUSERNAME password manager set
Credentials saved for key github.
```

# License

Copyright (c) 2014 Stefan Gojan
Licensed under the MIT license.

<img src="https://public-static-heronlabs.s3.amazonaws.com/images/vai-ts/vai-ts.png" alt="drawing" width="150"/>

# Vai TS

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Build Status](https://github.com/heronlabs/vai-ts/actions/workflows/main.yml/badge.svg?branch=main)

#

[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![GTS](https://img.shields.io/badge/GTS-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://github.com/google/gts)
[![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)](https://github.com/facebook/jest)
[![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)](https://docs.nestjs.com/)
[![NPM](https://img.shields.io/npm/v/@heronlabs/vai-ts?style=for-the-badge)](https://www.npmjs.com/package/@heronlabs/vai-ts)

> This is a project to launch other projects with Typescript

### Installation

```
npm install -g @heronlabs/vai-ts
```

### Usage

```
Usage: vai-ts [options] [command]

Options:
  -h, --help                                                    display help for command

Commands:
  init-basic-boilerplate        |i-basic [options]              Initialize Typescript with basic boilerplate
  init-api-store-boilerplate    |i-api-store [options]          Initialize Typescript with API Store boilerplate
  init-api-broker-boilerplate   |i-api-broker [options]         Initialize Typescript with API Broker boilerplate
  init-api-boilerplate          |i-api [options]                Initialize Typescript with API boilerplate
  init-iac-boilerplate          |i-iac [options]                Initialize Typescript with IaC boilerplate
  init-package-boilerplate      |i-package [options]            Initialize Typescript with package boilerplate
  init-component-boilerplate    |i-component [options]          Initialize Typescript with component boilerplate
  init-wcs-boilerplate          |i-wcs [options]                Initialize Typescript with wcs boilerplate
  init-cron-boilerplate         |i-cron [options]               Initialize Typescript with CRON boilerplate
  init-wcs-next-boilerplate     |i-wcs-next [options]           Initialize Typescript with wcs next boilerplate
  init-cms-boilerplate          |i-cms [options]                Initialize Typescript with CMS Headless boilerplate
  version                                                       Print current version
  help [command]                                                display help for command
```

## TLTR (Too long to read)

This project was created with the intention of acting as a CLI in creating new projects.

At first I used strings as the template format that would become the base files of the project to be created.

After using this tool and new knowledge I used git to clone new models, and the use of string became obsolete and unnecessary.

## How it works

The project is made available through a CLI that has some commands to generate new projects with different purposes.

Currently available templates are:

- [Basic Boilerplate](https://github.com/heronlabs/vai-ts-basic-boilerplate)
- [API Boilerplate](https://github.com/heronlabs/vai-ts-api-boilerplate)
- [API Store Boilerplate](https://github.com/heronlabs/vai-ts-api-store-boilerplate)
- [IaC Boilerplate](https://github.com/heronlabs/vai-ts-iac-boilerplate)
- [Package Boilerplate](https://github.com/heronlabs/vai-ts-package-boilerplate)
- [Component Boilerplate](https://github.com/heronlabs/vai-ts-component-boilerplate)
- [CRON Boilerplate](https://github.com/heronlabs/vai-ts-cron-boilerplate)
- [WCS Boilerplate](https://github.com/heronlabs/vai-ts-wcs-boilerplate)
- [WCS Next Boilerplate](https://github.com/heronlabs/vai-ts-wcs-next-boilerplate)

## Next steps

Insert new commands for new formats, such as: cli, api and Node packages.

## Built with

- [axios](https://github.com/axios)
- [unzipper](https://github.com/ZJONSSON/node-unzipper)

## Delivery from

- [NPM](https://www.npmjs.com/package/@heronlabs/vai-ts)

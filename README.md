<img src="https://cdn.discordapp.com/attachments/983205521546956870/983205960568934470/unknown.png" alt="drawing" width="150"/>

# Vai TS 

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://app.travis-ci.com/heronlabs/vai-ts.svg?branch=main)](https://app.travis-ci.com/heronlabs/vai-ts)

#

[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![GTS](https://img.shields.io/badge/GTS-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://github.com/google/gts)
[![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)](https://github.com/facebook/jest)
[![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)](https://docs.nestjs.com/)
[![Discord](https://img.shields.io/badge/%3CForum%3E-%237289DA.svg?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/vGCyfMC9X9)


> This is a project to launch other projects with Typescript

### Installation

```
npm install -g @heronlabs/vai-ts
```

### Usage

```
Usage: vai-ts [options] [command]

Options:
  -h, --help                        display help for command

Commands:
  init-basic-boilerplate [options]  Initialize Typescript with basic boilerplate
  version                           Print current version
  help [command]                    display help for command
```

## TLTR (Too long to read)

This project was created with the intention of acting as a CLI in creating new projects.

At first I used strings as the template format that would become the base files of the project to be created.

After using this tool and new knowledge I used git to clone new models, and the use of string became obsolete and unnecessary.

## How it works

The project is made available through a CLI that has some commands to generate new projects with different purposes.

Currently available templates are:

* [Basic Boilerplate](https://github.com/heronlabs/vai-ts-basic-boilerplate)


## Next steps

Insert new commands for new formats, such as: cli, api and Node packages.

## Built with

- [axios](https://github.com/axios)
- [unzipper](https://github.com/ZJONSSON/node-unzipper)

<a href="https://expense.fyi">
<p align="center"><img alt="Expense.fyi – An open source expense tracker application to track your incomes, investments, subscriptions and expenses at ease." src="./public/static/icons/logo.svg"></p>
  <h1 align="center">Expense.fyi</h1>
</a>

<p align="center">
	Expense.fyi is Open Source Application to Effortlessly Track and Manage your expenses.
</p>

<p align="center">
  <a href="https://github.com/gokulkrishh/expense.fyi/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/gokulkrishh/expense.fyi?label=license&logo=github&color=f80&logoColor=fff" alt="License" />
  </a>
</p>

<p align="center">
  <a href="#introduction"><strong>Introduction</strong></a> ·
  <a href="#tech-stack"><strong>Tech Stack</strong></a> ·
  <a href="#implementation"><strong>Implementation</strong></a> ·
  <a href="#app-routes"><strong>App Routes</strong></a> ·
  <a href="#contributing"><strong>Contributing</strong></a>
</p>
<br/>

## Introduction

Expense.fyi is an open source application to effortlessly track and manage your incomes, investments, subscriptions and expenses.

## Tech Stack

- [Next.js](https://nextjs.org/) – framework
- [Tailwind](https://tailwindcss.com/) – CSS
- [Supabase](https://supabase.com/) – database
- [Vercel](https://vercel.com/) – hosting

## Implementation

- Expense.fyi is build using [NextJs](https://nextjs.org) from scratch.
- [Supabase](https://supabase.com/) is an open source Firebase alternative, data is stored in postgres data and using magic link authentication service provided by supabase to signup users.
- [Postgresql](https://www.postgresql.org/) is used as the database for storing user data, subscriptions etc. You can refer to the Prisma schema [here](/prisma/schema.prisma).
- [Razorpay](https://razorpay.com/) is used as the payments system.

## Routes

| Path      | Production             | Local                     |
| --------- | ---------------------- | ------------------------- |
| Home      | /                      | /                         |
| Signup    | app.expense.fyi/signup | app.localhost:3000/signup |
| Signin    | app.expense.fyi/signin | app.localhost:3000/signin |
| Dashboard | app.expense.fyi        | app.localhost:3000        |

## Contribution

We love our contributors! Here's how you can contribute:

- [Open an issue](https://github.com/gokulkrishh/expense.fyi/issues) if you believe you've encountered a bug.
- Make a [pull request](https://github.com/gokulkrishh/expense.fyi/pull) to add new features/make quality-of-life improvements/fix bugs.

<a href="https://github.com/gokulkrishh/expense.fyi/graphs/contributors">
    <img src="https://contrib.rocks/image?repo=gokulkrishh/expense.fyi" />
</a>

## Author

- Gokulakrishnan Kalaikovan ([@gokul_i](https://twitter.com/gokul_i))

## License

Expense.fyi is open source under the GNU Affero General Public License Version 3 (AGPLv3) or any later version. You can [find it here](https://github.com/gokulkrishh/expense.fyi/blob/main/LICENSE.md).

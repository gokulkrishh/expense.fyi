<a href="https://expense.fyi">
<p align="center"><img alt="Expense.fyi – An open source expense tracker application to track your incomes, investments, subscriptions, and expenses at ease." width="100" height="100" src="./public/icons/logo.svg"></p>
  <h1 align="center">Expense.fyi</h1>
</a>

<p align="center">
  Expense.fyi is an open-source expense tracker application to effortlessly track and manage your expenses.
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
  <a href="#routes"><strong>App Routes</strong></a> ·
  <a href="#contributions"><strong>Contributions</strong></a>
</p>
<br/>

## Introduction

Expense.fyi is an open-source application to effortlessly track and manage your incomes, expenses, investments, and subscriptions.

## Tech Stack

- [Next.js](https://nextjs.org/) – framework
- [Components](https://ui.shadcn.com/) – ui-components
- [Tailwind](https://tailwindcss.com/) – CSS
- [Supabase](https://supabase.com/) – database
- [Vercel](https://vercel.com/) – hosting
- [Resend](https://resend.com/) – emails

## Implementation

- Expense.fyi is built using [NextJs](https://nextjs.org) from scratch.
- [Postgresql](https://www.postgresql.org/) is used as the ORM for easily communicating with the database for storing user, subscription data, etc. You can refer to the Prisma schema [here](/prisma/schema.prisma).
- [Supabase](https://supabase.com/) is an open-source Firebase alternative, the data is stored in the Postgres database (private data are encrypted) and uses a magic link for authentication provided by supabase.
- [LemonSqueezy](https://lemonsqueezy.com/) is used as the payment system. Its implementation is super simple.

## Routes

| Path      | Production             | Local                     |
| --------- | ---------------------- | ------------------------- |
| Home      | /                      | /                         |
| Signup    | app.expense.fyi/signup | app.localhost:3000/signup |
| Signin    | app.expense.fyi/signin | app.localhost:3000/signin |
| Dashboard | app.expense.fyi        | app.localhost:3000        |

## Contributions

Here's how you can contribute:

- [Open an issue](https://github.com/gokulkrishh/expense.fyi/issues) if you believe you've encountered a bug.
- Make a [pull request](https://github.com/gokulkrishh/expense.fyi/pull) to add new features/make quality-of-life improvements/fix bugs.

<a href="https://github.com/gokulkrishh/expense.fyi/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=gokulkrishh/expense.fyi" alt="contributors" />
</a>

## Repo Activity

![Alt](https://repobeats.axiom.co/api/embed/39144a92441882ef68fb1adf1c8166e1d6dfdb79.svg "Repobeats analytics image")

## Author

- Gokulakrishnan Kalaikovan ([@gokul_i](https://twitter.com/gokul_i))

## License

Expense.fyi is an open source under the GNU Affero General Public License Version 3 (AGPLv3) or any later version. You can [find it here](https://github.com/gokulkrishh/expense.fyi/blob/main/LICENSE).

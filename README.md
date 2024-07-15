# Project Name

## Overview

This repository contains two projects:
1. A Laravel project with Passport for API authentication.
2. A React project located in the `react` directory for the frontend.

## Prerequisites

Make sure you have the following installed:
- PHP >= 8.2
- Composer
- Node.js >= 20.x
- NPM or Yarn
- MySQL or any other database

## Getting Started

### 1. Clone the Repository

- git clone https://github.com/RidmaK/Laravel-react-2FA.git

### 1. Laravel Project

- cd Laravel-react-2FA
- composer install
- cp .env.example .env
- php artisan key:generate
- php artisan migrate
- php artisan passport:install
- php artisan serve

### 1. React Project (In Laravel-react-2FA folder)

- cd react
- npm install
- npm run dev


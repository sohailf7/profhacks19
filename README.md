# ProfHacks

This repository contains the ProfHacks website to be used for registration and
other information to be updated on profhacks.com.

# Installation
## Windows
1. Install [Git Bash](https://git-scm.com/)
2. Download or clone the git repository in Git Bash (`git clone https://www.github.com/johnsbuck/profhacks2017`)
3. Install [Node.js LTS](https://nodejs.org/en/)
4. Install [PostgreSQL](https://www.postgresql.org/download/windows/)
5. run `npm install --local` in the Git repository.

## Linux/MacOS
1. Install Git using apt-get (Linux), or XCode (MacOS)
2. Download or clone the git repository in Git Bash (`git clone https://www.github.com/johnsbuck/profhacks2017`)
3. Install [Node.js LTS](https://nodejs.org/en/)
4. Install PostgreSQL ([MacOS](https://www.postgresql.org/download/macosx/) or `sudo apt-get install postgresql postgresql-contrib` for Linux)
5. run `npm install --local` in the Git repository.

# Setting Up PostgreSQL
Access PostgreSQL script and type in the following script:
```
CREATE DATABASE "prof";
\connect prof;
CREATE ROLE "hoot" WITH LOGIN SUPERUSER;
\password hoot;
```
Set the password to "hoot".

# Testing
1. Go to the ProfHacks repository folder.
2. `gulp default`
3. `npm test`
4. Go to localhost:3000 on your browser.
5. You should see no errors appear from the page or your terminal.

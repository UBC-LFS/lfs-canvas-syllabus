[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)

# LFS-Canvas-Syllabus

This application extracts syllabi from Canvas, determines if it is a link to the PDF or a Canvas Page, downloads the syllabi, and generates a list of all courses that do not have a syllabus specified.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for use with your own API tokens and Canvas domains. 

Run `npm install`

The output folder (containing all the syllabi) should be in the root directory.

To start the development server:

Run `npm start` in `./src/cli`

In a separate terminal, run `npm run server`

To start the production server:

Run in ``npm build` in `./src/cli` to generate static files, then `npm run server`
 
### Prerequisites

1. **Install [Node 8.0.0 or greater](https://nodejs.org)**.
2. **Install [Git](https://git-scm.com/downloads)**. 

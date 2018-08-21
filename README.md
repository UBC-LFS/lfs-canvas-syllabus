[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)

# LFS-Canvas-Syllabus

This application extracts syllabi from Canvas, determines if it is a link to the PDF or a Canvas Page, downloads the syllabi, and generates a list of all courses (with instructor names) that do not have a syllabus specified.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for use with your own API tokens and Canvas domains. 

### Prerequisites

1. **Install [Node 8.0.0 or greater](https://nodejs.org)**.
1. **Install [Git](https://git-scm.com/downloads)**.

### Installing and Setup
1. First, clone this repo. `git clone https://github.com/UBC-LFS/lfs-canvas-syllabus.git`
1. Then cd into the repo. `cd lfs-canvas-syllabus`
1. Run the installation script. `npm install` (If you see `babel-node: command not found`, you've missed this step.)

### Gathering syllabus
1. Run the script. `node getSyllabi.js`
2. Input the year you are interested in (if you are interested in more than one year, you'll need to run the script more than one time).
3. Select the terms you are interested in. You can select multiple terms by pressing `space`. 
4. Go for a coffee. Depending on how many terms you select, and how many courses you have under your account, 

The output folder (containing all the syllabi) should be in the root directory.



CANVAS_API_TOKEN=
CANVAS_API_DOMAIN=
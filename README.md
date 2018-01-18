AEON Tools
===========
Small set of tools for AEON.

### Get Started

Clone the repository
```
git clone git@github.com:AeonPocket/aeon-tools.git
```

Install dependencies
```
npm install
```

### Run locally
```
npm start
```

### Building application
```
npm run-script build
```

## Directory Structure
```
src 
├── main
│   └── webapp
│       ├── js
│       │   ├── libs            // Contains cryptonote JS lib files
│       │   ├── controllers     // Contains all controllers for views
│       │   └── app.js          // Base configuration file
│       ├── css                 // Contains css files
│       ├── images              // Contails images and icons
│       └── templates           // Contains all views
└── test
    ├── unit                    // To be updated
    └── karma.conf.js           // Contains config for running unit test cases
```
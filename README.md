# Full-stack travel destination logging website
## Frameworks Implemented:
- React.js (Including hooks, component-mounting, state and effect manipulation, props, etc...)
- Express.js and Node.js
- MapBox (react-mapbox-gl)
- MongoDB via Mongoose
## Security 
- DotEnv 
- API CORS middlewares
- Error-handling router middlewares
- Helmet for enhanced API transaction security
- Morgan for API transaction logging  
- Malicious form entry injections are handled by React.js framework
## What's next?
1. Fix DELETE endpoint
2. ~~Register and store user information~~
    - Cross-domain API key now required to add new entry
    - CORS policy updated
3. ~~Deploy with now.sh and Mongo Atlas~~
    - now.sh is outdated so used Heruko to deploy backend server instead
        - Migrated DotEnv file to Heruko
        - Custom Node.js Build
    - NoSQL MongoDB now hosted on Mongo Atlas (Only IP allowed is local machine so far)
4. ~~Hide API keys and prepare website for deployment~~
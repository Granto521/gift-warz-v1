#  Build and Export Instructions for Gift Warz: Kingdom Clash

## Building for Production

```bash
# Create an optimized production build
npm run build

# The build output will be in the 'dist' directory
```

## Running the Production Build Locally

```bash
# Install a static server if you don't have one
npm install -g serve

# Serve the production build
serve -s dist
```

## Deploying to a Hosting Service

The contents of the `dist` directory are ready to be deployed to any static hosting service like:
- Vercel
- Netlify
- GitHub Pages
- Firebase Hosting

Simply upload the entire `dist` directory to your hosting provider.

## Important Configuration Notes

1. If you're using TikTok Live capabilities in production, make sure your server has the proper CORS configuration.

2. For custom domains, update any hardcoded API URLs in the application.
 
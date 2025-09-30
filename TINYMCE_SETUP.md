# TinyMCE Editor Setup

This guide will help you configure the TinyMCE editor in your React application.

## Option 1: Use TinyMCE Cloud (Recommended for Production)

1. Sign up for a free API key at [TinyMCE Cloud](https://www.tiny.cloud/auth/signup/)
2. Once you have your API key, open `src/config/editorConfig.js`
3. Set `useSelfHostedTinyMCE` to `false`
4. Replace `your-api-key-here` with your actual TinyMCE API key
5. Restart your application

```javascript
const config = {
    useSelfHostedTinyMCE: false,
    tinyMCEApiKey: 'your-actual-api-key-here'
};
```

## Option 2: Use Self-Hosted TinyMCE (Good for Development)

1. Open `src/config/editorConfig.js`
2. Make sure `useSelfHostedTinyMCE` is set to `true`
3. Copy the TinyMCE assets to your public folder:

```bash
# Run these commands from your project root
mkdir -p public/tinymce/skins/ui/oxide
mkdir -p public/tinymce/skins/content/default

# Copy the TinyMCE assets (adjust paths as needed)
cp -R node_modules/tinymce/skins/ui/oxide/* public/tinymce/skins/ui/oxide/
cp -R node_modules/tinymce/skins/content/default/* public/tinymce/skins/content/default/
```

4. Restart your application

## Troubleshooting

If you still see the "A valid API key is required" message:
1. Check that you've correctly entered your API key in `editorConfig.js`
2. Verify that you've set `useSelfHostedTinyMCE` correctly based on your preferred approach
3. Clear your browser cache and restart your development server
4. Check the browser console for any additional error messages

## Important Notes

- The free TinyMCE API key has usage limitations
- For production applications with significant traffic, consider purchasing a paid plan
- The self-hosted version doesn't require an API key but requires you to handle updates and security yourself

# 🎥 Videos Folder (`public/videos/`)

Place your website video files here.

Any video file placed in this folder is automatically served directly by Next.js at `/videos/<filename>`.

### Example:
If you add `demo.mp4` here (`public/videos/demo.mp4`):
- Accessible on your site at: `https://www.jsmintegratedservices.com/videos/demo.mp4`
- Local path in code: `/videos/demo.mp4`

### Recommended Format & Optimization:
- **Format:** `.mp4` (H.264 video codec + AAC audio) or `.webm`
- **Resolution:** 1080p (1920x1080) for desktop or 720p (1280x720) for mobile
- **File size:** Aim for under 10MB to 15MB for fast loading on mobile networks.
- **For very large videos (e.g. 50MB+):** It is often best to upload to YouTube or Vimeo and embed the player, or use Cloudinary/Mux. For short clips, product demos, hero backgrounds, and standee reels, hosting directly in `public/videos/` is perfect!

### How to use in Next.js / HTML:
```tsx
<video 
  src="/videos/demo.mp4" 
  controls 
  className="w-full rounded-xl shadow-md"
/>
```

Or for an autoplay background video (muted & looping):
```tsx
<video 
  src="/videos/hero-background.mp4" 
  autoPlay 
  loop 
  muted 
  playsInline 
  className="w-full h-full object-cover"
/>
```

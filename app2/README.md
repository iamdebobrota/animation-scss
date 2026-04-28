# 💕 Valentine Proposal App

A beautiful, modern, and interactive Valentine's Day proposal application built with React, Tailwind CSS, DaisyUI, and Framer Motion animations.

## ✨ Features

### Main Page
- **Animated Greeting**: "Will you be my Valentine?" with smooth floating animations
- **Interactive Buttons**:
  - **YES Button**: Beautiful red button with glowing effect - takes you to the thanks page
  - **NO Button**: Funny button that runs away when you hover over it (can't refuse! 😄)
- **Floating Hearts**: Continuous falling hearts animation in the background
- **Celebration Effect**: When you click YES, beautiful particles and emojis burst across the screen
- **Responsive Design**: Looks great on desktop, tablet, and mobile devices

### Thanks Page
- **Confirmation Message**: "Thanks for Being My Valentine!" with animated hearts
- **Decorative Elements**: Animated roses and confetti particles
- **Action Buttons**:
  - Start Over: Go back to the main page
  - Save the Date: Quick link to Google Calendar to add the date
- **Smooth Animations**: Multiple animated elements create a festive atmosphere

## 🎨 Design & Styling

- **Color Scheme**: Beautiful gradient from pink to rose with red accents
- **UI Framework**: DaisyUI components for polished, professional buttons
- **Custom Animations**: 
  - Floating hearts
  - Pulse effects
  - Scale animations
  - Smooth transitions
- **Responsive**: Fully responsive design that works on all screen sizes

## 🚀 Technologies Used

- **React 19**: Modern React with hooks
- **Vite**: Lightning-fast build tool
- **Tailwind CSS**: Utility-first CSS framework
- **DaisyUI**: Beautiful Tailwind CSS components
- **Framer Motion**: Professional animations and transitions
- **React Router DOM**: Client-side routing

## 📦 Installation

1. Navigate to the app2 directory:
```bash
cd app2
```

2. Install dependencies (already done if you followed setup):
```bash
npm install
```

## 🏃 Running the App

### Development Mode
```bash
npm run dev
```
The app will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm preview
```

## 📁 Project Structure

```
src/
├── App.jsx                    # Main app with routing
├── components/
│   ├── MainPage.jsx          # The proposal page with interactive buttons
│   └── ThanksPage.jsx        # The confirmation page with celebration
├── main.jsx                  # React entry point
└── index.css                 # Tailwind CSS directives
```

## 🎯 How It Works

1. **Landing on the app**: You see a beautiful Valentine's Day proposal with animated hearts
2. **Click YES**: The app celebrates with particle effects and transitions to the thanks page
3. **Click NO**: The button playfully runs away - you can keep trying! 😄
4. **Thanks Page**: Shows the confirmation with beautiful animations and two action buttons

## 🎨 Customization

You can easily customize:

- **Colors**: Edit the DaisyUI theme in `tailwind.config.js`
- **Messages**: Update the text in `MainPage.jsx` and `ThanksPage.jsx`
- **Animations**: Modify animation timing in the component files
- **Background**: Change gradient colors in the `className` attributes

## 📱 Browser Support

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎉 Features Highlights

✅ No Button runs away from cursor  
✅ Beautiful gradient backgrounds  
✅ Smooth Framer Motion animations  
✅ DaisyUI styled buttons  
✅ Fully responsive design  
✅ Celebration particle effects  
✅ Google Calendar integration  
✅ Romantic color scheme  

## 💡 Pro Tips

- The app is fully responsive - try it on your phone!
- The No button is intentionally hard to click (it runs away!)
- You can navigate between pages using the buttons
- The "Save the Date" button opens Google Calendar

## 📄 License

Feel free to use this app for your Valentine's Day proposal! 💕

---

Made with ❤️ for Valentine's Day proposals

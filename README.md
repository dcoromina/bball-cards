# TopStack - Premium Digital Card Collection

A modern Next.js application for collecting and trading digital basketball cards across NBA, NCAA, and EuroLeague.

## 🚀 Recent Improvements

### Security Enhancements

- ✅ **Environment Variables**: Moved Supabase credentials to environment variables for security
- ✅ **TypeScript Migration**: Converted JavaScript files to TypeScript for better type safety
- ✅ **Updated Dependencies**: Upgraded to latest Supabase SSR client for better security

### Code Quality Fixes

- ✅ **ESLint Issues**: Fixed all unused imports, variables, and missing dependencies
- ✅ **Type Safety**: Added proper TypeScript types throughout the application
- ✅ **Error Handling**: Improved error handling with proper try-catch blocks
- ✅ **Loading States**: Added consistent loading states across all forms

### Authentication Improvements

- ✅ **Consistent UI**: Unified signin and signup page styling
- ✅ **Better Validation**: Added password length validation and improved error messages
- ✅ **Auth Context**: Fixed useEffect dependency warnings in authentication context
- ✅ **Middleware**: Updated to use modern Supabase SSR client

### Performance Optimizations

- ✅ **Image Optimization**: Configured Next.js image domains
- ✅ **Bundle Size**: Removed unused dependencies and imports
- ✅ **Memory Leaks**: Fixed potential memory leaks in auth listeners

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd nba-cards
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
nba-cards/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── signin/         # Authentication pages
│   │   ├── signup/
│   │   ├── grid/           # Card grid view
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Home page
│   │   └── supabaseClient.ts # Supabase configuration
│   ├── components/         # Reusable components
│   │   ├── bottomNavbar.tsx
│   │   ├── ConditionalNavBar.tsx
│   │   ├── mainInfo.tsx
│   │   ├── test.tsx        # Card opening component
│   │   └── ...
│   └── context/           # React contexts
│       └── AuthContext.tsx
├── public/                # Static assets
│   ├── cards/            # Card images
│   ├── images/           # UI images
│   └── videos/           # Video assets
├── middleware.tsx        # Authentication middleware
└── next.config.ts        # Next.js configuration
```

## 🔧 Key Features

### Authentication

- **Secure Sign In/Sign Up**: Email-based authentication with Supabase
- **Protected Routes**: Middleware-based route protection
- **Session Management**: Automatic session handling and persistence

### Card Collection

- **Multiple Leagues**: NBA, NCAA, and EuroLeague cards
- **Interactive Pack Opening**: Animated card pack opening experience
- **Card Details**: Flip cards to view detailed statistics
- **Search & Filter**: Find cards by player name or team

### User Experience

- **Responsive Design**: Works on desktop and mobile devices
- **Smooth Animations**: Framer Motion powered animations
- **Modern UI**: Dark theme with gradient backgrounds
- **Loading States**: Proper loading indicators throughout

## 🛡️ Security Features

- Environment variable protection for API keys
- Server-side authentication validation
- Protected API routes
- Secure session management
- Input validation and sanitization

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms

1. Build the project: `npm run build`
2. Start production server: `npm start`
3. Set environment variables on your hosting platform

## 🔍 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Quality

- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Husky for pre-commit hooks (recommended)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support, please open an issue in the GitHub repository or contact the development team.

# Ecommerce App (SSO Server)

This is the **central authentication application** (Ecommerce) that provides SSO to the Foodpanda app using Laravel Passport.

### Features

- Login form (email + password)
- Passport personal access token creation on successful login
- Dashboard with **"Login to Foodpanda via SSO"** button
- Clicking the button → generates token → redirects to Foodpanda `/sso/callback` using `Inertia::location()`
- Protected `/dashboard` route
- Logout that revokes all tokens + destroys session

### Live Demo

**URL:** https://ecommerce-app.ar-techpro.com

**Login page:** https://ecommerce-app.ar-techpro.com

**Test Credentials**  
Email: `test@example.com`  
Password: `password123`

### Quick Test Steps

1. Go to https://ecommerce-app.ar-techpro.com
2. Login → land on Ecommerce Dashboard  
3. Click **"Login to Foodpanda via SSO"**  
4. Automatically redirected to Foodpanda → auto logged in there

### Local Setup

```bash
git clone https://github.com/mar-babu/ecommerce-app.git
cd ecommerce-app
composer install
cp .env.example .env
# edit .env → set DB + VITE_FOODPANDA_URL=your foodpanda app url
php artisan key:generate
php artisan migrate --seed
php artisan passport:client --personal --name="Foodpanda SSO"
npm install && npm run dev
php artisan serve
```

### Technical Notes

- Laravel 12 + Inertia.js (React) + Tailwind + SSR  
- Repository pattern (UserRepository) + Service layer (AuthService)

**Deployed on Cpanel** – clean commit history maintained.

Screenshots included in `/screenshots/` folder.

### Ping me for any questions
- Email: ar_cse@yahoo.com
- Mobile: +8801681195152
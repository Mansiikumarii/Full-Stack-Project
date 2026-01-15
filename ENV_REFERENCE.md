# Environment Variables Reference

## Backend Environment Variables (backend/.env)

### Required Variables

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/productr

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here_change_in_production
```

### Variable Descriptions

#### `PORT`
- **Default:** 5000
- **Purpose:** Server listening port
- **Example:** `PORT=5000`
- **Note:** If port 5000 is in use, change to 5001, etc.

#### `NODE_ENV`
- **Default:** development
- **Values:** `development`, `production`, `test`
- **Purpose:** Environment mode
- **Development:** More logging, error details
- **Production:** Optimized, minimal logging

#### `MONGODB_URI`
- **Default:** mongodb://localhost:27017/productr
- **Purpose:** MongoDB connection string
- **Local:** `mongodb://localhost:27017/productr`
- **Atlas:** `mongodb+srv://username:password@cluster.mongodb.net/productr?retryWrites=true&w=majority`
- **Note:** Replace `productr` with your database name

#### `JWT_SECRET`
- **Default:** your_jwt_secret_key_here
- **Purpose:** Secret key for JWT token generation
- **Important:** Change this in production!
- **Length:** Minimum 32 characters for security
- **Example:** `JWT_SECRET=xY9pL2kM7nQ3wE1bJ4tU8vR6sD5fG0hA`

### Development vs Production

#### Development Settings
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/productr
JWT_SECRET=dev_secret_key_123
```

#### Production Settings
```env
NODE_ENV=production
PORT=80 # or 3000
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/productr
JWT_SECRET=very_long_and_secure_production_secret_key_minimum_32_chars
```

---

## Frontend Environment Variables (frontend/.env)

### Required Variables

```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000/api
```

### Variable Descriptions

#### `REACT_APP_API_URL`
- **Default:** http://localhost:5000/api
- **Purpose:** Backend API base URL
- **Development:** `http://localhost:5000/api`
- **Production:** `https://your-backend-domain.com/api`
- **Note:** Must start with `REACT_APP_` to be accessible in React

### Development vs Production

#### Development Settings
```env
REACT_APP_API_URL=http://localhost:5000/api
```

#### Production Settings
```env
REACT_APP_API_URL=https://productr-api.herokuapp.com/api
```

---

## Complete .env File Examples

### Backend (.env)
```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/productr

# JWT
JWT_SECRET=xY9pL2kM7nQ3wE1bJ4tU8vR6sD5fG0hA
```

### Frontend (.env)
```env
# API
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🔐 Security Best Practices

1. **Never commit .env files to git**
   - Add to `.gitignore`
   - Already included in this project

2. **Use strong JWT secret**
   - At least 32 characters
   - Mix of letters, numbers, special chars
   - Different for each environment

3. **Keep sensitive data private**
   - Database URLs with credentials
   - API keys
   - JWT secrets

4. **Use environment variables for**
   - Passwords
   - API keys
   - Database URLs
   - Server ports
   - External service URLs

5. **Production recommendations**
   - Store in environment manager (Heroku, Vercel, etc.)
   - Rotate secrets regularly
   - Never use weak defaults
   - Monitor for leaked secrets

---

## MongoDB Connection Strings

### Local MongoDB
```
mongodb://localhost:27017/productr
```

### MongoDB Atlas Cloud
```
mongodb+srv://username:password@cluster0.mongodb.net/productr?retryWrites=true&w=majority
```

### Create Atlas Connection String
1. Go to https://www.mongodb.com/cloud/atlas
2. Create cluster
3. Click "Connect"
4. Select "Connect Your Application"
5. Copy connection string
6. Replace `<username>` and `<password>`
7. Replace `<cluster>` with your cluster name

---

## Generating Secure JWT Secret

### Using Node.js
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Using OpenSSL
```bash
openssl rand -hex 32
```

### Using Python
```bash
python -c "import secrets; print(secrets.token_hex(32))"
```

---

## Troubleshooting .env Issues

### Issue: Environment variables not loading
**Solution:**
- Restart server/app after changing .env
- Ensure .env file is in correct directory
- No spaces around `=` sign

### Issue: API URL not correct
**Solution:**
- Verify backend is running on correct port
- Check REACT_APP_API_URL format
- Restart React dev server

### Issue: MongoDB connection failed
**Solution:**
- Verify MongoDB is running
- Check MONGODB_URI syntax
- Verify database name
- Check credentials (if using Atlas)

### Issue: Token validation errors
**Solution:**
- Verify JWT_SECRET matches on all instances
- Check token expiration settings
- Regenerate token by logging in again

---

## Environment Variables Checklist

### Backend
- [ ] PORT is set
- [ ] NODE_ENV is set (development/production)
- [ ] MONGODB_URI is correct and accessible
- [ ] JWT_SECRET is strong and secure
- [ ] .env file exists in backend root

### Frontend
- [ ] REACT_APP_API_URL is correct
- [ ] .env file exists in frontend root
- [ ] Backend URL is accessible

---

## Important Notes

1. **Restart required**
   - After changing .env files, restart both servers
   - For frontend: Stop and run `npm start` again
   - For backend: Stop and run `npm run dev` again

2. **Development only**
   - These are development defaults
   - Use proper .env management in production
   - Never hardcode secrets

3. **Different environments**
   - Create `.env.local` for local overrides
   - Use `.env.production` for production
   - Keep .env template for reference

4. **Backup your .env**
   - Save JWT secret somewhere safe
   - Document MongoDB credentials
   - Never lose production JWT_SECRET

---

**Keep your .env files secure and never share them! 🔐**

# AWS Ubuntu SSL Setup

This project already serves the React app through an Nginx container and proxies `/api` to FastAPI internally. On AWS Ubuntu, the clean production setup is:

- Docker Compose runs the app stack.
- The frontend container is bound only to `127.0.0.1:8080`.
- Host-level Nginx listens on ports `80` and `443`.
- Certbot installs and renews the TLS certificate.

## 1. Prerequisites

Before starting, make sure:

- Your domain A record points to the EC2 public IP.
- The EC2 security group allows inbound `80` and `443`.
- Ubuntu can reach the internet to install packages and fetch certificates.

## 2. Install system packages

```bash
sudo apt update
sudo apt install -y docker.io docker-compose-plugin nginx certbot python3-certbot-nginx
sudo systemctl enable --now docker
sudo systemctl enable --now nginx
```

## 3. Prepare app environment

From the repo root:

```bash
cp .env.aws.example .env.aws
nano .env.aws
```

Set at least:

```env
APP_DOMAIN=your-domain.com
POSTGRES_USER=postgres
POSTGRES_PASSWORD=replace-with-a-strong-password
POSTGRES_DB=merchant_db
```

## 4. Start the app stack

```bash
docker compose --env-file .env.aws -f docker-compose.aws.yml up -d --build
```

Verify the frontend is only exposed locally:

```bash
curl -I http://127.0.0.1:8080
```

## 5. Configure host Nginx

Create the ACME webroot directory:

```bash
sudo mkdir -p /var/www/certbot
```

Copy the template:

```bash
sudo cp deploy/nginx/merchantpay.conf.example /etc/nginx/sites-available/merchantpay
sudo nano /etc/nginx/sites-available/merchantpay
```

Replace:

- `your-domain.com` with your real domain
- `www.your-domain.com` if you want the `www` host

Disable the default site and enable this one:

```bash
sudo rm -f /etc/nginx/sites-enabled/default
sudo ln -s /etc/nginx/sites-available/merchantpay /etc/nginx/sites-enabled/merchantpay
sudo nginx -t
sudo systemctl reload nginx
```

At this point, plain HTTP should already proxy to the app.

## 6. Issue the SSL certificate

If you want both apex and `www`:

```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

If you only want one host:

```bash
sudo certbot --nginx -d your-domain.com
```

Choose the redirect option when Certbot asks whether to force HTTPS.

## 7. Verify

Run:

```bash
curl -I https://your-domain.com
curl https://your-domain.com/health
```

The health endpoint should return JSON from the backend through the frontend Nginx proxy chain.

## 8. Day-2 operations

Check containers:

```bash
docker compose --env-file .env.aws -f docker-compose.aws.yml ps
```

Tail logs:

```bash
docker compose --env-file .env.aws -f docker-compose.aws.yml logs -f
```

Restart after changes:

```bash
docker compose --env-file .env.aws -f docker-compose.aws.yml up -d --build
```

Check renewal timer:

```bash
systemctl list-timers | grep certbot
```

## Notes

- Do not publish the app container directly on public port `80` in production; let host Nginx own `80/443`.
- The frontend uses relative `/api/v1`, so HTTPS works without rebuilding for a separate API domain.
- If you keep only one hostname, update `APP_DOMAIN` in `.env.aws` to match the certificate hostname.

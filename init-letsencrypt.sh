#!/bin/bash

# SSL certificate bootstrap for merchantpay.work.gd
# Run once on first deployment: sudo bash init-letsencrypt.sh

DOMAIN="merchantpay.work.gd"
EMAIL="rahulthakore16@gmail.com"
STAGING=0  # Set to 1 to test against Let's Encrypt staging (avoids rate limits)

echo "### Starting SSL setup for $DOMAIN ..."

# Step 1: Start nginx without SSL (need it running for ACME challenge)
echo "### Starting containers ..."
docker compose up -d frontend

# Step 2: Request certificate via certbot
echo "### Requesting certificate ..."

if [ $STAGING != "0" ]; then
  STAGING_ARG="--staging"
fi

docker compose run --rm certbot certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  --email $EMAIL \
  --agree-tos \
  --no-eff-email \
  -d $DOMAIN \
  $STAGING_ARG

# Step 3: Reload nginx to pick up the new certificate
echo "### Reloading nginx ..."
docker compose exec frontend nginx -s reload

echo "### Done! SSL certificate installed for $DOMAIN"
echo "### Visit https://$DOMAIN to verify"

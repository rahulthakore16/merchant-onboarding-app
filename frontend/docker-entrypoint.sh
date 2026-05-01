#!/bin/sh

DOMAIN="merchantpay.work.gd"
CERT_DIR="/etc/letsencrypt/live/$DOMAIN"

# If no real certificate exists yet, create a temporary self-signed one
# so nginx can start and serve the ACME challenge for Let's Encrypt
if [ ! -f "$CERT_DIR/fullchain.pem" ]; then
  echo "No SSL certificate found — generating temporary self-signed cert..."
  mkdir -p "$CERT_DIR"
  openssl req -x509 -nodes -days 1 \
    -newkey rsa:2048 \
    -keyout "$CERT_DIR/privkey.pem" \
    -out "$CERT_DIR/fullchain.pem" \
    -subj "/CN=$DOMAIN"
  echo "Temporary cert created. Run init-letsencrypt.sh to get a real certificate."
fi

exec "$@"

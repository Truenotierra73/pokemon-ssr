#!/bin/bash
set -e

# Descarga e instala Google Chrome
echo "Installing Google Chrome..."
wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
sudo apt-get update
sudo apt-get install -y google-chrome-stable

# Verifica la instalación
google-chrome --version

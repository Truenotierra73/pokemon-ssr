#!/bin/bash
set -e

echo "Installing Google Chrome without root..."

# Crear directorio temporal para la instalación
mkdir -p $HOME/chrome

# Descargar el paquete .deb de Chrome
wget -q https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb -O $HOME/chrome/chrome.deb

# Extraer los archivos del paquete .deb
dpkg-deb -x $HOME/chrome/chrome.deb $HOME/chrome

# Definir la variable CHROME_BIN para usar Chrome desde la ubicación local
export CHROME_BIN="$HOME/chrome/opt/google/chrome/chrome"

# Verificar la instalación
$CHROME_BIN --version || echo "Chrome installation failed"

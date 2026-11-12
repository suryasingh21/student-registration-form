# ==============================================================================
# Dockerfile for Render Deployment & Local Docker Testing
# Base Image: Official lightweight PHP 8.2 with Apache Web Server
# ==============================================================================

FROM php:8.2-apache

# Set working directory
WORKDIR /var/www/html

# Copy all application files to the Apache document root
COPY . /var/www/html/

# Set proper ownership and permissions for the web server
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# Expose standard HTTP port 80 (Render automatically detects this exposed port)
EXPOSE 80

# Start Apache in the foreground
CMD ["apache2-foreground"]

# Use the official Python image from the Docker Hub
FROM python:3.12.5-slim

# Set environment variables
# ENV PYTHONDONTWRITEBYTECODE=1
# ENV PYTHONUNBUFFERED=1
# ENV DJANGO_SETTINGS_MODULE=stylotech_site.settings

# Set the working directory
WORKDIR /app

# Copy the requirements file
COPY requirements.txt /app/

# Install the dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire project
COPY . .

# Expose the port
EXPOSE 8000

# Command to run the Django application with Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "4", "stylotech_site.wsgi:application"]

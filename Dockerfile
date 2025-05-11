FROM python:3-slim AS build-env
COPY requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir --target=/app/dependencies -r /app/requirements.txt
COPY ./app /app
COPY ./certs /app/certs


FROM gcr.io/distroless/python3
# EXPOSE 8080
WORKDIR /app
COPY --from=build-env /app /app

ENV CA_CERT="/app/certs/ca.pem"
ENV SERVER_CERT="/app/certs/cert.pem"
ENV CLIENT_KEY="/app/certs/key.pem"
ENV PYTHONPATH=/app/dependencies

CMD ["app.py"]
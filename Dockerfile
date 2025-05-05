FROM python:3-slim AS build-env
COPY requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir --target=/app/dependencies -r /app/requirements.txt
COPY ./app /app


FROM gcr.io/distroless/python3
WORKDIR /app
COPY --from=build-env /app /app
ENV PYTHONPATH=/app/dependencies
CMD ["app.py"]
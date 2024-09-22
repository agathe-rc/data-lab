FROM python:3.12

COPY requirements.txt /
RUN pip install -r /requirements.txt

WORKDIR /app
COPY app ./app

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--reload", "--host", "0.0.0.0", "--port", "80"]


FROM python:3.8-slim-buster
WORKDIR /app
COPY . /app
RUN pip install -r requirements.txt
EXPOSE 5001
CMD ["flask", "run", "--host=0.0.0.0", "--port=5002"]

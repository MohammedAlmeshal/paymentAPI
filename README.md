# Payment API 🤖

This is a payment API that is meant to simulate a payment system.

## Getting Started 👨‍💻

These instructions will get you the project up and running on your local machine.

### Prerequisites

🐳 Docker: (optional, you can run it directly if you have node.js installed).
<br/><br/>🔗 Mongo URI: An easy way to obtain a mongo URI is from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register), check out [this tutorial](https://medium.com/@bretcameron/mongodb-a-beginners-guide-8fca0c7787a4) to see how. (or contact me to provide you with one)
<br/><br/>✉️ Gmail and password: (optional, you can skip this if you would like to see reminders in the console only).
### Installing

First, clone this repository

```
git clone https://github.com/MohammedAlmeshal/paymentAPI.git
```

In the root dictionary, create a **.env** file

```
touch .env
```

Next, open the **.env** file and provide your mongo URI and email like this

```
MONGO_URI=<your_mongoURI>
EMAIL=<Gmail>
EMAIL_PASSWORD=<Gmail_password>
```

## Running

### Using Docker 🐳 

First, build the image

```
docker build .
```

Now, run the container and map port 5000 on the container to port 5000 on your machine

```
docker run -p 5000:5000 <image_id>
```

You're all set!, the API should be running now 👍.


### Running directly 💻

First, run

```
npm install
```
Then run

```
npm run server
```
You're all set!, the API should be running now 👍.

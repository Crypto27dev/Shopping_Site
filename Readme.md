# A complete MERN ecommerce website

This contains all the features that an ecommerce website should have.
Link to the website [Click here](https://lit-sands-82234.herokuapp.com/)

#### To have an admin privelege

##### email= admin123@gmail.com

##### password= 123456

#### Some of the Screenshots

#### Homepage

<p align="center">

<img src="/Images/Screenshot from 2021-06-13 13-22-39.png" width="800px">

#### Live Search

<img src="/Images/Screenshot from 2021-06-13 13-23-06.png" width="800px">

#### Order Items

<img src="/Images/Screenshot from 2021-06-13 13-24-03.png" width="800px">

#### Admin Product Manage

<img src="/Images/Screenshot from 2021-06-13 13-24-25.png" width="800px">

#### Admin User Manage

<img src="/Images/Screenshot from 2021-06-13 13-24-43.png" width="800px">

#### Admin Order Manage

<img src="/Images/Screenshot from 2021-06-13 13-24-55.png" width="800px">

#### Filtering with Slider

<img src="/Images/Screenshot from 2021-06-13 13-25-26.png" width="800px">

</p>

#### How to get Started?

Install the backend dependencies on root folder using `npm install` command.

Set your own credentials for cloudinary and mongodb database on the root folder inside a .env file like below-

Create a .env file in the root and add the following-

```bash
NODE_ENV=development
PORT=5000
MONGO_URI="Your mongo uri"
JWT_SECRET="Anything you like"
CLOUD_NAME="Your cloudindary name"
API_KEY="Your cloudinary api key"
API_SECRET="Your cloudinary api secret"
```

Move to frontend folder and install frontend dependencies using `npm install` command.

For Google authentication set your own firebase credentials inside a .env file in the frontend folder like following-

```bash
REACT_APP_API_KEY="Your firebase api key"
REACT_APP_AUTHDOMAIN="Your auth domain"
REACT_APP_PROJECTID="Your projectId"
REACT_APP_STORAGEBUCKET="Your bucket"
REACT_APP_MESSAGINGSENDERID="Your messagingsenderId"
REACT_APP_APPID="Your appId"
REACT_APP_MEASUREMENTID="Your measurementId"

```

Note:You can get all these firebase credentials easily by creating a firebase project. You can do this easily by watching youtube videos.

And there you go...boom!

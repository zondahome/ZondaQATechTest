# Setting up the app
## Prerequisites
You will need to have NodeJS installed on your machine before starting:

https://nodejs.org/en/download
You will also need git installed so you can clone this repository, create your branch and commit your changes:

https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
Repo Setup
Create your own repository from this template by using the "Use this template" button. For more details on this step, see the github docs.

Once you have created a new repository under your own github account containing the code from this template repo, clone it down to your computer so you can work on it.

### Api Setup
Next you will need to create a NodeJS project for your API.

If you are unfamiliar with the steps involved there are plenty of resources online (e.g. this and this).

We suggest that your API project is created in a folder called api alongside the existing web folder.

Once you have got your API project up and running, copy the sample-data/subdivision.json file into your API folder.

#### React App Setup
Change into the React app folder (cd web) and run `npm install`

Then try running the skeleton app to confirm it is working before you begin making changes: `npm start`

### Submitting your work
When you are finished, please ensure your repo is public so that we will be able to access it, and email us the github repo URL for us to review.

Glossary

* Subdivision - An area of land containing lots or plots of land for property development
* Subdivision status code - The status of the subdivision. Can either be:
* Active: This subdivision has ongoing construction
* Future: This subdivision will have construction in the near future
* Builtout: This subdivision's construction has been completed
* NearMap - one of the providers used at Zonda Satellite for our satellite image data
# Postman Collection

To use the postman collection you can either get the link off someone in the group, or use the most up-to-date collection in this folder. If you want to use the CLI to launch the collection, you can use the following command in this folder:

    newman -c electioTestCollection.json -e electioEnvironment.json

In this command, -c specifies the collection to use and -e specifies the postman environment to use. Please ensure you have recently run "npm install" and that all the server stuff is running.

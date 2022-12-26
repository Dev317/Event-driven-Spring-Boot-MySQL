FROM openjdk:17.0.1
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar
EXPOSE 8081
ENTRYPOINT ["java","-jar","/app.jar", "--spring.datasource.url=jdbc:mysql://host.docker.internal:3306/inventory?createDatabaseIfNotExist=true", "--spring.rabbitmq.host=rabbitmq"]
